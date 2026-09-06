<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

# AGENTS.md — Panduan Kontribusi untuk AI Agents

> **Tujuan**: Dokumen ini adalah *single source of truth* bagi AI (seperti GitHub Copilot, Cursor, atau ChatGPT) dan developer baru dalam berinteraksi dengan codebase **NIST CSF v2.0 Dashboard**. Semua keputusan koding harus mengacu pada hierarki dokumen ini.

## ⚠️ MVP CONSTRAINTS (GitHub Pages)
**Proyek ini adalah MVP (Minimum Viable Product) dan akan dideploy ke GitHub Pages (static site) pada subpath `/csf-compass`.**
- **Tidak ada API Routes**: Semua operasi CRUD menggunakan `localStorage` dengan inisialisasi dari `src/lib/mock-data.ts`.
- **Autentikasi Hardcoded**: Hanya satu akun:
  - Email: `admin@nist.csf`
  - Password: `admin-csf`
- **No Middleware**: Guard autentikasi menggunakan HOC `withAuthGuard` di Client Component.
- **Static Export**: `next.config.ts` menggunakan `output: 'export'`, `images.unoptimized: true`, `basePath: '/csf-compass'`, dan `assetPrefix: '/csf-compass'`.
- **Data Resets**: Data akan hilang jika browser dibersihkan. Gunakan tombol "Reset Data" di dashboard untuk kembali ke default.

## 📚 Hierarki Dokumentasi (WAJIB BACA)
Sebelum menulis satu baris kode pun, pastikan Anda telah memahami dokumen-dokumen berikut secara berurutan:

1.  **`PRD.md`** → Untuk memahami **"Apa"** yang harus dibangun (bisnis & fitur).
2.  **`ARCHITECTURE.md`** → Untuk memahami **"Bagaimana"** struktur teknis dan strategi error handling.
3.  **`LOGIC.md`** → Untuk memahami **"Edge Cases"** dan logika bisnis yang ketat.
4.  **`DESIGN.md`** → Untuk memahami **"Tampilan"** (warna, tipografi, UX).

## 🧠 Peran & Sikap Agent
Anda adalah **Senior Full-Stack Engineer** yang bertanggung jawab untuk:

- Menulis kode yang **aman, teruji, dan dapat dipelihara**.
- Memprioritaskan **keselamatan data** (validasi ganda) daripada kecepatan.
- Menolak permintaan yang bertentangan dengan logika bisnis di `PRD.md` dan `LOGIC.md`.

## ⚙️ Stack Teknologi (Tech Stack) — Patuhi Versi Ini
| Kategori | Teknologi | Versi / Catatan |
| :--- | :--- | :--- |
| **Framework** | Next.js | App Router |
| **Bahasa** | TypeScript | Gunakan `strict: true`. **Dilarang** menggunakan `any` tanpa alasan yang jelas dan terdokumentasi. |
| **Styling** | Tailwind CSS | + `class-variance-authority` (cva) untuk variasi komponen. |
| **UI Library** | shadcn/ui | *Harus* menggunakan komponen dari `@/components/ui/`. Jangan buat komponen UI custom dari nol jika sudah ada di shadcn. |
| **State Management (Server)** | TanStack React Query | Untuk fetching, caching, dan mutasi data API. |
| **State Management (Client)** | Zustand | Hanya untuk state global *transient* (seperti theme, sidebar collapse, user session client). |
| **Form Handling** | React Hook Form + Zod | Zod untuk validasi skema. Validasi DUPLIKAT di frontend (UX) dan backend (Keamanan). |
| **HTTP Client** | Fetch API (Native) + Interceptor | Wrapper di `@/lib/api-client` untuk menangani error 401/403 secara global. |
| **Database (Opsional)** | Prisma / Drizzle | (Tergantung kebutuhan, tetapi ikuti aturan soft-delete di `LOGIC.md`). |

## 📁 Struktur Direktori (Wajib)
Saat membuat file baru, patuhi struktur berikut:
```
src/
├── app/
│   ├── (auth)/               # Halaman login/register (tanpa layout dashboard)
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (dashboard)/          # Halaman utama (dilindungi middleware)
│   │   ├── layout.tsx        # Layout dengan Sidebar & Navbar
│   │   ├── page.tsx          # Halaman Dashboard utama (Radar Chart + KPI)
│   │   ├── assessment/
│   │   │   ├── page.tsx      # Daftar assessment
│   │   │   └── [id]/page.tsx # Detail/edit assessment
│   │   └── assets/
│   │       └── page.tsx      # Manajemen aset
│   └── api/                  # API Routes (Backend)
│       ├── auth/...
│       ├── assessments/...
│       └── assets/...
├── components/
│   ├── ui/                   # [Auto-generated] Komponen shadcn/ui. JANGAN DIUBAH MANUAL.
│   ├── layout/               # Sidebar, Navbar, Footer
│   └── features/             # Komponen bisnis (AssessmentForm, CSFChart, RiskBadge)
├── lib/
│   ├── validations/          # Skema Zod (contoh: assessment.schema.ts)
│   ├── errors/               # Custom Error Classes (AppError, ValidationError)
│   ├── api-client/           # Fetch wrapper dengan interceptor
│   └── utils/                # Fungsi pembantu (cn, formatDate, calculateGap)
├── hooks/                    # Custom Hooks (useAssessment, useAsset, useLocalStorage)
├── types/                    # Global TypeScript interfaces (mirip dengan skema Zod)
└── middleware.ts             # Next.js Middleware (Auth Guard)
```

## 🚦 Aturan Koding (Non-Negotiable)

### 1. Penamaan File (Conventions)
- **Komponen React**: `PascalCase.tsx` (contoh: `AssessmentForm.tsx`).
- **Utilities / Helpers**: `camelCase.ts` (contoh: `formatDate.ts`).
- **API Routes**: Gunakan folder structure, file harus bernama `route.ts`.
- **Hooks**: `useCamelCase.ts` (contoh: `useAssessment.ts`).

### 2. Client vs Server Component
- Default: **Server Component** (kecuali butuh interaktivitas, state, atau efek).
- Jika butuh interaktivitas, tambahkan `"use client"` di **baris paling atas** file.
- Jangan mencampur logika `useEffect` untuk fetching data. Gunakan React Query di Client Component, atau `fetch` di Server Component.

### 3. Penanganan Error (Error Handling) — WAJIB
- **API Routes**: Setiap handler API **WAJIB** dibungkus oleh `withErrorHandler` (lihat `ARCHITECTURE.md`).
- **Form**: Setiap form harus memiliki validasi Zod. Tangkap error di `onSubmit` dan tampilkan menggunakan `toast` dari shadcn (`sonner` atau `use-toast`).
- **Data Fetching**: Gunakan `try-catch` pada blok `queryFn` di React Query. Jika error, lempar instance dari `AppError`.

### 4. Styling & Tema
- **Jangan** meng-hardcode warna hex secara langsung di komponen. Gunakan variabel CSS Tailwind (misal: `bg-primary`, `text-foreground`) atau token yang sudah didefinisikan di `tailwind.config.ts` (seperti `nist-govern`).
- Pastikan semua komponen berfungsi di **Dark Mode** dan **Light Mode**. Uji dengan `dark:` prefix jika diperlukan.

### 5. Import Order (Gunakan Format Ini)
```typescript
// 1. React & Next.js
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// 2. Library Pihak Ketiga
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

// 3. Komponen UI (shadcn)
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// 4. Komponen Internal / Fitur
import { AssessmentForm } from '@/components/features/AssessmentForm';

// 5. Hooks & Libs
import { useAssessment } from '@/hooks/useAssessment';
import { calculateGap } from '@/lib/utils';
import { assessmentSchema } from '@/lib/validations/assessment.schema';

// 6. Types
import type { Assessment } from '@/types/assessment';
```

## 🧪 Alur Kerja Agent (Workflow)
Jika Anda (AI) diminta untuk membuat fitur baru, ikuti langkah ini:

1.  **Cek Dokumen**: Buka `PRD.md` dan `LOGIC.md` untuk memastikan fitur tersebut memang dibutuhkan dan tidak melanggar aturan bisnis.
2.  **Buat Skema (Zod) Dulu**: Jika melibatkan input data, buat file skema di `lib/validations/` terlebih dahulu.
3.  **Buat API Route**: Buat endpoint di `app/api/` dengan `withErrorHandler`, lalu uji secara mental (pastikan mengembalikan format `{ success: true, data: ... }`).
4.  **Buat Hooks (React Query)**: Buat custom hook yang memanggil API tersebut.
5.  **Buat UI**: Buat komponen fitur di `components/features/`, gunakan shadcn/ui, dan pastikan responsif.
6.  **Integrasi**: Gabungkan ke halaman di `app/(dashboard)/`.

## 🔒 Keamanan (Security Checklist)
- **Input Sanitasi**: Semua input pengguna harus lolos validasi Zod di sisi server. Jangan pernah mempercayai data dari client.
- **XSS Prevention**: Next.js secara otomatis men-escape output, tetapi hati-hati jika menggunakan `dangerouslySetInnerHTML` (HARAM kecuali untuk konten tepercaya).
- **Autentikasi**: Semua halaman di group `(dashboard)` harus dilindungi oleh `middleware.ts`. Jika token tidak valid, redirect ke `/login`.

## 🛠️ Perintah Berguna untuk Agent
Jika Anda menjalankan perintah di terminal (melalui shell), berikut adalah yang paling sering digunakan:
```bash
# Install dependency baru
npm install <package-name>

# Menambahkan komponen shadcn baru
npx shadcn@latest add <component-name>

# Menjalankan development server
npm run dev

# Build untuk production
npm run build

# Cek tipe (TypeScript)
npx tsc --noEmit
```

## 🚫 Larangan (Anti-Patterns)
- **Jangan** membuat file `components/ui/...` secara manual. Serahkan ke CLI shadcn.
- **Jangan** menggunakan `useEffect` untuk menghitung nilai turunan (derived state). Gunakan `useMemo` atau hitung langsung di render.
- **Jangan** menyimpan data besar (seperti seluruh daftar assessment) di Zustand. Gunakan React Query untuk itu. Zustand hanya untuk UI state.
- **Jangan** melakukan mutasi langsung pada state React atau Query Cache. Selalu gunakan fungsi setter atau `queryClient.setQueryData` secara aman.
