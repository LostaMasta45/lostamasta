import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useMotionValueEvent, useReducedMotion as useSystemReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Code2, MapPin, Mouse, ScanLine } from 'lucide-react';
import { useMotionPreference } from '../losta_masta_spesialis_pembuatan_website';
import { type ProjectItem, whatsappUrl } from './portfolio-data';
import { homepageHeight, homepageImage, WORKS } from './portfolio-work';
import './portfolio-sections.css';

type ExploreProps = { onExplore: (project: ProjectItem) => void };

export function HomepageGallery({ onExplore, limit, collectionHref = '#playground' }: ExploreProps & { limit?: number; collectionHref?: string }) {
  const works = limit === undefined ? WORKS : WORKS.slice(0, limit);
  return <section className="pf-homepages" id="projects" aria-labelledby="homepage-title">
    <div className="pf-chapter"><span>01 / SELECTED WEB DESIGN</span><a href={collectionHref}>Ke galeri interaktif <ArrowDown size={14} aria-hidden="true" /></a></div>
    <div className="pf-homepages-heading"><div><p className="pf-kicker">Portofolio website</p><h2 id="homepage-title">Bukan cuma ide.<br /><em>Begini tampilannya.</em></h2></div><div><p>{limit === undefined ? 'Enam dunia, enam karakter.' : `${works.length} studi desain pilihan.`}<br />Lihat homepagenya. Gulir detailnya.<br />Temukan arah yang cocok untuk Anda.</p><span><Mouse size={14} aria-hidden="true" />Gulir di dalam preview</span></div></div>
    <div className="pf-homepage-grid">{works.map((work, index) => <article className="pf-homepage-card" key={work.id}>
      <div className="pf-browser"><div className="pf-browser-bar"><span className="pf-browser-dots" aria-hidden="true"><i /><i /><i /></span><span>{work.name.toLowerCase()} / homepage</span><a href={work.demoUrl} target="_blank" rel="noopener noreferrer" aria-label={`Buka demo homepage ${work.name} di tab baru`}><ArrowUpRight size={17} aria-hidden="true" /></a></div>
        <div className="pf-homepage-scroll" tabIndex={0} role="region" aria-label={`Screenshot homepage ${work.name}, gulir untuk melihat halaman lengkap`}><img src={homepageImage(work.id)} alt={`Screenshot halaman lengkap ${work.name}, studi desain ${work.category}`} width="1425" height={homepageHeight(work.id)} loading="lazy" decoding="async" /></div>
        <div className="pf-browser-foot"><span><ScanLine size={12} aria-hidden="true" />FULL HOMEPAGE / DESIGN STUDY</span><span>Gulir untuk menjelajahi ↕</span></div>
      </div>
      <div className="pf-homepage-caption"><div><span className="pf-work-index">0{index + 1} / {work.category}</span><h3>{work.name}</h3></div><button type="button" className="pf-work-detail" onClick={() => onExplore(work)} aria-label={`Lihat cerita desain ${work.name}`}><span>Cerita desain</span><ArrowUpRight size={21} aria-hidden="true" /></button></div>
      <p className="pf-homepage-description">{work.summary}</p>
    </article>)}</div>
    <p className="pf-work-note">Screenshot diambil dari demo homepage yang dibuat untuk eksplorasi ini. Seluruh karya berstatus studi desain.</p>
    {limit !== undefined && <div className="hp2-gallery-action"><p>Masih banyak karakter lain untuk dijelajahi.</p><a className="button-outline" href="/portofolio#projects">Lihat semua portofolio <ArrowUpRight size={16} aria-hidden="true" /></a></div>}
  </section>;
}

export function AboutMe({ portraitSrc = '/media/living-portrait/20261031_040619_2f6f349e-a4a7-40db-8e9b-03b6acd8b99a.webp' }: { portraitSrc?: string } = {}) {
  return <section className="pf-about-me" id="about" aria-labelledby="about-me-title">
    <div className="pf-chapter"><span>02 / THE PERSON BEHIND THE PIXELS</span><span>DESIGN × DEVELOPMENT</span></div>
    <div className="pf-about-layout"><div className="pf-about-portrait"><div className="pf-portrait-top"><span><span className="pf-about-dot" />INDEPENDENT BY DESIGN</span><ArrowUpRight size={22} aria-hidden="true" /></div><span className="pf-portrait-word" aria-hidden="true">hello.</span><img src={portraitSrc} alt="Karakter khas Losta Masta, sebagai representasi kreatif studio" width="640" height="640" loading="lazy" decoding="async" /><div className="pf-portrait-bottom"><div>LOSTA MASTA<span>Web designer & developer</span></div><span><MapPin size={13} aria-hidden="true" />Jombang, Indonesia</span></div></div>
      <div className="pf-about-copy"><p className="pf-kicker">About me / Tentang saya</p><h2 id="about-me-title">Di balik layar,<br /><em>ada saya.</em></h2><p className="pf-about-lead">Saya merancang tampilan.<br />Lalu membuatnya benar-benar bekerja.</p><p>Saya bekerja lewat Losta Masta, menghubungkan desain dan pengembangan dalam satu proses. Saya menyukai website yang punya karakter, mudah dipahami, dan nyaman dijelajahi.</p><p>Mulai dari memahami ide Anda, menyusun halaman, sampai merapikan detail interaksi. Tujuannya sederhana: memberi bisnis Anda tempat yang terasa tepat di dunia digital.</p><div className="pf-about-method"><span><b>01</b>Pahami dulu.</span><span><b>02</b>Rancang dengan arah.</span><span><b>03</b>Bangun dengan perhatian.</span></div><a className="pf-about-cta" href={whatsappUrl('berkenalan dan membahas ide website')} target="_blank" rel="noopener noreferrer">Mari kenalan <ArrowUpRight size={18} aria-hidden="true" /></a></div>
    </div>
    <div className="pf-about-signoff"><span><Code2 size={18} aria-hidden="true" />Dari ide pertama sampai detail terakhir.</span><span>DESIGNED WITH FEELING. BUILT WITH CARE.</span></div>
  </section>;
}

export function InteractiveWorkReel({ onExplore }: ExploreProps) {
  const root = useRef<HTMLElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const { reduced } = useMotionPreference();
  const systemReduced = useSystemReducedMotion();
  const [wide, setWide] = useState(false);
  const [travel, setTravel] = useState(0);
  const pinned = wide && !reduced && !systemReduced;
  const { scrollYProgress } = useScroll({ target: root, offset: ['start start', 'end end'] });
  const progress = useMotionValue(0);
  const transform = useTransform(scrollYProgress, value => `translate3d(${-value * travel}px,0,0)`);
  useMotionValueEvent(scrollYProgress, 'change', value => { if (pinned) progress.set(value); });
  useEffect(() => {
    const media = matchMedia('(min-width: 900px) and (min-height: 680px)');
    const update = () => setWide(media.matches);
    update(); media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    const viewport = rail.current, row = track.current;
    if (!viewport || !row) return;
    viewport.scrollLeft = 0;
    const measure = () => setTravel(Math.max(0, row.scrollWidth - viewport.clientWidth));
    const observer = new ResizeObserver(measure);
    observer.observe(viewport); observer.observe(row); measure();
    return () => observer.disconnect();
  }, [pinned]);
  const moveTo = (position: number) => {
    if (!root.current) return;
    const range = root.current.offsetHeight - innerHeight;
    window.scrollTo({ top: root.current.getBoundingClientRect().top + scrollY + range * position, behavior: 'instant' });
  };
  const go = (direction: number, edge?: 'start' | 'end') => {
    if (pinned && root.current) {
      const next = edge ? (edge === 'start' ? 0 : 1) : Math.max(0, Math.min(1, (Math.round(scrollYProgress.get() * (WORKS.length - 1)) + direction) / (WORKS.length - 1)));
      moveTo(next);
    } else if (rail.current) {
      rail.current.scrollTo({ left: edge ? (edge === 'start' ? 0 : rail.current.scrollWidth) : rail.current.scrollLeft + direction * rail.current.clientWidth * .85, behavior: reduced || systemReduced ? 'instant' : 'smooth' });
    }
  };
  return <section className="pf-reel" id="playground" ref={root} data-pinned={pinned} aria-labelledby="reel-title"><div className="pf-reel-stage">
    <div className="pf-chapter"><span>05 / ONE LAST SCROLL</span><a href="#contact">Lewati ke kontak <ArrowDown size={14} aria-hidden="true" /></a></div>
    <div className="pf-reel-heading"><div><p className="pf-kicker">The interactive gallery</p><h2 id="reel-title">Satu scroll lagi.<br /><em>Banyak kemungkinan.</em></h2></div><div><p>{pinned ? 'Gulir ke bawah. Karyanya bergerak ke samping.' : 'Geser ke samping. Pilih yang menarik perhatian.'}</p><div className="pf-reel-controls"><button type="button" onClick={() => go(-1)} aria-label="Karya sebelumnya"><ArrowLeft size={19} aria-hidden="true" /></button><button type="button" onClick={() => go(1)} aria-label="Karya berikutnya"><ArrowRight size={19} aria-hidden="true" /></button></div></div></div>
    <div className="pf-reel-rail" ref={rail} tabIndex={0} role="region" aria-label="Galeri homepage interaktif. Gunakan panah kiri kanan, Home, atau End." onKeyDown={event => {
      if (event.target !== event.currentTarget) return;
      if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) { event.preventDefault(); go(event.key === 'ArrowLeft' ? -1 : 1, event.key === 'Home' ? 'start' : event.key === 'End' ? 'end' : undefined); }
    }} onScroll={event => { if (!pinned) { const el = event.currentTarget; progress.set(el.scrollLeft / Math.max(1, el.scrollWidth - el.clientWidth)); } }}>
      <motion.div className="pf-reel-track" ref={track} style={{ transform: pinned ? transform : 'none' }}>{WORKS.map((work, index) => <article className="pf-reel-card" key={work.id} onFocusCapture={() => { if (pinned && Math.abs(scrollYProgress.get() - index / (WORKS.length - 1)) > .1) moveTo(index / (WORKS.length - 1)); }}>
        <button className="pf-reel-preview" type="button" onClick={() => onExplore(work)} aria-label={`Jelajahi studi desain ${work.name}`}><img src={homepageImage(work.id)} alt={`Screenshot homepage ${work.name}`} width="1425" height={homepageHeight(work.id)} loading="lazy" decoding="async" /><span><ArrowUpRight size={27} aria-hidden="true" /></span></button>
        <div className="pf-reel-caption"><div><span>0{index + 1} / {work.category}</span><h3>{work.name}</h3></div><a href={work.demoUrl} target="_blank" rel="noopener noreferrer">Buka demo <ArrowUpRight size={16} aria-hidden="true" /></a></div>
      </article>)}</motion.div>
    </div>
    <div className="pf-reel-bottom"><span>6 DESIGN STUDIES / LOSTA MASTA</span><div className="pf-reel-progress" aria-hidden="true"><motion.div style={{ scaleX: progress }} /></div><span>{pinned ? 'SCROLL TO EXPLORE ↓' : 'SWIPE TO EXPLORE ↔'}</span></div>
  </div></section>;
}
