export const CONTACT = {
  number: '6283122866975',
  display: '+62 831-2286-6975',
};

export function whatsappUrl(context?: string) {
  const message = context
    ? `Halo Losta Masta, saya tertarik ${context}. Saya ingin mendiskusikan kebutuhan website untuk bisnis saya.`
    : 'Halo Losta Masta, saya ingin mendiskusikan pembuatan website untuk bisnis saya.';
  return `https://wa.me/${CONTACT.number}?text=${encodeURIComponent(message)}`;
}

export type ConceptKey = 'nextlevel' | 'aura' | 'solaris' | 'folio' | 'terra' | 'pulse';

export interface ProjectItem {
  id: ConceptKey;
  number: string;
  name: string;
  category: string;
  status: 'Concept Project';
  summary: string;
  goal: string;
  approach: string;
  features: string[];
  pages: string[];
  technologies: string[];
  demoUrl?: string;
}

// These are design studies, not shipped client websites or measured business results.
export const PROJECTS: ProjectItem[] = [
  {
    id: 'nextlevel', number: '01', name: 'Nextlevel', category: 'AI & Studio Website', status: 'Concept Project',
    summary: 'Membuat layanan teknologi yang kompleks terasa sederhana, menarik, dan mudah dijelajahi.',
    goal: 'Memperkenalkan sebuah studio AI dan mengarahkan calon pelanggan ke percakapan tentang kebutuhan mereka.',
    approach: 'Tipografi tegas, ruang gelap yang lapang, dan aksen violet membentuk alur dari pengenalan layanan menuju konsultasi.',
    features: ['Presentasi layanan', 'Eksplorasi karya', 'Alur konsultasi'],
    pages: ['Beranda & pengenalan studio', 'Layanan dan pendekatan kerja', 'Karya pilihan', 'Kontak konsultasi'],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    id: 'aura', number: '02', name: 'Aura', category: 'Lifestyle & E-Commerce', status: 'Concept Project',
    summary: 'Sebuah konsep etalase lifestyle yang memberi ruang untuk produk dan cerita di baliknya.',
    goal: 'Membantu pengunjung mengenali koleksi, memahami karakter produk, dan menemukan langkah pemesanan.',
    approach: 'Warna hangat, komposisi editorial, dan detail produk yang terarah menghadirkan pengalaman belanja yang tenang.',
    features: ['Etalase koleksi', 'Cerita produk', 'Navigasi kategori'],
    pages: ['Beranda koleksi', 'Katalog dan kategori', 'Konsep detail produk', 'Cerita brand & kontak'],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Responsive UI'],
  },
  {
    id: 'solaris', number: '03', name: 'Solaris', category: 'Corporate & Company Profile', status: 'Concept Project',
    summary: 'Identitas perusahaan yang tampil percaya diri dengan informasi yang mudah ditemukan.',
    goal: 'Menyusun profil perusahaan dan solusi bisnis dalam struktur yang membantu pengunjung memahami penawaran.',
    approach: 'Grid yang rapi, palet hijau lembut, dan hierarki informasi yang jelas menghubungkan cerita perusahaan dengan layanannya.',
    features: ['Profil perusahaan', 'Presentasi solusi', 'Kontak bisnis'],
    pages: ['Beranda perusahaan', 'Profil & nilai perusahaan', 'Solusi bisnis', 'Kontak dan pertanyaan'],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Responsive UI'],
  },
];

export const EXPLORATIONS: { id: ConceptKey; title: string; category: string }[] = [
  { id: 'solaris', title: 'Solaris', category: 'Company Profile' },
  { id: 'nextlevel', title: 'Nextlevel', category: 'Landing Page' },
  { id: 'aura', title: 'Aura', category: 'E-Commerce' },
  { id: 'pulse', title: 'Pulse', category: 'Dashboard' },
  { id: 'folio', title: 'Forma', category: 'Portfolio' },
  { id: 'terra', title: 'Terra', category: 'Brand Website' },
];

export const SERVICES = [
  { name: 'Landing Page & Company Profile', description: 'Perkenalkan bisnis dengan cerita yang jelas dan arahkan pengunjung ke langkah berikutnya.', deliverables: ['Struktur konten', 'Desain responsif', 'Integrasi kontak'] },
  { name: 'E-Commerce & Katalog', description: 'Bantu pelanggan menemukan produk, mengenali keunggulannya, dan memulai pemesanan.', deliverables: ['Katalog produk', 'Detail produk', 'Alur pemesanan'] },
  { name: 'Web App & Dashboard', description: 'Terjemahkan kebutuhan operasional menjadi tampilan kerja yang terstruktur dan mudah digunakan.', deliverables: ['Pemetaan alur', 'Antarmuka dashboard', 'Integrasi sesuai kebutuhan'] },
  { name: 'Redesign & Optimasi', description: 'Rapikan website yang sudah ada agar pesannya lebih jelas dan pengalaman pengguna lebih nyaman.', deliverables: ['Review tampilan', 'Perapian pengalaman', 'Optimasi sesuai temuan'] },
];

export const PROCESS = [
  { title: 'Kenali kebutuhan', description: 'Kita mulai dari bisnis, pengunjung, dan tujuan yang ingin dicapai.' },
  { title: 'Susun desain', description: 'Struktur dan arah visual disusun agar setiap bagian punya tujuan.' },
  { title: 'Bangun interaksi', description: 'Desain diwujudkan menjadi website dengan layout responsif dan interaksi yang terarah.' },
  { title: 'Review & serah terima', description: 'Hasil ditinjau bersama, lalu disiapkan untuk digunakan sesuai cakupan proyek.' },
];

export const FAQS = [
  { question: 'Bisa menyesuaikan identitas brand saya?', answer: 'Bisa. Warna, tipografi, karakter visual, dan struktur konten disesuaikan dengan identitas brand serta tujuan website Anda.' },
  { question: 'Apakah desainnya mencakup mobile dan desktop?', answer: 'Ya. Layout dirancang mengikuti ruang layar, dengan karakter visual dan fungsi utama yang konsisten di mobile maupun desktop.' },
  { question: 'Bagaimana menentukan biaya dan waktu pengerjaan?', answer: 'Estimasi disusun setelah kebutuhan, jumlah halaman, fitur, dan kesiapan materi dibahas. Cakupan, jadwal, serta ketentuan pengerjaan disepakati sebelum proyek dimulai.' },
  { question: 'Bisa merapikan website yang sudah ada?', answer: 'Bisa. Kirim tautan website dan ceritakan bagian yang ingin diperbaiki. Kita bahas prioritasnya, mulai dari tampilan, struktur informasi, hingga interaksi.' },
];
