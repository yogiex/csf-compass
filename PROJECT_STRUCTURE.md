# PROJECT_STRUCTURE.md — Blueprint Arsitektur Kode

> **Tujuan**: Dokumen ini adalah indeks langsung dari seluruh codebase. Setiap AI Agent atau Developer baru yang membuka repositori ini harus membaca file ini terlebih dahulu untuk memahami "Di mana letak logika apa" dalam 10 detik.

Dokumen ini mencerminkan struktur direktori **target** yang dibangun di atas inisialisasi Next.js + shadcn, sesuai hierarki yang diinstruksikan di `AGENTS.md`. (Folder `(auth)`, `(dashboard)`, dan API routes di bawah adalah struktur yang sedang/akan dibangun, bukan kondisi saat ini.)

## 🌳 Tree Struktur Direktori (Full)

```text
nist-csf-nextjs-dashboard/
├── .env.local                     # Variabel lingkungan (database, JWT secret) - GitIgnore
├── .gitignore
├── AGENTS.md                      # Panduan untuk AI Agent (Anda sedang di sini)
├── ARCHITECTURE.md                # Arsitektur teknis & error handling
├── DESIGN.md                      # Sistem desain, warna, dan UX
├── LOGIC.md                       # Skenario edge case & validasi bisnis
├── PRD.md                         # Kebutuhan bisnis & fitur
├── PROJECT_STRUCTURE.md           # [FILE INI] Peta direktori
├── README.md                      # Gambaran umum proyek
├── components.json                # Konfigurasi shadcn/ui (path alias, tema)
├── next.config.ts                 # Konfigurasi Next.js
├── package.json                   # Daftar dependensi
├── postcss.config.mjs             # Konfigurasi PostCSS (Tailwind v4)
├── eslint.config.mjs              # Konfigurasi ESLint
├── tsconfig.json                  # Konfigurasi TypeScript (strict mode)
│
└── src/                           # 📁 ROOT SUMBER KODE UTAMA
    ├── app/                       # 📁 App Router Next.js (Routing & Halaman)
    │   ├── (auth)/                # 📁 Group Route (Tanpa layout dashboard)
    │   │   ├── login/
    │   │   │   └── page.tsx       # Halaman login (form email + password)
    │   │   └── register/
    │   │       └── page.tsx       # Halaman registrasi pengguna baru
    │   │
    │   ├── (dashboard)/           # 📁 Group Route (Dilindungi Middleware)
    │   │   ├── layout.tsx         # Layout utama: Sidebar kiri + Navbar atas
    │   │   ├── page.tsx           # Halaman Dashboard (Radar Chart, KPI Cards, Top Gap)
    │   │   ├── assessment/
    │   │   │   ├── page.tsx       # Daftar semua assessment (Data Table + Filter)
    │   │   │   └── [id]/          # Dynamic Route untuk detail/edit assessment
    │   │   │       └── page.tsx   # Halaman detail + form edit assessment
    │   │   ├── assets/
    │   │   │   └── page.tsx       # Manajemen aset (CRUD: Create, Read, Update, Delete)
    │   │   └── reports/
    │   │       └── page.tsx       # Laporan statis / export PDF
    │   │
    │   ├── api/                   # 📁 API Routes (Backend Next.js)
    │   │   ├── auth/
    │   │   │   ├── login/
    │   │   │   │   └── route.ts   # POST: Validasi kredensial -> return JWT
    │   │   │   └── me/
    │   │   │       └── route.ts   # GET: Ambil data user dari token JWT
    │   │   ├── assessments/
    │   │   │   ├── route.ts       # GET (list) & POST (create new)
    │   │   │   └── [id]/
    │   │   │       └── route.ts   # GET (detail), PUT (update), DELETE (soft-delete)
    │   │   └── assets/
    │   │       ├── route.ts       # GET (list) & POST (create)
    │   │       └── [id]/
    │   │           └── route.ts   # GET, PUT, DELETE untuk aset
    │   │
    │   ├── favicon.ico
    │   ├── globals.css            # CSS Global + token tema (Tailwind v4 / @theme)
    │   ├── layout.tsx             # Root Layout (Provider: React Query, Theme, Toaster)
    │   └── not-found.tsx          # Halaman 404 kustom
    │
    ├── components/                # 📁 KOMPONEN REUSABLE
    │   ├── ui/                    # 📁 [AUTO-GENERATED] Komponen shadcn/ui
    │   │   ├── button.tsx
    │   │   ├── card.tsx
    │   │   ├── input.tsx
    │   │   ├── label.tsx
    │   │   ├── table.tsx
    │   │   ├── dropdown-menu.tsx
    │   │   ├── badge.tsx
    │   │   ├── avatar.tsx
    │   │   ├── separator.tsx
    │   │   ├── sheet.tsx
    │   │   ├── toast.tsx          # + sonner / use-toast
    │   │   └── ...                # (Semua komponen lain dari shadcn)
    │   │
    │   ├── layout/                # 📁 Komponen Layout Struktural
    │   │   ├── Sidebar.tsx        # Navigasi kiri (6 Fungsi NIST + Logo)
    │   │   ├── Navbar.tsx         # Header atas (User Avatar, Theme Toggle, Notif)
    │   │   └── Footer.tsx         # Footer sederhana (opsional)
    │   │
    │   └── features/              # 📁 Komponen Bisnis (Domain Specific)
    │       ├── assessment/
    │       │   ├── AssessmentForm.tsx    # Form kompleks dengan React Hook Form + Zod
    │       │   ├── AssessmentTable.tsx   # Tabel data dengan sorting & pagination
    │       │   └── RiskBadge.tsx         # Badge Severity (Kritis, Tinggi, dll)
    │       ├── charts/
    │       │   ├── CSFRadarChart.tsx     # Radar chart per 6 fungsi (Current vs Target)
    │       │   └── GapBarChart.tsx       # Horizontal bar untuk Top 5 Gap
    │       ├── dashboard/
    │       │   ├── KpiCards.tsx          # Grid 4 KPI (Total Aset, Rata2 Gap, dll)
    │       │   └── RecentActivity.tsx    # Feed aktivitas terbaru
    │       └── assets/
    │           └── AssetForm.tsx         # Form CRUD aset
    │
    ├── lib/                       # 📁 UTILITIES & LOGIKA INTI (Server-side aman)
    │   ├── api-client/            # 📁 Wrapper HTTP
    │   │   └── index.ts           # Fetch interceptor (handle 401, refresh token)
    │   ├── errors/                # 📁 Custom Error Classes
    │   │   ├── AppError.ts        # Class AppError extends Error (statusCode, isOperational)
    │   │   └── withErrorHandler.ts # HOF untuk membungkus API Routes
    │   ├── utils/                 # 📁 Pure Functions (Helper)
    │   │   ├── cn.ts              # Fungsi `cn` untuk merge className (dari shadcn)
    │   │   ├── formatDate.ts      # Format timestamp menjadi "dd MMM yyyy, HH:mm"
    │   │   ├── calculateGap.ts    # Hitung gap: (Target - Current) / Target * 100
    │   │   └── getSeverity.ts     # Mapping angka gap -> warna (Critical, High, etc)
    │   └── validations/           # 📁 Zod Schemas (Single Source of Truth)
    │       ├── assessment.schema.ts # Skema untuk input form assessment
    │       ├── asset.schema.ts      # Skema untuk input form aset
    │       └── auth.schema.ts       # Skema untuk login/register
    │
    ├── hooks/                    # 📁 CUSTOM REACT HOOKS
    │   ├── useAssessment.ts      # Query & Mutation untuk data assessment (React Query)
    │   ├── useAsset.ts           # Query & Mutation untuk data aset
    │   ├── useAuth.ts            # State login, logout, dan session
    │   └── useLocalStorage.ts    # Wrapper untuk localStorage (persist theme, dll)
    │
    ├── types/                    # 📁 GLOBAL TYPE SCRIPT (Interface)
    │   ├── assessment.ts         # Types untuk Assessment, GapResult, dll
    │   ├── asset.ts              # Types untuk Asset
    │   └── user.ts               # Types untuk User & Session
    │
    ├── store/                    # 📁 ZUSTAND STORE (Global UI State)
    │   ├── useThemeStore.ts      # State tema (light/dark/system)
    │   └── useSidebarStore.ts    # State sidebar (expanded/collapsed)
    │
    └── middleware.ts             # 📁 Next.js Middleware (Root level)
                                  # Memeriksa JWT, redirect ke /login jika tidak valid
```

## 🧭 Navigasi Cepat (Cheat Sheet)

| Jika Anda mencari... | Buka file ini... |
| :--- | :--- |
| **Menambah halaman baru** | `src/app/(dashboard)/[nama-folder]/page.tsx` |
| **Menambah endpoint API** | `src/app/api/[nama-resource]/route.ts` |
| **Menambah komponen UI** | Gunakan `npx shadcn@latest add ...` (jangan buat manual) |
| **Menambah komponen bisnis** | `src/components/features/[fitur]/` |
| **Mengubah aturan validasi** | `src/lib/validations/[nama].schema.ts` |
| **Menambah fungsi helper** | `src/lib/utils/` |
| **Menambah custom hook** | `src/hooks/use[Nama].ts` |
| **Mengubah warna tema** | Token di `src/app/globals.css` (Tailwind v4) |
| **Menambah state global** | `src/store/use[Nama]Store.ts` (Zustand) |

## 📌 Aturan Impor (Alias Path)
Gunakan `@` sebagai root absolut untuk memudahkan impor. Contoh:

```typescript
// ❌ Buruk (Relative path yang berantakan)
import Button from '../../../components/ui/button';

// ✅ Baik (Absolute path dengan alias)
import { Button } from '@/components/ui/button';
import { AppError } from '@/lib/errors/AppError';
import { useAssessment } from '@/hooks/useAssessment';
```

## 🔮 Prediksi Struktur di Masa Depan (Saat Scale-up)
Jika proyek ini berkembang, struktur berikut direkomendasikan untuk ditambahkan:

```text
src/
├── db/                          # 📁 Database Client (Prisma/Drizzle)
│   └── index.ts                 # Ekspor client DB
├── services/                    # 📁 Service Layer (Business Logic murni)
│   ├── assessment.service.ts    # Logika bisnis untuk assessment (terpisah dari API)
│   └── asset.service.ts
└── __tests__/                   # 📁 Unit & Integration Tests
    ├── api/
    └── components/
```
