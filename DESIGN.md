# DESIGN.md: NIST CSF v2.0 Dashboard
## Sistem Desain, Tema, Komponen, dan Pengalaman Visual

Dokumen ini mendefinisikan standar visual dan interaksi untuk dashboard. Tujuannya adalah menciptakan antarmuka yang **tenang, terpercaya, dan berorientasi data**, sesuai dengan nuansa profesional di bidang keamanan siber, sembari memanfaatkan fleksibilitas **shadcn/ui** dan **Tailwind CSS**.

## 1. Prinsip Desain (Design Principles)
1.  **Clarity (Kejelasan)**: Data risiko harus mudah dipindai. Hindari kekacauan visual. Setiap elemen grafis harus memiliki tujuan.
2.  **Consistency (Konsistensi)**: Menggunakan sistem komponen shadcn yang terstandarisasi. Spasi, tipografi, dan warna mengikuti skala matematis yang kaku.
3.  **Efficiency (Efisiensi)**: Meminimalkan jumlah klik. Informasi paling kritis (skor kesenjangan tertinggi) harus muncul di halaman muka (*above the fold*).
4.  **Transparency (Transparansi)**: Menampilkan *timestamp* data terakhir diperbarui secara eksplisit, karena data risiko bersifat dinamis dan kritis.

## 2. Sistem Warna (Color System)
Menggunakan *CSS Variables* bawaan shadcn sebagai fondasi, dengan penyesuaian untuk konteks keamanan siber.

### A. Warna Netral (Base)
*Menggunakan tema "Neutral" dari shadcn untuk tampilan yang bersih dan profesional.*
- **Background**: `slate` / `zinc` (light mode) dan `slate-950` (dark mode).
- **Foreground (Text)**: Menggunakan gradasi `slate-100` hingga `slate-900` untuk keterbacaan optimal.

### B. Warna Semantik NIST CSF (6 Fungsi)
Warna-warna ini akan digunakan untuk ikon, label kategori, dan segmen grafik. Ini penting untuk membedakan 6 fungsi secara visual.
| Fungsi | Kode Warna (Tailwind) | Penggunaan |
| :--- | :--- | :--- |
| **Govern** (Tata Kelola) | `#3B82F6` (Blue-500) | Navigasi, badge strategi. |
| **Identify** (Identifikasi) | `#10B981` (Emerald-500) | Aset, inventaris. |
| **Protect** (Lindungi) | `#F59E0B` (Amber-500) | Keamanan akses, enkripsi. |
| **Detect** (Deteksi) | `#8B5CF6` (Violet-500) | Monitoring, alert. |
| **Respond** (Tanggapi) | `#EF4444` (Red-500) | Insiden, playbook. |
| **Recover** (Pulihkan) | `#EC4899` (Pink-500) | Backup, pemulihan. |

### C. Warna Severity (Tingkat Kesenjangan)
Untuk indikator risiko (Gap Score):
| Tingkat | Rentang Gap | Warna | Status |
| :--- | :--- | :--- | :--- |
| **Kritis** | > 70% | `#DC2626` (Red-600) | Perlu Tindakan Segera. |
| **Tinggi** | 50% - 70% | `#EA580C` (Orange-600) | Perlu Tindakan. |
| **Sedang** | 30% - 50% | `#CA8A04` (Yellow-600) | Dalam Pemantauan. |
| **Rendah** | < 30% | `#16A34A` (Green-600) | Terkendali. |
| **N/A** | Belum Dinilai | `#9CA3AF` (Gray-400) | Tidak Ada Data. |

## 3. Tipografi (Typography)
- **Font Family**: **Inter** (default Next.js + shadcn). Dipilih karena legibilitas tinggi pada ukuran kecil (sangat cocok untuk tabel data).
- **Skala**:
  - `H1` (Dashboard Title): `text-3xl` / `font-bold` / `tracking-tight`.
  - `H2` (Section Header): `text-xl` / `font-semibold`.
  - `H3` (Card Title): `text-lg` / `font-medium`.
  - `Body`: `text-sm` / `leading-relaxed` (ukuran standar untuk konten padat data).
  - `Caption / Meta`: `text-xs` / `text-muted-foreground`.

## 4. Arsitektur Layout (Tata Letak)
Layout mengikuti pola standar dashboard SaaS untuk efisiensi navigasi.

```text
+--------------------------------------------------------------+
| [Sidebar] | [Top Navbar]                                     |
|           | (User Avatar, Notifications, Toggle Theme)       |
|  Logo     |--------------------------------------------------+
|  - Govern | | [Main Content Area]                           |
|  - Identify| |                                                |
|  - Protect | |  Breadcrumb > Title                           |
|  - Detect  | |  [Grid Cards - KPI Summary]                   |
|  - Respond | |  +--------+ +--------+ +--------+ +--------+ |
|  - Recover | |  | KPI 1   | | KPI 2   | | KPI 3   | | KPI 4 | |
|            | |  +--------+ +--------+ +--------+ +--------+ |
|            | |                                                |
|            | |  [Main Chart / Tabel Data]                     |
|            | |  +------------------------------------------+  |
|            | |  |  Grafik Radar / Heatmap / Table          |  |
|            | |  +------------------------------------------+  |
+--------------------------------------------------------------+
```

### Spesifikasi Layout:
- **Sidebar**: Lebar `w-64` (16rem). Collapsible menjadi ikon `w-16` pada perangkat tablet. Background menggunakan `border-r` dengan efek *glassmorphism* ringan atau solid.
- **Top Navbar**: Tinggi `h-16`. Fixed position (sticky) di bagian atas dengan `backdrop-blur` untuk memberikan efek modern saat di-scroll.
- **Main Content**: Padding `p-4` hingga `p-8` (responsif). Menggunakan `max-w-7xl` untuk menjaga lebar baca agar tidak terlalu lebar.

## 5. Komponen UI & Pola Interaksi (shadcn/ui Customization)
Berikut adalah standar penggunaan komponen shadcn yang sudah di-install:

| Komponen | Modifikasi / Aturan Penggunaan |
| :--- | :--- |
| **Card** | Gunakan `shadow-sm` (bayangan halus) dan `border` untuk memberikan kedalaman ringan. Hindari shadow yang terlalu tebal agar tidak mengganggu fokus pada data. |
| **Data Table** | Menggunakan komponen `Table` + `Pagination`. Untuk kolom dengan status, gunakan `Badge` dengan warna severity. Untuk kolom aksi, gunakan `DropdownMenu` (ikon 3 titik). |
| **Form** | Setiap input wajib memiliki `label` yang jelas. Pesan error menggunakan komponen `Alert` atau teks merah kecil di bawah input. Gunakan `React Hook Form` dengan mode `onBlur` dan `onChange` untuk validasi real-time. |
| **Tabs** | Digunakan untuk membagi halaman penilaian per fungsi (misal: Tab "Govern", Tab "Identify"). |
| **Dialog / Sheet** | Untuk form *Create* dan *Edit* assessment, gunakan **Sheet** (slide dari samping) agar pengguna tetap melihat konteks data induk. |
| **Chart** | Menggunakan **Recharts** (akan diinstall). Wajib menggunakan custom tooltip yang informatif dan legenda yang merepresentasikan 6 fungsi NIST. |

## 6. Desain Data Visualization (Visualisasi Data)
Karena dashboard ini berbasis kerangka NIST, visualisasi adalah komponen kritis.

1.  **Radar Chart (Spider Chart)**: Menampilkan skor rata-rata per 6 fungsi (Current vs Target). Ini adalah **hero component** di halaman utama.
    - *Aturan*: Sumbu maksimal adalah 4.0 (Tier 4). Area untuk "Target" diberi *opacity* 0.2, sedangkan "Current" diberi *opacity* 0.5 dengan garis lebih tebal.
2.  **Horizontal Bar Chart**: Digunakan untuk menampilkan "Top 5 Kesenjangan Terbesar" berdasarkan sub-kategori. Warna bar menyesuaikan tingkat severity.
3.  **Heatmap / Status Grid**: Menampilkan matriks assessment per Aset vs Fungsi. Sel berwarna hijau (terpenuhi) atau merah (belum) untuk memudahkan identifikasi *blind spot*.

## 7. Responsivitas (Mobile-First)
- **Mobile (< 768px)**: Sidebar berubah menjadi *Hamburger Menu* (overlay). Tabel berubah menjadi daftar kartu (*card list*). Grafik Radar mengecil, tetapi tetap terlihat.
- **Tablet (768px - 1024px)**: Sidebar menyusut (collapsed icon mode). Grid KPI berubah dari 4 kolom menjadi 2 kolom.
- **Breakpoints**: Menggunakan utilitas bawaan Tailwind (`sm:`, `md:`, `lg:`, `xl:`).

## 8. Aksesibilitas (Accessibility - a11y)
Untuk memastikan dashboard digunakan oleh semua kalangan (termasuk disabilitas):
1.  **Kontras Warna**: Semua kombinasi teks dan background harus memenuhi rasio kontras minimum **4.5:1** (standar WCAG AA). Shadcn secara default sudah memenuhi ini.
2.  **Focus Indicator**: Jangan pernah menghilangkan `outline` default browser tanpa menggantinya dengan gaya fokus kustom yang jelas (misal: `ring-2 ring-blue-500`).
3.  **Label & Aria**: Setiap ikon saja (tanpa teks) WAJIB memiliki `aria-label`. Contoh: Tombol "Tambah Aset" menggunakan ikon `+`, harus memiliki `aria-label="Tambah aset baru"`.
4.  **Keyboard Navigasi**: Semua interaksi (dropdown, dialog, sheet) harus dapat diakses sepenuhnya menggunakan tombol `Tab` dan `Enter` / `Space`.

## 9. Dark Mode vs Light Mode
- Implementasikan **Dark Mode** menggunakan `next-themes` dengan deteksi preferensi sistem (`system`) sebagai default.
- **Light Mode**: Background putih (`#FFFFFF`), border abu-abu terang (`#E2E8F0`). Cocok untuk penggunaan di ruangan terang.
- **Dark Mode**: Background abu-abu gelap (`#0F172A`), border abu-abu sedang (`#334155`). Cocok untuk ruangan gelap (ruang SOC) dan mengurangi silau mata.
- *Pastikan*: Warna Severity (Merah, Hijau) tetap memiliki kontras yang baik di kedua mode.

## 10. Panduan Implementasi di Kode (Tailwind Config)
Untuk menerapkan warna NIST di atas, tambahkan kustomisasi di `tailwind.config.ts`:

```typescript
const config = {
  // ... default shadcn config
  theme: {
    extend: {
      colors: {
        nist: {
          govern: '#3B82F6',
          identify: '#10B981',
          protect: '#F59E0B',
          detect: '#8B5CF6',
          respond: '#EF4444',
          recover: '#EC4899',
        },
        risk: {
          critical: '#DC2626',
          high: '#EA580C',
          medium: '#CA8A04',
          low: '#16A34A',
          none: '#9CA3AF',
        }
      }
    }
  }
}
```