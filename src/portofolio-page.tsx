import { useEffect, useRef, useState, type CSSProperties, type RefObject } from 'react';
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, Code2, Layers, MessageCircle, Monitor, Pause, Play, Plus, Smartphone } from 'lucide-react';
import App, { FadeIn, ProcessSection, ServicesSection, useMotionPreference } from '../losta_masta_spesialis_pembuatan_website';
import { LivingHero } from './baru-page';
import { ConceptPreview } from './concept-preview';
import { CONTACT, FAQS, whatsappUrl, type ProjectItem } from './portfolio-data';
import { WORKS, homepageHeight, homepageImage } from './portfolio-work';
import { AboutMe, HomepageGallery, InteractiveWorkReel } from './portfolio-sections';
import './portofolio.css';

const EASE = [0.23, 1, 0.32, 1] as const;
const COLORS = ['#b8c5a5', '#aa94d7', '#cfb89b', '#91a7ce', '#ec805d', '#a1ae87'];

/** Runs only while the scene is visible, the document is active, and motion is enabled. */
function useVisibleScene(ref: RefObject<HTMLElement | null>, paused: boolean, render: (time: number) => void) {
  const callback = useRef(render);
  callback.current = render;
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    element.dataset.sceneActive = 'false';
    if (paused) return;
    let frame = 0, visible = false;
    const tick = (time: number) => { callback.current(time); frame = requestAnimationFrame(tick); };
    const update = () => {
      cancelAnimationFrame(frame);
      element.dataset.sceneActive = String(visible && !document.hidden);
      if (visible && !document.hidden) frame = requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    observer.observe(element);
    document.addEventListener('visibilitychange', update);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); document.removeEventListener('visibilitychange', update); };
  }, [ref, paused]);
}

function Book({ project, index, cursor, selected, onSelect, onExplore }: {
  project: ProjectItem; index: number; cursor: MotionValue<number>; selected: boolean;
  onSelect: () => void; onExplore: () => void;
}) {
  const { reduced } = useMotionPreference();
  const target = useTransform(cursor, value => reduced ? 0 : -72 * Math.exp(-Math.pow(value - index, 2) / 1.3));
  const lift = useSpring(target, { mass: 1, stiffness: 100, damping: 10 });
  const transform = useTransform(lift, value => `translate3d(0,${reduced ? 0 : value}px,${reduced ? 0 : -value * .35}px)`);
  return <motion.div className="pf-book-lift" style={{ transform }}>
    <button type="button" className="pf-book" data-selected={selected} data-work={project.id}
      aria-pressed={selected} aria-label={`Pilih konsep ${project.name}`}
      style={{ '--book-color': COLORS[index] } as CSSProperties}
      onClick={onSelect} onDoubleClick={onExplore}
      onFocus={() => cursor.set(index)}
      onKeyDown={event => {
        const buttons = [...event.currentTarget.closest('.pf-shelf')!.querySelectorAll<HTMLButtonElement>('.pf-book')];
        const next = event.key === 'ArrowRight' ? Math.min(index + 1, buttons.length - 1)
          : event.key === 'ArrowLeft' ? Math.max(index - 1, 0)
          : event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1 : -1;
        if (next >= 0) { event.preventDefault(); buttons[next].focus({ preventScroll: true }); buttons[next].scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'instant' }); }
      }}>
      <span className="pf-book-spine" aria-hidden="true"><span>{project.name}</span><span>LM / 0{index + 1}</span></span>
      <span className="pf-book-front">
        <span className="pf-book-edition">LOSTA MASTA <span>VOL. 0{index + 1}</span></span>
        <span className="pf-book-name">{project.name}<ArrowUpRight size={18} aria-hidden="true" /></span>
      <span className="pf-book-art" aria-hidden="true"><img src={homepageImage(project.id)} alt="" width="1425" height={homepageHeight(project.id)} loading="lazy" decoding="async" /></span>
        <span className="pf-book-category">{project.category}</span>
        <span className="pf-book-bottom"><span>DESIGN STUDY</span><span>↗</span></span>
      </span>
      <span className="pf-book-pages" aria-hidden="true" />
    </button>
  </motion.div>;
}

export function BookGallery({ onExplore }: { onExplore: (project: ProjectItem) => void }) {
  const root = useRef<HTMLElement>(null);
  const shelf = useRef<HTMLDivElement>(null);
  const interacting = useRef(false);
  const cursor = useMotionValue(-3);
  const [selected, setSelected] = useState(1);
  const { reduced } = useMotionPreference();
  const project = WORKS[selected];
  useVisibleScene(root, reduced, time => {
    if (!interacting.current && !root.current?.contains(document.activeElement)) cursor.set((time / 2100) % (WORKS.length + 6) - 3);
  });
  useEffect(() => { if (reduced) cursor.set(-30); }, [reduced, cursor]);
  const moveShelf = (direction: number) => shelf.current?.scrollBy({ left: direction * shelf.current.clientWidth * .65, behavior: reduced ? 'instant' : 'smooth' });
  return <section className="pf-collection" id="collection" ref={root} aria-labelledby="collection-title">
    <div className="pf-section-line"><span>THE COLLECTION INDEX</span><a href="#projects">Lihat semua homepage <ArrowUpRight size={13} aria-hidden="true" /></a></div>
    <div className="pf-collection-heading"><div><p className="eyebrow">Bukan sekadar halaman.</p><h2 id="collection-title">Karya yang<br /><em>punya cerita.</em></h2></div>
      <p>Enam studi desain. Ambil satu dari rak,<br />lalu lihat dunia di baliknya.<ArrowDown size={18} aria-hidden="true" /></p></div>
    <div className="pf-shelf-viewport" ref={shelf} aria-label="Rak konsep website, geser untuk menjelajahi"
      onPointerMove={event => {
        if (reduced || event.pointerType !== 'mouse') return;
        const row = shelf.current?.querySelector('.pf-shelf');
        if (!row) return;
        interacting.current = true;
        const rect = row.getBoundingClientRect();
        cursor.set(Math.max(-1, Math.min(WORKS.length, (event.clientX - rect.left) / rect.width * WORKS.length - .5)));
      }} onPointerLeave={() => { interacting.current = false; cursor.set(-3); }}>
      <div className="pf-shelf" role="group" aria-label="Pilih studi desain">
        {WORKS.map((work, index) => <Book key={work.id} project={work} index={index} cursor={cursor} selected={selected === index}
          onSelect={() => setSelected(index)} onExplore={() => onExplore(work)} />)}
      </div>
    </div>
    <div className="pf-shelf-caption"><span><span className="pf-live-dot" />{reduced ? 'Pilih karya untuk melihat cerita' : 'Gerakkan kursor · geser di mobile · pilih untuk menjelajah'}</span><div><button className="pf-round" type="button" onClick={() => moveShelf(-1)} aria-label="Geser rak ke kiri"><ArrowLeft size={18} /></button><button className="pf-round" type="button" onClick={() => moveShelf(1)} aria-label="Geser rak ke kanan"><ArrowRight size={18} /></button></div></div>
    <div className="pf-work-picker" role="group" aria-label="Pilih konsep tanpa menggeser rak">{WORKS.map((work, index) => <button type="button" key={work.id} aria-pressed={selected === index} onClick={() => setSelected(index)}>{work.name}</button>)}</div>
    <div className="pf-spotlight" aria-live="polite" aria-atomic="true">
      <motion.div key={project.id} className="pf-spotlight-inner"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduced ? .16 : .2 }}>
        <button type="button" className="pf-spotlight-preview" onClick={() => onExplore(project)} aria-label={`Buka studi desain ${project.name}`}><img src={homepageImage(project.id)} alt={`Screenshot homepage ${project.name}`} width="1425" height={homepageHeight(project.id)} loading="lazy" decoding="async" /><span className="pf-preview-open"><ArrowUpRight size={22} aria-hidden="true" /></span></button>
        <div className="pf-spotlight-story"><span className="eyebrow">CONCEPT PROJECT / {project.category}</span><h3>{project.name}<span>®</span></h3><p>{project.summary}</p><div className="pf-tags">{project.features.map(feature => <span key={feature}>{feature}</span>)}</div><button className="button-outline" type="button" onClick={() => onExplore(project)}>Jelajahi konsep <ArrowUpRight size={17} aria-hidden="true" /></button></div>
      </motion.div>
    </div>
    <p className="pf-disclaimer">Koleksi ini adalah studi desain, bukan proyek klien atau layanan yang sudah beroperasi.</p>
  </section>;
}

function Halftone({ container }: { container: RefObject<HTMLElement | null> }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const size = useRef({ width: 0, height: 0 });
  const pointer = useRef({ x: -1000, y: -1000 });
  const lastFrame = useRef(0);
  const { reduced } = useMotionPreference();
  const draw = (time: number) => {
    const ctx = canvas.current?.getContext('2d');
    if (!ctx) return;
    const { width, height } = size.current;
    ctx.clearRect(0, 0, width, height);
    const step = width < 600 ? 25 : 31;
    for (let y = 10; y < height; y += step) for (let x = 10; x < width; x += step) {
      const near = Math.max(0, 1 - Math.hypot(pointer.current.x - x, pointer.current.y - y) / 170);
      const wave = reduced ? .4 : (Math.sin(time / 950 + x / 90 + y / 150) + 1) / 2;
      const fade = Math.min(1, y / 160) * Math.min(1, (height - y) / 180);
      const radius = 1 + wave * 1.4 + (reduced ? 0 : near * 3.4);
      ctx.fillStyle = `rgba(174,126,216,${(.13 + wave * .24 + near * .24) * fade})`;
      ctx.beginPath(); ctx.arc(x, y, radius, 0, Math.PI * 2); ctx.fill();
    }
  };
  useVisibleScene(container, reduced, time => { if (time - lastFrame.current > 42) { draw(time); lastFrame.current = time; } });
  useEffect(() => {
    const root = container.current, element = canvas.current;
    if (!root || !element) return;
    const resize = new ResizeObserver(() => {
      const width = root.clientWidth, height = root.clientHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      element.width = Math.round(width * ratio); element.height = Math.round(height * ratio);
      element.getContext('2d')?.setTransform(ratio, 0, 0, ratio, 0, 0);
      size.current = { width, height }; draw(0);
    });
    resize.observe(root);
    const move = (event: PointerEvent) => { const rect = root.getBoundingClientRect(); pointer.current = { x: event.clientX - rect.left, y: event.clientY - rect.top }; };
    const reset = () => { pointer.current = { x: -1000, y: -1000 }; };
    root.addEventListener('pointermove', move); root.addEventListener('pointerleave', reset);
    return () => { resize.disconnect(); root.removeEventListener('pointermove', move); root.removeEventListener('pointerleave', reset); };
  }, [container, reduced]);
  return <canvas ref={canvas} className="pf-halftone" aria-hidden="true" />;
}

export function PortfolioFAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const { reduced } = useMotionPreference();
  return <section className="pf-faq" aria-labelledby="pf-faq-title" id="faq">
    <div className="pf-section-line"><span>06 / A LITTLE CLARITY</span><span>BEFORE WE SAY HELLO.</span></div>
    <FadeIn className="pf-faq-heading"><span className="pf-pill">Senang kalau Anda bertanya.</span><h2 id="pf-faq-title">Hal kecil.<br /><em>Biar jelas.</em></h2><p>Beberapa jawaban sebelum kita mulai membuat sesuatu.</p></FadeIn>
    <div className="pf-faq-list">{FAQS.map((item, index) => <div className="pf-faq-item" data-open={open === index} key={item.question}>
      <h3><button type="button" aria-expanded={open === index} aria-controls={`pf-answer-${index}`} id={`pf-question-${index}`} onClick={() => setOpen(open === index ? null : index)}><span className="pf-faq-number">0{index + 1}</span><span>{item.question}</span><Plus size={20} aria-hidden="true" /></button></h3>
      <motion.div className="pf-faq-answer" id={`pf-answer-${index}`} role="region" aria-labelledby={`pf-question-${index}`} aria-hidden={open !== index}
        initial={false} animate={{ height: open === index ? 'auto' : 0, opacity: open === index ? 1 : 0 }} transition={{ duration: reduced ? .16 : .2, ease: EASE }}><p>{item.answer}</p></motion.div>
    </div>)}</div>
    <p className="pf-faq-after">Ada pertanyaan lain? <a href={whatsappUrl('bertanya tentang pembuatan website')} target="_blank" rel="noopener noreferrer">Tanyakan langsung <ArrowUpRight size={13} aria-hidden="true" /></a></p>
  </section>;
}

export function EditorScene() {
  const root = useRef<HTMLDivElement>(null);
  const { reduced } = useMotionPreference();
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { mass: 1, stiffness: 100, damping: 10 });
  const sy = useSpring(y, { mass: 1, stiffness: 100, damping: 10 });
  const transform = useTransform([sx, sy], values => `perspective(1100px) rotateX(${reduced ? 8 : 8 - Number(values[1]) * 5}deg) rotateY(${reduced ? -16 : -16 + Number(values[0]) * 8}deg) rotateZ(-4deg)`);
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    let visible = false;
    const update = () => { element.dataset.sceneActive = String(visible && !document.hidden && !reduced); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    observer.observe(element); document.addEventListener('visibilitychange', update); update();
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', update); };
  }, [reduced]);
  return <div className="pf-editor-stage" ref={root}
    onPointerMove={event => { if (reduced || event.pointerType !== 'mouse') return; const r = event.currentTarget.getBoundingClientRect(); x.set((event.clientX - r.left) / r.width - .5); y.set((event.clientY - r.top) / r.height - .5); }}
    onPointerLeave={() => { x.set(0); y.set(0); }}>
    <div className="pf-editor-orbit" aria-hidden="true" />
    <motion.div className="pf-editor" style={{ transform }}>
      <div className="pf-editor-bar"><span className="pf-window-dots" aria-hidden="true"><i /><i /><i /></span><span>losta masta / studio</span><div role="group" aria-label="Ukuran preview editor"><button type="button" aria-label="Preview desktop" aria-pressed={!mobile} onClick={() => setMobile(false)}><Monitor size={14} /></button><button type="button" aria-label="Preview mobile" aria-pressed={mobile} onClick={() => setMobile(true)}><Smartphone size={14} /></button></div></div>
      <div className="pf-editor-layout"><aside aria-hidden="true"><Layers size={16} /><span /><span /><span /><Code2 size={16} /><span /></aside><div className="pf-editor-screen" data-mobile={mobile}><div className="pf-editor-preview"><ConceptPreview concept="nextlevel" mobile={mobile} /></div></div></div>
      <div className="pf-editor-status"><span><Check size={12} aria-hidden="true" />Design with intention.</span><span>Made to feel right. ↗</span></div>
    </motion.div>
    <span className="pf-editor-float pf-editor-label"><span className="pf-live-dot" />Dari ide, jadi pengalaman.</span>
    <span className="pf-editor-float pf-editor-code" aria-hidden="true">&lt;/&gt;</span>
  </div>;
}

export function PortfolioFooter() {
  const { reduced, toggle } = useMotionPreference();
  return <footer className="pf-footer" id="contact">
    <div className="pf-section-line"><span>07 / YOUR NEXT CHAPTER</span><a href="#top">Kembali ke atas <ArrowUpRight size={13} aria-hidden="true" /></a></div>
    <div className="pf-footer-cta"><FadeIn className="pf-footer-copy"><span className="pf-pill"><span className="pf-live-dot" />Mulai dari satu ide.</span><h2>Ide Anda.<br /><em>Panggung baru.</em></h2><p>Website berikutnya bisa jadi milik Anda.<br />Ceritakan yang ada di kepala. Kita mulai dari sana.</p><a className="pf-glass-cta contact-btn" href={whatsappUrl('membahas website setelah melihat portofolio Losta Masta')} target="_blank" rel="noopener noreferrer"><MessageCircle size={19} aria-hidden="true" /><span>Mari buat sesuatu.</span><ArrowUpRight size={19} aria-hidden="true" /></a><a className="pf-footer-phone" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">{CONTACT.display} <ArrowUpRight size={13} aria-hidden="true" /></a></FadeIn><EditorScene /></div>
    <div className="pf-footer-links"><div><a className="pf-footer-logo" href="#top">LOSTA MASTA<span>Independent web design & development.</span></a><p>Dibuat dengan perhatian.<br />Dari Jombang, untuk ide Anda.</p></div><div><span>JELAJAHI</span><a href="#projects">Koleksi karya</a><a href="#about">Tentang studio</a><a href="#services">Layanan</a></div><div><span>MULAI DI SINI</span><a href="#process">Cara kerja</a><a href="#faq">Pertanyaan umum</a><a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">WhatsApp <ArrowUpRight size={12} aria-hidden="true" /></a></div><div><span>SEDIKIT KONTROL</span><button type="button" className="pf-footer-motion" onClick={toggle} aria-pressed={!reduced}>{reduced ? <Play size={13} /> : <Pause size={13} />}{reduced ? 'Aktifkan animasi' : 'Jeda animasi'}</button><a href="/">Ke beranda <ArrowUpRight size={12} aria-hidden="true" /></a></div></div>
    <div className="pf-footer-baseline"><span>© {new Date().getFullYear()} Losta Masta</span><span>DESIGN / DEVELOPMENT / A LITTLE PERSONALITY</span><span>JOMBANG, ID</span></div>
    <div className="pf-footer-wordmark" aria-hidden="true">LOSTA MASTA</div>
  </footer>;
}

function Closing() {
  const root = useRef<HTMLDivElement>(null);
  return <div className="pf-closing" ref={root}><Halftone container={root} /><PortfolioFAQ /><PortfolioFooter /></div>;
}

export default function PortfolioPage() {
  return <div className="portfolio-page"><App hero={<LivingHero portfolio />}
    content={onExplore => <><HomepageGallery onExplore={onExplore} /><BookGallery onExplore={onExplore} /><AboutMe /><ServicesSection /><ProcessSection /><InteractiveWorkReel onExplore={onExplore} /><Closing /></>}
    footer={<></>} /></div>;
}
