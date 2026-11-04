import { useEffect, type CSSProperties } from 'react';
import { ArrowDown, ArrowUpRight, Check, Layers, Leaf, Orbit, Sparkles } from 'lucide-react';
import { WORKS } from './portfolio-work';
import type { ConceptKey } from './portfolio-data';
import './concept-demo.css';

const THEMES = {
  nextlevel: { brand: 'nextlevel®', overline: 'INDEPENDENT AI & DIGITAL STUDIO', title: ['Ideas beyond', 'the ordinary.'], intro: 'Strategi, desain, dan teknologi. Kami menyatukan ketiganya untuk membawa ide berikutnya lebih jauh.', bg: '#111015', ink: '#f3effa', accent: '#b5a0ff', cta: 'Jelajahi pendekatan', section: 'A little curiosity. A whole new possibility.', cards: ['Brand & strategy', 'Digital experiences', 'Creative technology'], footer: 'Ready for your next level?' },
  aura: { brand: 'aura.', overline: 'OBJECTS FOR EVERYDAY RITUALS', title: ['A little less.', 'A little better.'], intro: 'Ruang untuk hal-hal sederhana. Sebuah eksplorasi benda, kebiasaan, dan momen kecil yang terasa berarti.', bg: '#eee8de', ink: '#363028', accent: '#b49779', cta: 'Lihat koleksi konsep', section: 'Thoughtfully made. Quietly extraordinary.', cards: ['Morning essentials', 'Slow afternoons', 'Evening rituals'], footer: 'Make room for the everyday.' },
  solaris: { brand: 'solaris↗', overline: 'A CLEARER WAY FORWARD', title: ['Built for', 'what’s ahead.'], intro: 'Membuka perspektif baru melalui strategi yang terarah, kolaborasi, dan solusi yang berangkat dari manusia.', bg: '#e7ece4', ink: '#243b2f', accent: '#a5ba87', cta: 'Kenali pendekatan kami', section: 'Good progress starts with a clear perspective.', cards: ['Strategi yang terarah', 'Kolaborasi yang terbuka', 'Solusi yang relevan'], footer: 'Let’s move forward. Together.' },
  folio: { brand: 'FORMA®', overline: 'INDEPENDENT DESIGN PRACTICE', title: ['Make it', 'mean something.'], intro: 'Identitas yang berani. Pengalaman digital yang punya arah. Desain yang memberi bentuk pada sebuah gagasan.', bg: '#ee5b35', ink: '#271d19', accent: '#f2d7b0', cta: 'Lihat eksplorasi desain', section: 'Good design has something to say.', cards: ['Identity / 01', 'Digital / 02', 'Art direction / 03'], footer: 'Got a good feeling? Let’s talk.' },
  terra: { brand: 'terra', overline: 'GROWN SLOW. MADE WITH CARE.', title: ['Good things', 'take root.'], intro: 'Berangkat dari alam. Dibuat dengan perhatian. Temukan cerita tentang keseharian yang lebih dekat dengan hal-hal baik.', bg: '#dedac7', ink: '#384633', accent: '#83966b', cta: 'Kenali dunia terra', section: 'Rooted in nature. Made for your everyday.', cards: ['Dari sumbernya', 'Dibuat perlahan', 'Untuk keseharian'], footer: 'A little closer to what matters.' },
  pulse: { brand: 'pulse.', overline: 'YOUR WORK, IN PERSPECTIVE', title: ['Less noise.', 'More clarity.'], intro: 'Satu ruang untuk melihat gambaran besar, menemukan prioritas, dan menjaga ritme kerja tim Anda.', bg: '#161b30', ink: '#eff1ff', accent: '#a7b3ff', cta: 'Jelajahi ruang kerja', section: 'Everything in view. Everyone in sync.', cards: ['Your priorities', 'Your projects', 'Your team'], footer: 'Find a rhythm that works.' },
};

function Artwork({ id }: { id: ConceptKey }) {
  if (id === 'pulse') return <div className="demo-dashboard"><span className="demo-dashboard-label">Workspace / Overview <span>● This week</span></span><h3>A clear head start.</h3><div className="demo-dashboard-stats">{['In focus', 'In progress', 'Up next'].map((label, i) => <div key={label}><small>{label}</small><strong>{['04', '12', '08'][i]}</strong></div>)}</div><div className="demo-chart"><svg viewBox="0 0 400 120" aria-label="Ilustrasi grafik"><path d="M0 100L60 70L115 82L180 33L245 55L310 15L400 0" fill="none" stroke="currentColor" strokeWidth="3" /></svg></div><p><Check size={14} /> A little more room for good work.</p></div>;
  if (id === 'aura') return <div className="demo-still-life"><div className="demo-arch" /><div className="demo-bottle"><span>aura.<small>DAILY RITUAL<br />CONSIDERED CARE</small></span></div><span className="demo-art-caption">THE EVERYDAY, CONSIDERED.</span></div>;
  if (id === 'folio') return <div className="demo-flower"><span>✳</span><small>FORM FOLLOWS FEELING. / 01</small></div>;
  if (id === 'terra' || id === 'solaris') return <div className={`demo-world ${id === 'terra' ? 'demo-world-organic' : ''}`}><div className="demo-globe">{[0, 1, 2, 3, 4].map(i => <i key={i} style={{ width: `${25 + i * 18}%` }} />)}<span /></div><small>{id === 'terra' ? 'NATURALLY CONNECTED' : 'A WORLD OF POSSIBILITY'} ↗</small></div>;
  return <div className="demo-orb"><div />{[0, 1, 2].map(i => <i key={i} style={{ transform: `translate(-50%, -50%) rotate(${-40 + i * 40}deg)` }} />)}<span>BEYOND THE EXPECTED.</span></div>;
}

export default function ConceptDemo() {
  const key = window.location.pathname.split('/')[2] as ConceptKey;
  const work = WORKS.find(item => item.id === key);
  const theme = THEMES[key];
  useEffect(() => { document.title = theme ? `${work?.name} — Demo konsep / Losta Masta` : 'Konsep tidak ditemukan'; }, [theme, work]);
  if (!theme || !work) return <main className="demo-missing"><h1>Konsep tidak ditemukan.</h1><a href="/portofolio#projects">Kembali ke karya ↗</a></main>;
  const Icon = key === 'terra' ? Leaf : key === 'nextlevel' ? Orbit : key === 'folio' ? Sparkles : Layers;
  return <main className={`concept-demo demo-${key}`} style={{ '--demo-bg': theme.bg, '--demo-ink': theme.ink, '--demo-accent': theme.accent } as CSSProperties}>
    <div className="demo-notice"><a href="/portofolio#projects">← Losta Masta / Portofolio</a><span>STUDI DESAIN · DEMO HOMEPAGE</span></div>
    <nav className="demo-nav" aria-label="Navigasi demo"><a className="demo-brand" href="#demo-top">{theme.brand}</a><div><a href="#demo-story">Tentang</a><a href="#demo-collection">{key === 'aura' ? 'Koleksi' : 'Eksplorasi'}</a><a className="demo-nav-cta" href="#demo-contact">Mari bicara <ArrowUpRight size={15} /></a></div></nav>
    <section className="demo-hero" id="demo-top"><div className="demo-hero-copy"><p className="demo-eyebrow">{theme.overline}</p><h1>{theme.title[0]}<br />{theme.title[1]}</h1><p className="demo-intro">{theme.intro}</p><a className="demo-button" href="#demo-story">{theme.cta}<ArrowUpRight size={17} /></a></div><div className="demo-hero-art" aria-hidden="true"><Artwork id={key} /></div><div className="demo-hero-bottom"><span>{work.category}</span><span>DESIGN STUDY / 2026</span><a href="#demo-story" aria-label="Gulir ke cerita"><ArrowDown size={20} /></a></div></section>
    <section className="demo-story" id="demo-story"><p className="demo-eyebrow">01 / A DIFFERENT PERSPECTIVE</p><div><h2>{theme.section}</h2><p>{work.goal} {work.approach}</p></div></section>
    <section className="demo-collection" id="demo-collection"><div className="demo-collection-heading"><p className="demo-eyebrow">02 / A CLOSER LOOK</p><span>THREE WAYS TO EXPLORE ↘</span></div><div className="demo-cards">{theme.cards.map((name, i) => <article key={name}><div className={`demo-card-art demo-card-art-${i}`}><Icon strokeWidth={.8} /><span>0{i + 1}</span></div><h3>{name}<ArrowUpRight size={20} /></h3><p>{work.features[i]}</p></article>)}</div></section>
    <footer className="demo-footer" id="demo-contact"><p className="demo-eyebrow">LET’S MAKE SOMETHING MEANINGFUL.</p><h2>{theme.footer}</h2><a className="demo-button" href={`/portofolio#projects`}>Kembali ke portofolio <ArrowUpRight size={18} /></a><div className="demo-footer-bottom"><span>{theme.brand}</span><p>Konsep visual oleh Losta Masta. Fitur bisnis tidak diaktifkan.</p><span>DESIGN EXPLORATION / 2026</span></div></footer>
  </main>;
}
