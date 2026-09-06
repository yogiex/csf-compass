# PRD: NIST CSF v2.0 Dashboard

## 1. Tujuan & Visi
Membangun dashboard manajemen risiko siber yang mengadopsi kerangka **NIST Cybersecurity Framework (CSF) 2.0**. Dashboard ini bertujuan untuk membantu tim keamanan informasi (CISO, Analis) dalam memetakan postur keamanan saat ini (`Current Profile`) terhadap target yang diinginkan (`Target Profile`) berdasarkan 6 Fungsi Inti: **Govern, Identify, Protect, Detect, Respond, Recover**.

## 2. Target Pengguna (Persona)
1.  **CISO / Manajer Keamanan**: Melihat gambaran besar risiko dan alokasi sumber daya.
2.  **Analis Keamanan**: Mengisi data penilaian (assessment) dan mengelola temuan.
3.  **Auditor**: Melihat histori perubahan dan bukti kepatuhan.

## 3. Fitur Utama (Epics)
| Epic | Deskripsi | Prioritas |
| :--- | :--- | :--- |
| **Manajemen Aset** | CRUD aset (sistem/aplikasi) yang akan dinilai. | P0 (Wajib) |
| **Penilaian CSF** | Formulir dinamis untuk menilai tingkat kematangan (Tier 1-4) per Sub-kategori CSF. | P0 |
| **Analisis Kesenjangan** | Visualisasi perbandingan antara kondisi "Saat Ini" vs "Target" dalam bentuk grafik radar/heatmap. | P0 |
| **Rekomendasi Tindakan** | Sistem menghasilkan daftar "Action Plan" otomatis berdasarkan kesenjangan terbesar. | P1 (Penting) |
| **Manajemen Pengguna** | Autentikasi dan role-based access control (Admin, Analis, Viewer). | P1 |

## 4. Alur Logika Bisnis (Krusial)
1.  **Alur Penilaian**: Pengguna memilih Aset -> Pilih Fungsi (misal: `Protect`) -> Isi skor `Current` dan `Target` untuk setiap Sub-kategori.
2.  **Alur Perhitungan Risiko**: Skor kesenjangan dihitung dengan rumus: `Gap = (Target - Current) / Target * 100%`. Jika `Gap > 50%`, status dianggap **"Kritis"**.
3.  **Alur Persetujuan**: Assessment yang sudah diisi harus melalui status "Draft" -> "Submitted" -> "Reviewed". Status hanya bisa diubah oleh Admin.

## 5. Persyaratan Non-Fungsional
- **Kinerja**: Waktu muat halaman < 2 detik (menggunakan Next.js Server Components).
- **Keamanan**: Semua endpoint API wajib memiliki validasi autentikasi menggunakan middleware Next.js.
- **Ketersediaan**: Error handling harus bersifat *graceful* (tidak menampilkan *crash* bawaan React).

## 6. Toleransi Kesalahan (Error Handling)
- **Network Error**: Menampilkan Toast "Gagal terhubung ke server. Periksa koneksi internet Anda."
- **Validation Error**: Setiap input form tidak boleh kosong. Jika nilai `Target < Current`, sistem harus menolak dengan pesan "Target tidak boleh lebih rendah dari skor saat ini."
- **404/Data Tidak Ditemukan**: Menampilkan komponen `not-found.tsx` khusus.
