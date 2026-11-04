# Losta Masta

Website React dari `losta_masta_spesialis_pembuatan_website.tsx`, dengan Vite, Tailwind CSS, Framer Motion, dan Lucide.

## Pengembangan

### Pembaruan galeri dan About Me — 4 November 2026

Eksperimen **hanya di `/portofolio`**: galeri screenshot halaman lengkap dari enam demo homepage yang dibuat lokal, About Me dengan profil pribadi, dan galeri interaktif menjelang footer. Ini merupakan calon pengganti homepage untuk ditinjau, belum diterapkan ke homepage utama. Homepage `/` sudah dikembalikan ke komposisi sebelumnya: galeri bergerak, kartu karya bertumpuk, Tentang Saya, layanan, proses, FAQ, dan kontak. `/baru` kembali memakai konten lama dengan hero eksperimennya. Rak buku tetap tersedia di `/portofolio#collection` dan memakai screenshot yang sama.

- Karya eksperimen: http://localhost:5173/portofolio#projects
- About Me eksperimen: http://localhost:5173/portofolio#about
- Galeri scroll interaktif: http://localhost:5173/portofolio#playground
- Versi dengan rak buku: http://localhost:5173/portofolio

Enam demo tersedia di `/konsep/solaris`, `/konsep/nextlevel`, `/konsep/aura`, `/konsep/pulse`, `/konsep/folio` (Forma), dan `/konsep/terra`. Screenshot berasal dari demo yang dapat dibuka, bukan website klien. Enam aset WebP di `public/media/homepages/` total 492.268 byte. File bersama: `src/portfolio-work.ts`, `src/portfolio-sections.tsx`, dan `src/portfolio-sections.css`; demo di `src/concept-demo.tsx` dan `src/concept-demo.css`.

Pemeriksaan terarah dilakukan untuk bagian yang sebelumnya dilaporkan hilang: DOM desktop/mobile, perubahan transform galeri saat scroll, rail mobile, dan konsol. Tidak menjalankan build, typecheck, lint, full suite, E2E, atau screenshot QA halaman hasil. Rincian dan perbandingan pola komponen di [DESIGN-NOTES.md](DESIGN-NOTES.md). Perubahan tetap lokal.

Catatan setelah bagian ini memuat riwayat implementasi sebelumnya; pembaruan di atas menggantikan keterangan lama mengenai galeri dan About Me.

Pembaruan karakter `/baru` (4 November 2026): memakai `coba/rest.png` sebagai master, `coba/left.png` dan `coba/right.png` sebagai arah pandang, serta lima ekspresi `01_kedip_jahil.png` hingga `05_melirik_curiga.png`. Delapan aset diekspor ke `public/media/living-portrait/coba/` sebagai WebP transparan 960 px; provenance ada di `source.json`. Fallback dan preload memakai master baru. Engine hanya memuat set karakter ini, mengikuti kursor secara horizontal, mempertahankan tarik pipi, dan menyediakan tombol arah pandang, lima ekspresi, reset, serta jeda. Hover mata memicu kedip; klik/tarik pipi memicu pipi gembung; hover kontak memicu senyum; hover karya/dahi memicu ide; hover hidung atau giliran idle memicu lirikan curiga. Ekspresi dan warna rambut karakter lama tidak digunakan pada `/baru`; `/portofolio` tetap memakai set sebelumnya.

Pemeriksaan lima ekspresi: inspeksi lembar kontak aset sumber dan metadata transparansi; Chrome DevTools MCP pada Chrome Reza / Profile 1 memverifikasi decode kelima WebP 960 px, pemilihan state kelima tombol ekspresi dan arah pandang, kembali netral setelah kedip, reset, jeda/lanjut, serta pemicu hover mata/dahi/hidung/kontak/karya melalui event DOM. Tidak ada console error/warning atau error WebGL; halaman desktop tidak overflow horizontal. Pemeriksaan hover memakai penantian frame karena jeda tetap 150 ms sempat membaca state lama. Tidak mengambil screenshot halaman, menjalankan build/typecheck/lint/full suite, atau menguji drag fisik, idle otomatis 30–45 detik, dan mobile. Skill `vercel-react-best-practices` sudah dibaca. Perubahan masih lokal.

Eksperimen living portrait tersedia di **http://localhost:5173/baru**. Route `/` tetap memakai hero sebelumnya. `/baru` mengganti hero dengan kartun interaktif dari `../promptheadline.md`, sementara bagian karya, tentang, layanan, proses, FAQ, dan kontak memakai halaman yang sudah ada. Route eksperimen dimuat lewat lazy import.

Implementasi: `src/baru-page.tsx`, `src/baru.css`, serta `src/living-portrait.js` dan deklarasi tipenya. Engine mempertahankan gambar ekspresi utuh, crossfade maksimal 70 ms, simulasi 1/240 detik dan batas anti lipatan dari prompt. Ditambahkan kontrol bersin/rambut/permen karet/reset, jeda mengikuti preferensi animasi proyek, listener terlingkup, cleanup WebGL, dan fallback gambar. Sentuhan yang dibatalkan saat scroll tidak dihitung sebagai tap wajah.

Daftar ID prompt berisi **58 gambar**, walaupun deskripsinya menyebut 59. Seluruh 58 gambar berhasil diimpor ke `public/media/living-portrait/` (WebP 640 px, total 4,97 MiB), dengan pemetaan sumber di `source.json`. Impor ulang menggunakan `python scripts/import-living-portrait.py`. Tidak memakai GIF galeri atau klaim proyek Mina dari contoh prompt; identitas dan isi tetap Losta Masta.

Pemeriksaan 4 November 2026 untuk `/baru`: readiness HTTP 200 dari server lokal yang sudah aktif. Tidak menjalankan build, lint, typecheck, tes, screenshot, atau pemeriksaan browser; perilaku interaktif dan layout belum diverifikasi di browser. Perubahan hanya lokal, belum dipublikasikan.

Pembaruan pemuatan aset `/baru`: inventaris source menemukan 122 referensi media lokal (termasuk 58 ekspresi wajah, 5.208.316 byte) dan tidak ada file yang hilang. Font Kanit juga memakai WOFF2 lokal; URL eksternal di manifest adalah kunci provenance yang dipetakan ke file lokal. Preload kini memilih karakter sesuai route, sehingga `/baru` tidak mempreload hero lama. Engine memakai decode gambar asinkron tanpa CORS lintas origin dan mendahulukan mata/ekspresi interaksi sebelum gambar idle. Perubahan ini belum diukur di browser; tidak ada klaim peningkatan waktu atau FPS.

```powershell
npm install
npm run dev
```

Komposisi halaman dan animasi berada di `losta_masta_spesialis_pembuatan_website.tsx`. Isi portofolio, layanan, FAQ, dan nomor WhatsApp terpusat di `src/portfolio-data.ts`. Ilustrasi konsep desktop/mobile dibuat secara lokal di `src/concept-preview.tsx`, dan aturan responsif ada di `src/styles.css`. File awal di direktori induk tetap disimpan sebagai referensi.

## Publikasi

Identitas Sites tersimpan di `.openai/hosting.json`. Build produksi menggunakan `npm run build` dan menghasilkan direktori `dist/`. Gunakan kembali identitas Sites yang sama untuk pembaruan berikutnya.

## Portofolio dan kontak

Urutan halaman: Hero → Eksplorasi → Karya Pilihan → Tentang → Layanan → Cara Kerja → FAQ → Kontak. Tiga proyek unggulan dan enam eksplorasi merupakan **konsep desain**, bukan proyek klien yang sudah dirilis. Preview vektor dibuat untuk proyek ini; tidak ada klaim hasil bisnis, metrik performa, atau domain klien rekaan.

Semua CTA kontak langsung menuju WhatsApp resmi **+62 831-2286-6975**. Pesan awal dari proyek dan layanan membawa konteks terkait. Tidak ada formulir yang menampilkan status terkirim tanpa benar-benar mengirim pesan. Customer tetap menekan Kirim di WhatsApp.

Detail proyek memakai native `dialog` untuk fokus keyboard, Escape, pengembalian fokus, dan latar inert. Pilihan Desktop/Mobile mendukung tombol panah, Home, dan End. Kartu tetap memakai scroll stack bila seluruh kontennya muat di viewport; pada layar pendek, layout beralih ke alur biasa. Reduced motion menonaktifkan translasi, skala, dan scroll halus.

## Preview tautan

Metadata Open Graph/Twitter dan gambar `public/media/losta-masta-share.jpg` sudah disiapkan. Sebelum publikasi, salin `.env.example` ke `.env.local` dan isi `VITE_SITE_URL` dengan URL publik yang sebenarnya. Build akan menjadikan URL gambar absolut serta menambahkan canonical dan `og:url`. Jangan memakai domain contoh sebagai URL produksi. Gambar dapat dibuat ulang dengan `python scripts/create-share-card.py` (Pillow dan font Arial Windows).

Tidak ada demo live untuk konsep saat ini. Untuk proyek yang benar-benar sudah tersedia, isi `demoUrl` di data proyek agar tombol Buka Demo muncul; sesuaikan juga label/status dan kontennya dengan keadaan proyek tersebut.

## Media lokal dan performa

Semua gambar dan font disajikan dari `public/media/`. URL awal di komponen dipakai sebagai kunci provenance dalam `src/media-manifest.json`; `src/media.tsx` mengubahnya menjadi URL lokal dan memilih ukuran WebP sesuai layar.

Galeri aktif memakai enam ilustrasi konsep SVG yang dibuat langsung oleh React. Aset galeri MP4/WebP lama dan komponen `GalleryVideo` tetap disimpan, tetapi tidak ditampilkan sebagai karya milik Losta Masta. Karakter utama tetap dipreload tanpa jeda animasi masuk. Pembaruan scroll dan pointer tidak merender ulang React setiap gerakan.

Untuk menghasilkan ulang aset: `python scripts/optimize-assets.py` (memerlukan Pillow, requests, dan FFmpeg). Media asli disimpan dalam cache lokal yang diabaikan Git di `.sites-runtime/original-media/`. Lisensi Kanit disertakan di `public/media/Kanit-OFL.txt`.

Arahan saat ini: pengembangan lokal dahulu. Jangan memublikasikan perubahan berikutnya sebelum diminta pengguna.

## Checkpoint motion mobile — 4 November 2026

- Karakter desktop dan mobile langsung mengambang saat halaman dibuka; galeri bergerak otomatis saat terlihat. Animasi CSS memakai transform pada wrapper terpisah dari efek pointer/scroll, dan dijeda saat keluar layar atau tab tersembunyi. Wrapper galeri memakai display flex pada semua ukuran agar deteksi visibilitas bekerja.
- Sesuai permintaan pengguna, animasi default aktif pada kunjungan pertama di desktop dan mobile, tanpa bergantung pada emulasi Chrome atau preferensi sistem. Kontrol Jeda/Aktifkan animasi menyimpan pilihan eksplisit pengguna di browser.
- Pemeriksaan terbaru Chrome DevTools: reload desktop 1078 px dan mobile 390 px dengan penyimpanan pilihan kosong serta reduced motion sistem aktif tetap menghasilkan mode full dan gerakan otomatis sejak awal. Kedua baris galeri bergerak tanpa perubahan scroll pada kedua ukuran; kontrol jeda/aktifkan dan penyimpanan pilihan bekerja; tidak ada console error atau overflow halaman. Mobile tetap rata tengah. Belum diuji pada HP fisik; tidak menjalankan build, lint, typecheck, atau suite rutin.
- Skill yang sudah dibaca: Motion, Animate, Responsive, Animation Performance, dan Vercel React Best Practices. Perubahan belum dipublikasikan.

## Checkpoint implementasi — 3 November 2026

- Susunan karya lebih dahulu, isi konsep, CTA WhatsApp langsung, proses, FAQ, preview desktop/mobile, dan metadata berbagi sudah diimplementasikan tanpa dependensi baru.
- `komponen` dan `motion` dibaca pada tahap perencanaan; implementasi juga mengikuti resource `animate`, `responsive`, dan `vercel-react-best-practices`. Referensi React Bits/Aceternity/Magic UI hanya inspirasi; tidak ada source komponen mereka yang disalin.
- Belum dipublikasikan. Build, typecheck, lint, browser, dan tes rutin tidak dijalankan, mengikuti preferensi pengguna. Tampilan lintas perangkat belum diverifikasi secara visual.
- Pemeriksaan terarah untuk memperbaiki alur kontak lama: URL WhatsApp umum, konteks proyek Aura, dan konteks layanan E-Commerce & Katalog semuanya mengarah ke nomor resmi dan mempertahankan teks pesan setelah encoding. Tidak mengirim pesan sungguhan. Gambar preview berbagi berhasil dibuat secara lokal.
