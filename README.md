# 🧭 CSF Compass

## NIST CSF v2.0 Dashboard — Navigasi Risiko Siber

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn/ui-2.0-000000?style=flat)](https://ui.shadcn.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 📖 Tentang Proyek

**CSF Compass** adalah dashboard interaktif untuk mengelola dan memvisualisasikan risiko siber berdasarkan kerangka **NIST Cybersecurity Framework (CSF) versi 2.0**.

Aplikasi ini dirancang untuk membantu tim keamanan informasi (CISO, Analis, Auditor) dalam:
- Memetakan postur keamanan saat ini (*Current Profile*)
- Menentukan target yang diinginkan (*Target Profile*)
- Mengidentifikasi kesenjangan (*Gap Analysis*) pada 6 fungsi inti NIST CSF:
  - 🏛️ **Govern** (Tata Kelola)
  - 🔍 **Identify** (Identifikasi)
  - 🛡️ **Protect** (Lindungi)
  - 📡 **Detect** (Deteksi)
  - 🚨 **Respond** (Tanggapi)
  - ♻️ **Recover** (Pulihkan)

> ⚡ **MVP**: Aplikasi ini adalah *Minimum Viable Product* yang menggunakan **localStorage** sebagai database dan **hardcoded authentication** untuk kemudahan demo dan deployment statis.

---

## ✨ Fitur Utama

| Fitur | Deskripsi |
| :--- | :--- |
| 📊 **Dashboard Visual** | Radar chart 6 fungsi, KPI ringkasan, dan daftar kesenjangan teratas. |
| 📦 **Manajemen Aset** | CRUD aset (sistem/aplikasi) yang akan dinilai. |
| 📝 **Penilaian CSF** | Isi skor *Current* dan *Target* (0–4) per sub-kategori. |
| 🔍 **Analisis Kesenjangan** | Hitung gap otomatis dan prioritaskan tindakan perbaikan. |
| 🎨 **Dark / Light Mode** | Tema gelap dan terang dengan deteksi preferensi sistem. |
| 🧪 **Demo Instan** | Login dengan kredensial bawaan, tanpa registrasi. |
| 🔒 **Privasi** | Semua data tersimpan di browser Anda (localStorage). |

---

## 🛠️ Teknologi yang Digunakan

| Kategori | Teknologi |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router) |
| **Bahasa** | TypeScript (strict mode) |
| **Styling** | Tailwind CSS + shadcn/ui |
| **State Management** | Zustand (UI state) + React Hook Form (form) |
| **Validasi** | Zod |
| **Chart** | Recharts |
| **Deployment** | GitHub Pages (static export) |
| **Authentication** | Hardcoded (MVP) |

---

## 🚀 Demo Langsung

Akses dashboard melalui:  
👉 **[https://yogiex.github.io/csf-compass/](https://yogiex.github.io/csf-compass/)**

**Kredensial Demo:**
- Email: `admin@nist.csf`
- Password: `admin-csf`

---

## 📦 Instalasi & Menjalankan Lokal

### Prasyarat
- Node.js 18+ dan npm

### Langkah-langkah

```bash
# 1. Clone repositori
git clone https://github.com/yogiex/csf-compass.git
cd csf-compass

# 2. Install dependensi
npm install

# 3. Jalankan development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

---

## 🌐 Deploy ke GitHub Pages

### Metode Otomatis (GitHub Actions)

Proyek ini sudah dilengkapi dengan workflow GitHub Actions. Setiap push ke branch `main` akan otomatis build dan deploy ke branch `gh-pages`.

1. Aktifkan GitHub Pages di repository:  
   Settings → Pages → Branch: `gh-pages` → Save
2. Push perubahan ke `main`
3. Tunggu workflow selesai
4. Akses di `https://yogiex.github.io/csf-compass/`

### Metode Manual

```bash
# 1. Build static files
npm run build

# 2. Deploy folder 'out' ke branch gh-pages
cd out
git init
git checkout -b gh-pages
git add .
git commit -m "Deploy to GitHub Pages"
git remote add origin https://github.com/yogiex/csf-compass.git
git push -u origin gh-pages --force
```

---

## 🗂️ Struktur Proyek

```
csf-compass/
├── src/
│   ├── app/
│   │   ├── (auth)/              # Halaman login (tanpa layout dashboard)
│   │   ├── dashboard/           # Halaman protected (dengan layout)
│   │   ├── api/                 # API Routes (tidak digunakan di MVP)
│   │   └── page.tsx             # Landing page
│   ├── components/
│   │   ├── ui/                  # Komponen shadcn/ui
│   │   ├── layout/              # Sidebar, Navbar
│   │   └── features/            # Komponen bisnis
│   ├── hooks/                   # Custom React hooks
│   ├── lib/
│   │   ├── db-client.ts         # Wrapper localStorage
│   │   ├── mock-data.ts         # Data awal
│   │   └── validations/         # Skema Zod
│   ├── store/                   # Zustand stores
│   └── types/                   # Global TypeScript types
├── public/                      # Asset statis
├── next.config.ts               # Konfigurasi Next.js (static export)
└── package.json
```

---

## 🧪 Testing

Untuk menjalankan linting dan type checking:

```bash
npm run lint
npx tsc --noEmit
```

---

## 🤝 Kontribusi

Kontribusi sangat diterima! Silakan ikuti langkah-langkah berikut:

1. Fork repositori
2. Buat branch fitur (`git checkout -b feat/feature-anda`)
3. Commit perubahan (`git commit -m 'feat: tambahkan fitur X'`)
4. Push ke branch (`git push origin feat/feature-anda`)
5. Buat Pull Request

Pastikan kode Anda sesuai dengan standar:
- TypeScript strict
- Mengikuti konvensi penamaan di `AGENTS.md`
- Semua komponen responsif dan aksesibel

---

## 📝 Dokumentasi Lengkap

Untuk informasi lebih detail, silakan baca dokumen berikut:

| Dokumen | Deskripsi |
| :--- | :--- |
| [`PRD.md`](./PRD.md) | Kebutuhan bisnis dan fitur |
| [`ARCHITECTURE.md`](./ARCHITECTURE.md) | Arsitektur teknis & error handling |
| [`LOGIC.md`](./LOGIC.md) | Edge cases & validasi bisnis |
| [`DESIGN.md`](./DESIGN.md) | Sistem desain & UX guidelines |
| [`AGENTS.md`](./AGENTS.md) | Panduan untuk AI Agent / kontributor |
| [`PROJECT_STRUCTURE.md`](./PROJECT_STRUCTURE.md) | Peta lengkap struktur direktori |

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah lisensi **MIT**. Lihat file [LICENSE](./LICENSE) untuk informasi lebih lanjut.

---

## 🙏 Kredit

- [NIST CSF v2.0](https://www.nist.gov/cyberframework) – Kerangka acuan utama
- [shadcn/ui](https://ui.shadcn.com/) – Komponen UI
- [Next.js](https://nextjs.org/) – React framework
- [Recharts](https://recharts.org/) – Library chart

---

## 📧 Kontak

Untuk pertanyaan atau saran, silakan buka [issue](https://github.com/yogiex/csf-compass/issues) di repositori ini.

---

**Dibuat dengan ❤️ dan banyak kopi.** ☕