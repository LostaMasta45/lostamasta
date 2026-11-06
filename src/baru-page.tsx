import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Hand, Pause, Play, RotateCcw } from 'lucide-react';
import App, { useMotionPreference } from '../losta_masta_spesialis_pembuatan_website';
import { whatsappUrl } from './portfolio-data';
import { initLivingPortrait } from './living-portrait';
import HIJAB_PORTRAIT from './hijab-portrait-manifest.json';
import './baru.css';

const REST = '/media/hijab-portrait/rest.webp';
const GIF_GROUPS = [
  { label: 'Aksi', matches: (source: string) => /^\d/.test(source) },
  { label: 'Arah pandang', matches: (source: string) => source.startsWith('gaze_') },
  { label: 'Reaksi', matches: (source: string) => source.startsWith('reaksi_') },
];
const CUSTOM_PORTRAIT = {
  rest: '/media/living-portrait/coba/rest.webp',
  left: '/media/living-portrait/coba/left.webp',
  right: '/media/living-portrait/coba/right.webp',
  winkl: '/media/living-portrait/coba/01_kedip_jahil.webp',
  puff: '/media/living-portrait/coba/02_pipi_menggembung.webp',
  grin: '/media/living-portrait/coba/03_senyum_hangat.webp',
  raised: '/media/living-portrait/coba/04_dapat_ide.webp',
  smug: '/media/living-portrait/coba/05_melirik_curiga.webp',
};
export function LivingHero({ portfolio = false }: { portfolio?: boolean }) {
  const root = useRef<HTMLElement>(null);
  const { reduced, toggle } = useMotionPreference();
  const paused = useRef(reduced);
  const [imageFailed, setImageFailed] = useState(false);
  paused.current = reduced;

  useEffect(() => {
    const previous = document.title;
    document.title = portfolio ? 'Portofolio — Losta Masta / Web Design & Development' : 'Losta Masta — Living Portrait';
    const cleanup = root.current
      ? initLivingPortrait(root.current, { isPaused: () => paused.current,
          images: portfolio ? undefined : CUSTOM_PORTRAIT,
          portrait: portfolio ? HIJAB_PORTRAIT : undefined })
      : undefined;
    return () => { cleanup?.(); document.title = previous; };
  }, [portfolio]);

  return <header className={`baru-hero${portfolio ? ' pf-hero' : ''}`} id="top" ref={root}>
    <div className="baru-preview-bar">
      <span><span className="baru-status-dot" />{portfolio ? 'Independent digital studio' : 'Eksplorasi 01'} <span className="baru-preview-label">/ {portfolio ? 'Jombang, Indonesia' : 'Living portrait'}</span></span>
      <a href="/">{portfolio ? 'Beranda' : 'Homepage saat ini'} <ArrowUpRight size={13} aria-hidden="true" /></a>
    </div>

    <nav className="baru-nav" aria-label="Navigasi utama">
      <a href="#projects">Karya</a><a href="#about">Tentang</a><a href="#services">Layanan</a>
      <a className="contact-btn" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">Kontak <ArrowUpRight size={16} aria-hidden="true" /></a>
    </nav>

    <div className="baru-title-wrap">
      <p className="baru-eyebrow">Independent web design & development</p>
      <h1 className="baru-wordmark">LOSTA MASTA</h1>
    </div>

    <div className="baru-portrait-stage">
      <div className="baru-portrait-glow" aria-hidden="true" />
      <div className="baru-side-note" aria-hidden="true"><span>DESIGN WITH FEELING</span><span>BUILT FOR PEOPLE</span></div>
      <div className="baru-portrait-wrap" id="magnetWrap">
        <div className="baru-portrait-inner">
          <img id="faceFallback" src={portfolio ? REST : CUSTOM_PORTRAIT.rest} width={portfolio ? 640 : 960} height={portfolio ? 640 : 960} loading="eager" fetchPriority="high"
            alt={portfolio ? 'Maskot perempuan berhijab marun dan berkacamata. Gerakkan kursor, sentuh wajah, atau tarik pipinya.' : 'Karakter perempuan berhijab marun dan berkacamata. Gerakkan kursor untuk mengarahkan pandangannya atau tarik pipinya.'}
            draggable={false} onError={() => setImageFailed(true)} />
          <canvas id="faceGl" aria-hidden="true" />
          <div id="faceProps" aria-hidden="true">
            <svg id="faceFly" viewBox="0 0 32 32"><path className="wing" d="M15 15C12 9.5 4.5 8.5 2 13c2.5 4.5 10 4.5 13 2z" /><path className="wing r" d="M17 15c3-5.5 10.5-6.5 13-2-2.5 4.5-10 4.5-13 2z" /><ellipse cx="16" cy="19.5" rx="4" ry="6.5" /><circle cx="16" cy="11.5" r="3.3" /></svg>
            <svg id="faceHand" viewBox="0 0 32 32"><path className="open" d="M10.5 16.5V8.2a1.8 1.8 0 0 1 3.6 0V14v-8a1.8 1.8 0 0 1 3.6 0V14 7a1.8 1.8 0 0 1 3.6 0v8-5a1.8 1.8 0 0 1 3.6 0v10.5c0 5-3.4 8.5-8.4 8.5-3.6 0-5.7-1.6-7.6-4.6l-3.5-5.6c-.6-1 .1-2.2 1.2-2.4 1-.2 1.9.2 2.6 1z" /><path className="grab" d="M10.5 17v-3.3a1.8 1.8 0 0 1 3.6 0V14v-1.8a1.8 1.8 0 0 1 3.6 0V14v-1.3a1.8 1.8 0 0 1 3.6 0V14v-.3a1.8 1.8 0 0 1 3.6 0v6.8c0 5-3.4 8.5-8.4 8.5-3.6 0-5.7-1.6-7.6-4.6l-2.3-3.7c-.6-1 .1-2.2 1.2-2.4 1-.2 1.9.2 2.7 1z" /></svg>
          </div>
        </div>
      </div>
      <div className="baru-interaction-hint" id="portrait-hint">
        <Hand size={15} aria-hidden="true" />
        <span>{imageFailed ? 'Gambar karakter belum tersedia.' : <>Sedikit jahil boleh. <span>Coba tarik pipinya.</span></>}</span>
      </div>
    </div>

    <div className="baru-hero-bottom">
      <div className="baru-intro"><p className="baru-eyebrow">Bukan sekadar tampil.</p><p>Website yang punya karakter.<br />Dan bikin orang betah.</p></div>
      <a className="baru-explore" href="#projects">Jelajahi karya <ArrowDown size={15} aria-hidden="true" /></a>
      <div className="baru-actions">
        <a className="button-primary contact-btn" href={whatsappUrl()} target="_blank" rel="noopener noreferrer"><span>Ceritakan ide Anda</span><ArrowUpRight size={18} aria-hidden="true" /></a>
        <button className="baru-motion-toggle" type="button" onClick={toggle} aria-pressed={!reduced}>
          {reduced ? <Play size={12} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />}{reduced ? 'Aktifkan interaksi' : 'Jeda interaksi'}
        </button>
      </div>
    </div>

    <div className="baru-play-strip" aria-label="Kontrol karakter">
      <span className="baru-play-label"><span className="baru-status-dot" />A little personality.</span>
      <div className="baru-play-buttons">
        {portfolio ? <>
        <button type="button" data-portrait-action="sneeze" disabled={reduced}>Bersin</button>
        <button type="button" data-portrait-action="hijab" disabled={reduced}>Rapikan hijab</button>
        <button type="button" data-portrait-action="gum" disabled={reduced}>Permen karet</button>
        <select className="baru-pose-picker" data-portrait-picker="" defaultValue="" disabled={reduced} aria-label="Coba pose maskot lainnya">
          <option value="" disabled>Coba pose lain</option>
          {GIF_GROUPS.map(group => <optgroup key={group.label} label={group.label}>
            {Object.entries(HIJAB_PORTRAIT.animations).filter(([, clip]) => group.matches(clip.source)).map(([key, clip]) =>
              <option key={key} value={key}>{clip.source.replace(/^(?:gaze_|reaksi_)?\d*_?/, '').replace(/\.gif$/, '').replace(/_/g, ' ')}</option>)}
          </optgroup>)}
        </select>
        </> : <>
        <button type="button" data-portrait-action="look-left" disabled={reduced}>Lihat kiri</button>
        <button type="button" data-portrait-action="look-center" disabled={reduced}>Lihat depan</button>
        <button type="button" data-portrait-action="look-right" disabled={reduced}>Lihat kanan</button>
        <button type="button" data-portrait-action="winkl" disabled={reduced}>Kedip</button>
        <button type="button" data-portrait-action="puff" disabled={reduced}>Pipi gembung</button>
        <button type="button" data-portrait-action="grin" disabled={reduced}>Senyum</button>
        <button type="button" data-portrait-action="raised" disabled={reduced}>Dapat ide</button>
        <button type="button" data-portrait-action="smug" disabled={reduced}>Lirik curiga</button>
        </>}
        <button type="button" data-portrait-action="reset" aria-label="Reset karakter"><RotateCcw size={13} aria-hidden="true" /><span>Reset</span></button>
      </div>
    </div>
  </header>;
}

export default function BaruPage() {
  return <App hero={<LivingHero />} />;
}
