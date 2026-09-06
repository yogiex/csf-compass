### 📄 Dokumen 2: `ARCHITECTURE.md` (Arsitektur Teknis & Strategi Error Handling)
*Berisi struktur teknis, state management, dan skema penanganan error yang ketat agar tidak ada "cacat logika" di sisi kode.*

```markdown
# Arsitektur Teknis & Strategi Error Handling

## 1. Struktur Direktori (Kustom)
```text
src/
├── app/                    # App Router Next.js
│   ├── (auth)/             # Group route untuk login/register
│   ├── (dashboard)/        # Group route untuk halaman utama (dilindungi middleware)
│   │   ├── page.tsx        # Halaman Dashboard utama
│   │   └── assessment/     # Halaman pengisian assessment
│   └── api/                # API Routes (Backend Next.js)
├── components/
│   ├── ui/                 # Komponen shadcn/ui
│   └── features/           # Komponen bisnis (CSFChart, AssessmentForm, dll)
├── lib/
│   ├── validations/        # Schema Zod untuk validasi data
│   ├── errors/             # Custom Error Classes
│   └── api-client/         # Wrapper fetch dengan interceptor
├── hooks/                  # Custom React Hooks (useAssessment, useAuth)
└── types/                  # Global TypeScript interfaces
```

## 2. Manajemen State & Data Flow (Kunci Logika)
- **Server State (Data dari DB)**: Menggunakan **TanStack React Query** (`@tanstack/react-query`) untuk caching, re-fetch, dan staleness data.
- **Client State (UI/Form)**: Menggunakan **Zustand** untuk state global (misal: user profile, selected asset) dan **React Hook Form + Zod** untuk state form assessment.
- **Validasi Ganda**: Validasi dilakukan di **Frontend** (UX cepat) DAN di **Backend API Route** (Keamanan). Backend adalah otoritas tertinggi.

## 3. Skema Error Handling (Zero Logic Flaw)

### A. Centralized Error Class
Buat file `lib/errors/index.ts`:
```typescript
export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational: boolean = true // Bedakan error operasional vs programming error
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

// Contoh penggunaan:
// throw new AppError(400, "Target tidak boleh kurang dari Current");
```

### B. Standardized API Response
**Setiap API Route WAJIB** mengembalikan format JSON yang konsisten:
```typescript
// Success
{ success: true, data: { ... }, meta: { timestamp: '...' } }

// Error
{ success: false, error: { code: 'VALIDATION_ERROR', message: '...', details: [...] } }
```

### C. Global Error Wrapper untuk API Routes
Bungkus setiap handler API dengan Higher-Order Function `withErrorHandler` untuk menangkap error secara terpusat:
```typescript
// lib/api/withErrorHandler.ts
export const withErrorHandler = (handler: Function) => async (req: Request) => {
  try {
    return await handler(req);
  } catch (error) {
    if (error instanceof AppError) {
      return NextResponse.json({ success: false, error: { message: error.message } }, { status: error.statusCode });
    }
    // Error tak terduga (Programming Error) -> log ke console dan kirim 500 generic
    console.error("Unhandled Error:", error);
    return NextResponse.json({ success: false, error: { message: "Terjadi kesalahan internal sistem." } }, { status: 500 });
  }
};
```

### D. Client-Side Error Boundary
Bungkus komponen dashboard dengan `ErrorBoundary` dari `react-error-boundary` untuk menangkap error UI (misal: render loop) agar tidak mematikan seluruh halaman. Tampilkan fallback UI berupa "Maaf, terjadi gangguan pada komponen ini. Muat ulang halaman."

## 4. Strategi Mencegah Cacat Logika (Race Condition & Stale Data)
- **Mutasi (POST/PUT)**: Setelah sukses, selalu invalidasi query terkait menggunakan `queryClient.invalidateQueries()` agar data otomatis diperbarui tanpa perlu refresh manual.
- **Optimistic Update**: Untuk aksi "update skor", lakukan update cache terlebih dahulu (UX cepat), lalu rollback otomatis jika API gagal.
```