import { EXPLORATIONS, PROJECTS, type ProjectItem } from './portfolio-data';

const EXTRA: Record<string, { goal: string; approach: string; pages: string[] }> = {
  pulse: { goal: 'Menyajikan proyek, tugas, dan informasi tim dalam ruang kerja yang mudah dipahami.', approach: 'Panel gelap, hierarki yang tenang, dan aksen biru membantu pengguna mengenali prioritas.', pages: ['Ringkasan ruang kerja', 'Daftar proyek & tugas', 'Ringkasan aktivitas tim'] },
  folio: { goal: 'Mengenalkan praktik desain independen melalui karya dan pendekatan kreatifnya.', approach: 'Warna koral, tipografi editorial, dan komposisi berani membuat setiap karya punya panggung.', pages: ['Karya pilihan', 'Profil desainer', 'Layanan & kontak'] },
  terra: { goal: 'Menceritakan sebuah brand yang berangkat dari alam dan perhatian pada proses.', approach: 'Palet organik, ruang kosong, dan cerita visual menghubungkan produk dengan nilai brand.', pages: ['Cerita brand', 'Koleksi & proses', 'Kontak dan pertanyaan'] },
};

export const WORKS: ProjectItem[] = EXPLORATIONS.map((item, index) => ({
  ...(PROJECTS.find(project => project.id === item.id) ?? {
    id: item.id, number: `0${index + 1}`, name: item.title, category: item.category, status: 'Concept Project' as const,
    summary: EXTRA[item.id].goal, goal: EXTRA[item.id].goal, approach: EXTRA[item.id].approach,
    pages: EXTRA[item.id].pages, features: ['Arah visual', 'Struktur informasi', 'Konsep responsif'],
    technologies: ['React', 'TypeScript', 'Responsive UI'],
  }),
  demoUrl: `/konsep/${item.id}`,
}));

export const homepageImage = (id: string) => `/media/homepages/${id}.webp`;
export const homepageHeight = (id: string) => id === 'folio' || id === 'terra' ? 2311 : 2238;
