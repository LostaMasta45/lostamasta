import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { createContext, useContext, useLayoutEffect } from 'react';
import { ArrowDown, ArrowUpRight, Check, ChevronDown, Globe, Layers, MessageCircle, Monitor, Smartphone, X } from 'lucide-react';
import { LocalImage } from './src/media';
import { ConceptPreview } from './src/concept-preview';
import { CONTACT, EXPLORATIONS, FAQS, PROCESS, PROJECTS, SERVICES, whatsappUrl, type ProjectItem } from './src/portfolio-data';

const EASE_OUT = [0.23, 1, 0.32, 1] as const;
const HERO_IMAGE = 'https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png';
const DECORATION_BASE = 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/';
const DECORATIONS = ['moon_icon.11395d36.png', 'p59_1.4659672e.png', 'lego_icon-1.703bb594.png', 'Group_134-1.2e04f3ce.png'];
const MOTION_STORAGE_KEY = 'losta-masta-motion';
const MotionPreferenceContext = createContext({ reduced: false, toggle: () => {} });

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, [query]);
  return matches;
}

export function useReducedMotion() {
  return useContext(MotionPreferenceContext).reduced;
}

export function useMotionPreference() {
  return useContext(MotionPreferenceContext);
}

function AutoplayMotion({ children, className }: { children: ReactNode; className: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    const element = ref.current;
    if (!element || reduce) return;
    let visible = true;
    const update = () => { element.style.animationPlayState = visible && !document.hidden ? 'running' : 'paused'; };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    observer.observe(element);
    document.addEventListener('visibilitychange', update);
    update();
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', update); };
  }, [reduce]);
  return <div ref={ref} className={className}>{children}</div>;
}

export function FadeIn({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return <motion.div className={className}
    initial={{ opacity: reduce ? 1 : 0, transform: reduce ? 'none' : 'translateY(16px)' }}
    whileInView={{ opacity: 1, transform: reduce ? 'none' : 'translateY(0px)' }}
    viewport={{ once: true, amount: 0.08 }}
    transition={{ duration: reduce ? 0.16 : 0.28, delay: reduce ? 0 : delay, ease: EASE_OUT }}>
    {children}
  </motion.div>;
}

function ContactLink({ children = 'Diskusi via WhatsApp', context, className = '', secondary = false }: {
  children?: ReactNode; context?: string; className?: string; secondary?: boolean;
}) {
  return <a className={`${secondary ? 'button-outline' : 'button-primary'} ${className}`}
    href={whatsappUrl(context)} target="_blank" rel="noopener noreferrer">
    <span>{children}</span><ArrowUpRight size={18} aria-hidden="true" />
  </a>;
}

function SectionHeading({ eyebrow, title, description, light = false }: {
  eyebrow: string; title: string; description?: string; light?: boolean;
}) {
  return <FadeIn className={`section-heading ${light ? 'on-light' : ''}`}>
    <p className="eyebrow">{eyebrow}</p>
    <h2 className={light ? '' : 'metal-text'}>{title}</h2>
    {description && <p className="section-description">{description}</p>}
  </FadeIn>;
}

function Magnet({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    const pointer = matchMedia('(hover: hover) and (pointer: fine)');
    let frame = 0;
    const reset = () => {
      cancelAnimationFrame(frame);
      if (ref.current) ref.current.style.transform = 'translate3d(0,0,0)';
    };
    if (reduce) { reset(); return; }
    const move = (event: PointerEvent) => {
      if (!pointer.matches || event.pointerType !== 'mouse') return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!ref.current) return;
        const box = ref.current.getBoundingClientRect();
        const dx = event.clientX - box.left - box.width / 2;
        const dy = event.clientY - box.top - box.height / 2;
        const near = Math.abs(dx) < box.width / 2 + 100 && Math.abs(dy) < box.height / 2 + 100;
        ref.current.style.transform = near ? `translate3d(${Math.max(-14, Math.min(14, dx / 15))}px,${Math.max(-10, Math.min(10, dy / 20))}px,0)` : 'translate3d(0,0,0)';
      });
    };
    window.addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('pointerleave', reset);
    pointer.addEventListener('change', reset);
    return () => {
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', reset);
      pointer.removeEventListener('change', reset);
      reset();
    };
  }, [reduce]);
  return <div className="magnet" ref={ref}>{children}</div>;
}

function HeroSection({ portrait }: { portrait?: ReactNode } = {}) {
  const { reduced, toggle } = useContext(MotionPreferenceContext);
  return <header className="hero" id="top">
    <div className="hero-top">
      <nav className="main-nav" aria-label="Navigasi utama">
        <a href="#projects">Karya</a><a href="#about">Tentang</a><a href="#services">Layanan</a>
        <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">Kontak <ArrowUpRight size={14} aria-hidden="true" /></a>
      </nav>
      <h1 className="hero-wordmark metal-text">LOSTA MASTA</h1>
    </div>
    <div className="hero-portrait">
      {portrait ?? <Magnet>
        <div className="hero-badge"><span aria-hidden="true" />Web Design & Development</div>
        <AutoplayMotion className="hero-float">
          <LocalImage src={HERO_IMAGE} alt="Karakter visual Losta Masta" loading="eager" fetchPriority="high"
            sizes="(min-width: 1024px) 500px, (min-width: 768px) 420px, (min-width: 640px) 340px, 220px" />
        </AutoplayMotion>
      </Magnet>}
    </div>
    <div className="hero-bottom">
      <div className="hero-intro"><p className="eyebrow">Desain berkarakter. Interaksi terarah.</p>
        <p>Website dengan karakter kuat, interaksi yang terasa, dan pengalaman yang nyaman di setiap layar.</p>
      </div>
      <div className="hero-actions"><ContactLink>Diskusikan Website Anda</ContactLink>
        <div className="hero-secondary-actions">
          <a className="text-link" href="#projects">Jelajahi karya <ArrowDown size={16} aria-hidden="true" /></a>
          <button className="text-link motion-toggle" type="button" onClick={toggle} aria-pressed={!reduced}>
            {reduced ? 'Aktifkan animasi' : 'Jeda animasi'}
          </button>
        </div>
      </div>
    </div>
  </header>;
}

function GalleryRow({ items, progress, reverse, compact }: {
  items: typeof EXPLORATIONS; progress: MotionValue<number>; reverse?: boolean; compact: boolean;
}) {
  const reduce = useReducedMotion();
  const travel = compact ? 80 : 200;
  const x = useTransform(progress, [0, 1], reverse ? [travel, -travel] : [-travel, travel]);
  const transform = useTransform(x, value => `translate3d(${value}px,0,0)`);
  return <div className="gallery-window" tabIndex={0} role="region" aria-label="Galeri konsep, geser horizontal untuk menjelajahi">
    <motion.div className="gallery-row" style={{ transform: reduce ? 'none' : transform }}>
      <AutoplayMotion className={`gallery-idle${reverse ? ' gallery-idle-reverse' : ''}`}>
      {items.map(item => <figure className="gallery-item" key={item.id}>
        <ConceptPreview concept={item.id} />
        <figcaption><span>{item.title}</span><span>{item.category}</span></figcaption>
      </figure>)}
      </AutoplayMotion>
    </motion.div>
  </div>;
}

function MarqueeSection({ compact }: { compact: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  return <section className="gallery-section" ref={ref} aria-labelledby="gallery-title">
    <div className="gallery-heading page-padding">
      <div><p className="eyebrow"><Globe size={14} aria-hidden="true" />Visual exploration / 01—06</p><h2 id="gallery-title">Satu pendekatan. Banyak kemungkinan.</h2></div>
      <p>6 eksplorasi konsep<br /><span>Geser untuk menjelajahi ↔</span></p>
    </div>
    <GalleryRow items={EXPLORATIONS.slice(0, 3)} progress={scrollYProgress} compact={compact} />
    <GalleryRow items={EXPLORATIONS.slice(3)} progress={scrollYProgress} compact={compact} reverse />
    <p className="gallery-note page-padding">Ilustrasi konsep desain oleh Losta Masta — bukan website klien yang telah dirilis.</p>
  </section>;
}

function ProjectCard({ project, index, progress, compact, onSelect }: {
  project: ProjectItem; index: number; progress: MotionValue<number>; compact: boolean; onSelect: (project: ProjectItem) => void;
}) {
  const reduce = useReducedMotion();
  const slotRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLElement>(null);
  // Sticky is enabled only when the entire card fits the usable viewport.
  useEffect(() => {
    const slot = slotRef.current;
    const card = cardRef.current;
    if (!slot || !card) return;
    const update = () => {
      const offset = compact ? 16 : 32;
      const fits = !reduce && card.offsetHeight + offset * 2 <= window.innerHeight;
      slot.dataset.stack = fits ? 'true' : 'false';
    };
    const observer = new ResizeObserver(update);
    observer.observe(card);
    window.addEventListener('resize', update, { passive: true });
    update();
    return () => { observer.disconnect(); window.removeEventListener('resize', update); };
  }, [compact, reduce]);
  const target = 1 - (PROJECTS.length - 1 - index) * (compact ? 0.01 : 0.03);
  const scale = useTransform(progress, [index / PROJECTS.length, 1], [1, target]);
  const transform = useTransform(scale, value => `scale(${value})`);
  return <div className="project-slot" ref={slotRef}>
    <motion.article className="project-card" ref={cardRef}
      style={{ transform: reduce ? 'none' : transform }} aria-labelledby={`project-${project.id}`}>
      <div className="project-top">
        <span className="project-number">{project.number}</span>
        <div className="project-title"><p className="eyebrow">{project.category}</p><h3 id={`project-${project.id}`}>{project.name}</h3></div>
        <span className="concept-badge">{project.status}</span>
      </div>
      <p className="project-summary">{project.summary}</p>
      <button type="button" className="project-preview-button" onClick={() => onSelect(project)} aria-label={`Lihat studi kasus konsep ${project.name}`}>
        <div className="desktop-preview"><ConceptPreview concept={project.id} /></div>
        <div className="phone-preview"><ConceptPreview concept={project.id} mobile /></div>
        <span className="preview-caption"><Monitor size={13} aria-hidden="true" />Desktop <span>+</span><Smartphone size={13} aria-hidden="true" />Mobile</span>
        <span className="preview-open" aria-hidden="true"><ArrowUpRight size={22} /></span>
      </button>
      <div className="project-bottom"><ul className="feature-list">{project.features.map(feature => <li key={feature}>{feature}</li>)}</ul>
        <button className="button-outline" type="button" onClick={() => onSelect(project)}>Lihat Studi Kasus <ArrowUpRight size={17} aria-hidden="true" /></button>
      </div>
    </motion.article>
  </div>;
}

function ProjectsSection({ compact, onSelect }: { compact: boolean; onSelect: (project: ProjectItem) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  return <section className="projects-section section-space page-padding" id="projects">
    <SectionHeading eyebrow="Selected concepts / 01—03" title="Karya Pilihan" description="Tiga eksplorasi. Tiga karakter. Satu perhatian pada detail." />
    <div className="project-stack" ref={ref}>{PROJECTS.map((project, index) => <ProjectCard key={project.id} project={project} index={index} progress={scrollYProgress} compact={compact} onSelect={onSelect} />)}</div>
    <p className="project-disclaimer">Seluruh proyek di atas merupakan studi desain. Preview adalah ilustrasi konsep, bukan demo layanan yang sudah beroperasi.</p>
  </section>;
}

function AnimatedChar({ char, progress, range }: { char: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.25, 1]);
  return <motion.span style={{ opacity }}>{char}</motion.span>;
}

export function AnimatedText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.35'] });
  let position = 0;
  return <p ref={ref} className="animated-copy">
    {reduce ? text : <><span className="sr-only">{text}</span><span aria-hidden="true">{text.split(' ').map((word, index) => {
      const start = position;
      position += word.length + 1;
      return <span className="animated-word" key={index}>{Array.from(word).map((char, i) => <AnimatedChar key={i} char={char} progress={scrollYProgress} range={[(start + i) / text.length, Math.min(1, (start + i + 1) / text.length)]} />)}{'\u00A0'}</span>;
    })}</span></>}
  </p>;
}

function AboutSection() {
  return <section className="about-section section-space page-padding" id="about">
    <div className="about-decorations" aria-hidden="true">{DECORATIONS.map((file, index) => <LocalImage src={`${DECORATION_BASE}${file}`} alt="" className={`decoration decoration-${index}`} key={file} />)}</div>
    <div className="about-content"><SectionHeading eyebrow="Di balik layar" title="Tentang Saya" />
      <AnimatedText text="Saya membantu bisnis menerjemahkan kebutuhan menjadi website yang jelas, berkarakter, dan nyaman digunakan. Dari perancangan tampilan hingga pengembangan, setiap detail punya tujuan." />
      <FadeIn><ul className="principles"><li><Layers size={16} aria-hidden="true" />Desain terarah</li><li><Smartphone size={16} aria-hidden="true" />Responsif</li><li><Globe size={16} aria-hidden="true" />Interaksi bermakna</li></ul></FadeIn>
      <ContactLink secondary>Mari Kenalan</ContactLink>
    </div>
  </section>;
}

export function ServicesSection() {
  return <section className="services-section section-space page-padding" id="services">
    <SectionHeading eyebrow="Dibentuk mengikuti kebutuhan Anda" title="Layanan Web" light />
    <div className="service-list">{SERVICES.map((service, index) => <FadeIn key={service.name}>
      <article className="service-row"><span className="service-number">0{index + 1}</span><div className="service-content">
        <h3>{service.name}</h3><p>{service.description}</p><ul className="deliverables">{service.deliverables.map(item => <li key={item}><Check size={12} aria-hidden="true" />{item}</li>)}</ul>
        <ContactLink secondary context={`dengan layanan ${service.name}`} className="service-contact">Bahas Kebutuhan Ini</ContactLink>
      </div></article>
    </FadeIn>)}</div>
  </section>;
}

export function ProcessSection() {
  return <section className="process-section section-space page-padding" id="process">
    <SectionHeading eyebrow="Dari percakapan menjadi pengalaman" title="Cara Kerja" description="Alur yang jelas, dengan ruang untuk berdiskusi di setiap tahap." />
    <ol className="process-list">{PROCESS.map((step, index) => <li key={step.title}><FadeIn delay={index * 0.04} className="process-row"><span className="process-number">0{index + 1}</span><h3>{step.title}</h3><p>{step.description}</p><ArrowUpRight size={22} aria-hidden="true" /></FadeIn></li>)}</ol>
  </section>;
}

function FAQSection() {
  return <section className="faq-section section-space page-padding" aria-labelledby="faq-title">
    <div className="faq-intro"><p className="eyebrow">Sebelum kita mulai</p><h2 id="faq-title" className="metal-text">Ada<br />pertanyaan?</h2><p>Beberapa hal yang sering menjadi awal percakapan.</p><ContactLink secondary>Tanyakan Langsung</ContactLink></div>
    <div className="faq-list">{FAQS.map(item => <details className="faq-item" key={item.question}><summary>{item.question}<ChevronDown size={20} aria-hidden="true" /></summary><p>{item.answer}</p></details>)}</div>
  </section>;
}

function ContactSection({ extra }: { extra?: ReactNode } = {}) {
  return <footer className="contact-section page-padding" id="contact">
    <FadeIn className="contact-content"><p className="eyebrow">Let’s make something worth exploring</p><h2 className="metal-text">Website berikutnya<br />bisa jadi milik Anda.</h2>
      <p>Ceritakan bisnis dan kebutuhan Anda.<br />Kita mulai dari percakapan singkat.</p><ContactLink><MessageCircle size={17} aria-hidden="true" />Diskusi via WhatsApp</ContactLink>
      <a className="contact-number" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">{CONTACT.display} <ArrowUpRight size={14} aria-hidden="true" /></a>
    </FadeIn>
    {extra}
    <div className="footer-bottom"><a href="#top" className="footer-brand">LOSTA MASTA<span>Web Design & Development</span></a><span>© {new Date().getFullYear()} Losta Masta</span><a className="text-link" href="#top">Kembali ke atas <ArrowUpRight size={15} aria-hidden="true" /></a></div>
  </footer>;
}

function ProjectModal({ project, onClose }: { project: ProjectItem; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previewRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [mobilePreview, setMobilePreview] = useState(false);
  const [closing, setClosing] = useState(false);
  const reduce = useReducedMotion();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const backdropStart = useRef(false);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const oldOverflow = document.body.style.overflow;
    const oldPadding = document.body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    const padding = parseFloat(getComputedStyle(document.body).paddingRight) || 0;
    if (scrollbar) document.body.style.paddingRight = `${padding + scrollbar}px`;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      if (timer.current) clearTimeout(timer.current);
      dialog.close();
      document.body.style.overflow = oldOverflow;
      document.body.style.paddingRight = oldPadding;
      if (opener?.isConnected) opener.focus({ preventScroll: true });
    };
  }, []);
  const dismiss = () => {
    if (closing) return;
    setClosing(true);
    timer.current = setTimeout(onClose, reduce ? 160 : 240);
  };
  const selectPreview = (index: number) => {
    setMobilePreview(index === 1);
    previewRefs.current[index]?.focus();
  };
  return <dialog className="project-dialog" ref={dialogRef} data-closing={closing || undefined}
    aria-labelledby="case-title" aria-describedby="case-description"
    onCancel={event => { event.preventDefault(); dismiss(); }}
    onPointerDown={event => { backdropStart.current = event.target === event.currentTarget; }}
    onClick={event => { if (backdropStart.current && event.target === event.currentTarget) dismiss(); backdropStart.current = false; }}>
    <motion.div className="dialog-surface" initial={{ opacity: 0, transform: reduce ? 'none' : 'translateY(16px)' }}
      animate={{ opacity: closing ? 0 : 1, transform: reduce ? 'none' : closing ? 'translateY(16px)' : 'translateY(0px)' }}
      transition={{ duration: reduce ? 0.16 : 0.24, ease: EASE_OUT }}>
      <div className="dialog-top"><span className="eyebrow">Design study / {project.number}</span><button type="button" className="icon-button" onClick={dismiss} ref={closeRef} aria-label="Tutup studi kasus"><X size={22} /></button></div>
      <div className="case-heading"><div><p className="eyebrow">{project.category}</p><h2 id="case-title">{project.name}</h2></div><span className="concept-badge">{project.status}</span></div>
      <p className="case-description" id="case-description">{project.summary}</p>
      <div className="preview-toolbar"><span>Ilustrasi konsep</span><div className="preview-tabs" role="tablist" aria-label="Tampilan konsep" onKeyDown={event => {
        if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
          event.preventDefault();
          selectPreview(event.key === 'Home' ? 0 : event.key === 'End' ? 1 : mobilePreview ? 0 : 1);
        }
      }}>{[false, true].map((mobile, index) => <button key={String(mobile)} type="button" role="tab" id={`preview-tab-${index}`} aria-controls="case-preview" aria-selected={mobilePreview === mobile} tabIndex={mobilePreview === mobile ? 0 : -1} ref={node => { previewRefs.current[index] = node; }} onClick={() => setMobilePreview(mobile)}>{mobile ? <Smartphone size={15} aria-hidden="true" /> : <Monitor size={15} aria-hidden="true" />}{mobile ? 'Mobile' : 'Desktop'}</button>)}</div></div>
      <div id="case-preview" className={`case-preview ${mobilePreview ? 'is-mobile' : ''}`} role="tabpanel" aria-labelledby={`preview-tab-${mobilePreview ? 1 : 0}`} tabIndex={0}><ConceptPreview concept={project.id} mobile={mobilePreview} /></div>
      <div className="case-story"><section><p className="eyebrow">01 / Tujuan</p><h3>Dimulai dari kebutuhan.</h3><p>{project.goal}</p></section><section><p className="eyebrow">02 / Pendekatan</p><h3>Karakter di setiap detail.</h3><p>{project.approach}</p></section></div>
      <section className="case-deliverables"><div><p className="eyebrow">03 / Struktur konsep</p><h3>Halaman & fitur</h3><ul>{project.pages.map(page => <li key={page}><Check size={16} aria-hidden="true" />{page}</li>)}</ul></div><div><p className="eyebrow">04 / Rencana teknologi</p><h3>Fondasi pengembangan</h3><ul className="tech-list">{project.technologies.map(tech => <li key={tech}>{tech}</li>)}</ul><p className="case-note">Studi visual untuk menunjukkan arah desain. Fitur produksi, integrasi, dan hasil bisnis belum diimplementasikan pada konsep ini.</p></div></section>
      <div className="case-footer"><p>Arah seperti ini cocok untuk bisnis Anda?</p><div>{project.demoUrl && <a className="button-outline" href={project.demoUrl} target="_blank" rel="noopener noreferrer">Buka Demo <ArrowUpRight size={16} aria-hidden="true" /></a>}<ContactLink context={`membuat website seperti ${project.name}`}>Diskusikan Website Seperti Ini</ContactLink></div></div>
    </motion.div>
  </dialog>;
}

export function App({ hero, heroPortrait, content, footer, afterProjects, contactExtra }: {
  hero?: ReactNode;
  heroPortrait?: ReactNode;
  content?: (onSelect: (project: ProjectItem) => void) => ReactNode;
  footer?: ReactNode;
  afterProjects?: (onSelect: (project: ProjectItem) => void) => ReactNode;
  contactExtra?: ReactNode;
} = {}) {
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const compact = useMediaQuery('(max-width: 639px)');
  const [reduced, setReduced] = useState(() => {
    try {
      // Autoplay on first visit; only an explicit pause on this site disables it.
      return localStorage.getItem(MOTION_STORAGE_KEY) === 'reduce';
    } catch { return false; }
  });
  useLayoutEffect(() => {
    document.documentElement.dataset.motion = reduced ? 'reduce' : 'full';
  }, [reduced]);
  const toggle = () => {
    const next = !reduced;
    setReduced(next);
    try { localStorage.setItem(MOTION_STORAGE_KEY, next ? 'reduce' : 'full'); } catch { /* The choice still applies to this visit. */ }
  };
  return <MotionPreferenceContext.Provider value={{ reduced, toggle }}>
    <a className="skip-link" href="#projects">Langsung ke karya pilihan</a>
    {hero ?? <HeroSection portrait={heroPortrait} />}
    <main>{content ? content(setActiveProject) : <><MarqueeSection compact={compact} /><ProjectsSection compact={compact} onSelect={setActiveProject} />{afterProjects?.(setActiveProject)}<AboutSection /><ServicesSection /><ProcessSection /><FAQSection /></>}</main>
    {footer ?? <ContactSection extra={contactExtra} />}
    {activeProject && <ProjectModal key={activeProject.id} project={activeProject} onClose={() => setActiveProject(null)} />}
  </MotionPreferenceContext.Provider>;
}

export default App;
