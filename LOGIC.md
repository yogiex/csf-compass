# Panduan Logika Pengembangan (Edge Cases & Validasi)

Dokumen ini berfungsi sebagai "Checklist Logika" yang harus dipastikan oleh developer sebelum pull request.

## 1. Validasi Form Assessment (Paling Rawan Cacat Logika)
| Skenario | Logika yang Benar | Status |
| :--- | :--- | :--- |
| **Input Current > Target** | Sistem harus menampilkan peringatan: "Skor saat ini tidak boleh melebihi skor target". Blokir submit. | ✅ Wajib |
| **Input Target = 0 (Tidak Ada)** | Jika Target = 0, maka perhitungan Gap menghasilkan division by zero. Logika: Jika Target = 0, maka Gap = 100% (karena tidak ada target yang ditetapkan). | ✅ Wajib |
| **Form Kosong (Partial Submit)** | Hanya sub-kategori yang memiliki nilai yang dihitung. Sub-kategori kosong diabaikan dalam perhitungan rata-rata. | ✅ Wajib |
| **Edit Data Assessment** | Saat mengedit, form harus terisi dengan data lama. Pastikan state `defaultValues` pada React Hook Form sync dengan data terbaru (gunakan `useEffect` atau mode `reset`). | ✅ Wajib |

## 2. Logika Sinkronisasi Antara 6 Fungsi CSF
- **Aturan Bisnis**: Fungsi `Govern` (Tata Kelola) harus dinilai terlebih dahulu sebelum fungsi lainnya, karena fungsi ini adalah fondasi.
- **Implementasi**: Di halaman dashboard, jika assessment untuk `Govern` belum diisi, tampilkan banner "Harap selesaikan penilaian Tata Kelola (Govern) terlebih dahulu sebelum melanjutkan ke fungsi lainnya."

## 3. Manajemen Sesi & Autentikasi
- **Token Expired**: Middleware harus mendeteksi JWT expired. Jika terjadi, alihkan user ke halaman `/login` dengan query param `?session=expired`.
- **Redirect After Login**: User harus dikembalikan ke halaman yang sebelumnya diakses (menggunakan `redirectTo`).

## 4. Penanganan Database (Prisma / Drizzle)
- **Constraint Unik**: Nama aset tidak boleh duplikat dalam satu organisasi. Tangkap error `PrismaClientKnownRequestError` dengan kode `P2002` dan ubah menjadi pesan ramah: "Aset dengan nama ini sudah terdaftar."
- **Soft Delete**: Jangan hapus data assessment secara permanen. Gunakan field `deletedAt` (timestamp) untuk menyembunyikan data, tetapi mempertahankan integritas referensi.

## 5. Edge Cases pada Grafik / Visualisasi
- **Data Kosong**: Jika belum ada data assessment, grafik radar harus menampilkan teks "Belum ada data yang tersedia" (bukan grafik kosong yang membingungkan).
- **Perubahan Skala**: Pastikan sumbu grafik selalu memiliki range 0 - 4 (mengikuti Tier CSF) agar visualisasi tidak bergeser-geser secara dramatis saat data berubah.

## 6. Logging Aktivitas (Audit Trail)
Untuk menghindari "cacat logika" dalam investigasi insiden, setiap aksi **Create**, **Update**, dan **Delete** pada assessment harus mencatat log ke tabel terpisah (`AuditLog`) dengan informasi:
- `userId`, `action`, `timestamp`, `metadata` (perubahan sebelum-sesudah).