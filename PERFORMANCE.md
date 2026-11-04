# Pengukuran lokal — 3 November 2026

Target: karakter dan tampilan awal dalam <=1 detik; gambar kartu portofolio siap dalam <=1 detik saat dituju.

Lingkungan: Chrome terhubung, http://localhost:5173/, Vite development, desktop 1078x814. Dua reload mengabaikan cache HTTP; tanpa throttling CPU/jaringan. Preferensi reduced motion aktif. Pengukuran menggunakan PerformanceObserver, Resource Timing, event pemuatan, image.decode(), dan requestAnimationFrame; tanpa screenshot atau Lighthouse.

| Area | Sebelum | Sesudah |
| --- | --- | --- |
| Karakter utama | Unduhan gambar eksternal 13.965 ms | Gambar terdecode + dua frame 734 ms dan 500 ms dari navigasi |
| Tampilan utama (LCP) | Tidak diukur | 640 ms dan 464 ms |
| Gambar portofolio | Sebagian unduhan eksternal 8.108–11.327 ms | Tiga kartu siap 107 / 67 / 61 ms sejak dituju; masing-masing 3 gambar |
| Aset lengkap | 181.228.655 byte aset asli yang berhasil diambil | 7.838.992 byte output lokal termasuk font dan lisensi, sebelum favicon |

Waktu unduhan sebelum dan kesiapan tampilan sesudah memiliki definisi berbeda; angka sebelum menunjukkan penyebab lambat, bukan perbandingan LCP yang terisolasi. Hasil lokal ini tidak menjamin semua perangkat/jaringan atau domain live <=1 detik.

Tidak ada request eksternal pada pengukuran tampilan awal, tidak ada error JavaScript, dan tidak ada video yang diunduh pada hero. Font selesai dimuat. Satu request favicon bawaan 404 ditemukan pada reload kedua; ditangani dengan favicon SVG lokal.

Enam video yang terlihat berhasil dimuat dan diputar tanpa error saat reduced motion diemulasikan ke no-preference. Emulasi dikembalikan ke auto sesudahnya. Dengan reduced motion aktif, poster lokal ditampilkan tanpa mengunduh video.

Pipeline aset selesai: 34 aset, 20 video, 14 gambar, 7 bobot font, tanpa error. GIF Celestia sumber 404 dihapus. Tidak menjalankan build, lint, typecheck, full suite, atau audit Lighthouse untuk perubahan lokal ini.
