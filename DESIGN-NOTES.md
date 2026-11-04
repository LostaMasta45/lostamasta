# Galeri homepage dan About Me — 4 November 2026

## Masalah dari source

Route `/portofolio` mengganti galeri homepage dengan rak buku dan mengganti Tentang Saya dengan cerita studio yang judulnya disembunyikan. Preview karya berupa SVG, belum screenshot. Komposisi default homepage terpisah dari route portofolio.

## Implementasi

- Galeri screenshot menjadi bagian pertama setelah hero, dengan dua kolom desktop dan satu kolom mobile. Frame browser dapat digulir dengan pointer, sentuhan, atau keyboard. Tombol cerita membuka dialog yang sudah ada; tautan di toolbar membuka demo homepage.
- Enam demo lokal dibuat sebagai halaman React responsif: `/konsep/solaris`, `/konsep/nextlevel`, `/konsep/aura`, `/konsep/pulse`, `/konsep/folio` (Forma), `/konsep/terra`. Masing-masing punya navigasi anchor, hero, cerita, eksplorasi, dan footer. Semua berstatus studi desain; bukan website klien dan tidak mengaktifkan fitur transaksi atau aplikasi bisnis.
- Screenshot WebP seluruh homepage berasal dari demo tersebut pada viewport 1440×900. Lebar hasil capture 1425 px; tinggi 2238 px untuk empat demo dan 2311 px untuk Forma/Terra. Enam gambar berjumlah 492.268 byte dan dimuat lazy.
- About Me mendapat judul terlihat, profil dalam sudut pandang pribadi, karakter khas studio, pendekatan kerja, lokasi, dan CTA WhatsApp. Karakter diberi alt sebagai representasi kreatif, bukan foto orang.
- Galeri menjelang footer mengikuti scroll vertikal desktop dengan transform horizontal dan indikator progres. Mobile, layar pendek, reduced motion sistem, atau pilihan jeda memakai scroll horizontal native. Tombol dan keyboard tetap tersedia; fokus kartu menempatkan karya terkait dalam area lihat.
- Sesuai koreksi pengguna, eksperimen hanya dipasang pada `/portofolio` sebagai ide calon pengganti homepage. Komposisi default App dikembalikan ke versi sebelumnya, sehingga homepage `/` dan konten `/baru` kembali seperti sebelum eksperimen ini. Import komponen/CSS eksperimen dari App dihapus; komponen baru dimuat lewat route portofolio. Rak buku tetap ada di `/portofolio` dan memakai screenshot yang sama.
- Tidak menambah dependensi, menyalin source eksternal, atau deploy.

## Pertimbangan komponen

Dokumentasi tiga sumber dibandingkan, tanpa menjalankan demo eksternal atau menyalin kode:

- [shadcn/ui Scroll Area](https://ui.shadcn.com/docs/components/base/scroll-area): pola scroll dengan kontrol eksplisit cocok untuk preview panjang, tetapi kebutuhan ini cukup ditangani overflow native dan fokus keyboard tanpa memasang primitive baru.
- [Aceternity Container Scroll Animation](https://ui.aceternity.com/components/container-scroll-animation): perspektif 3D kuat untuk satu hero; ditolak untuk galeri karena screenshot perlu mudah dibaca dan halaman sudah punya rak 3D.
- [React Bits Stack](https://reactbits.dev/components/stack): tumpukan kartu mendukung eksplorasi satu per satu; ditolak sebagai galeri utama karena menyembunyikan karya lain dan akan mengulang fungsi rak.

Pilihan akhir adalah komponen mandiri dengan CSS native dan Framer Motion yang sudah terpasang. Referensi hanya untuk perbandingan pola. Tidak ada source/aset eksternal baru yang diambil; lisensi source kandidat tidak diaudit untuk penggunaan ulang karena tidak digunakan.

## Pemeriksaan aktual

- Capture aset: menunggu elemen demo terkait dan font siap sebelum capture. Metadata enam WebP dibaca dengan Pillow.
- DOM `/portofolio`, desktop 1440×900: enam kartu homepage, heading About Me, enam kartu reel, sticky aktif, preview dapat digulir, tanpa overflow horizontal dokumen. Menggulir ke titik tengah mengubah track ke translateX −2103,5 px dan indikator ke 50%. Konsol error/warn saat pemeriksaan kosong.
- DOM `/portofolio`, mobile 390×844: galeri satu kolom 350 px, sticky nonaktif, rail dapat digeser, heading About Me hadir, tanpa overflow horizontal dokumen.
- Pemeriksaan homepage `/` sebelumnya dilakukan sebelum koreksi scope dan kini bersifat historis. Setelah koreksi, homepage dikembalikan melalui pemulihan komposisi App sebelumnya; tidak mengulang browser/tes/build untuk rollback terbatas ini. Preview eksperimen ada di `http://localhost:5173/portofolio`.
- Pembacaan awal saat pergantian viewport mendapati DOM belum siap; diulang setelah menunggu elemen terkait, bukan dianggap error aplikasi.
- Tidak menjalankan build, typecheck, lint, full suite, E2E, atau screenshot QA halaman hasil. Screenshot hanya diambil untuk membuat aset yang diminta pengguna. Perilaku perangkat fisik dan detail visual akhir belum diverifikasi.

## Pembuatan ulang capture

Gunakan Chrome Reza / Profile 1 dan Chrome DevTools MCP. Buka demo pada 1440×900, tunggu `.concept-demo.demo-<id>` dan `document.fonts.ready`, lalu ambil fullPage WebP quality 85. Simpan di `public/media/homepages/<id>.webp`; perbarui dimensi di `portfolio-work.ts` bila layout demo diubah.

MCP screenshot tidak mengizinkan menulis langsung ke direktori proyek pada sesi ini. Aset diperoleh dari hasil gambar tool dan disimpan melalui terminal dalam potongan buffer, tanpa mengubah konfigurasi izin MCP.
