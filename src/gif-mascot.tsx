import { useEffect, useRef } from 'react';
import { useMotionPreference } from '../losta_masta_spesialis_pembuatan_website';
import { initLivingPortrait } from './living-portrait';
import PORTRAIT from './hijab-portrait-manifest.json';
import './gif-mascot.css';

/** The portfolio mascot without its surrounding hero layout or typography. */
export function GifMascot() {
  const figure = useRef<HTMLDivElement>(null);
  const { reduced } = useMotionPreference();
  const paused = useRef(reduced);
  paused.current = reduced;

  useEffect(() => {
    if (!figure.current) return;
    const root = figure.current.closest<HTMLElement>('header') ?? figure.current;
    return initLivingPortrait(root, {
      portrait: PORTRAIT,
      isPaused: () => paused.current,
      contactSelector: 'a[href*="wa.me"]',
    });
  }, []);

  return <div className="gif-mascot" ref={figure}>
    <div className="hero-badge"><span aria-hidden="true" />Web Design &amp; Development</div>
    <div className="gif-mascot-frame">
      <div className="gif-mascot-wrap" id="magnetWrap">
        <img id="faceFallback" src={PORTRAIT.stills.rest} width="640" height="640"
          alt="Maskot Losta Masta, perempuan berhijab marun dan berkacamata. Gerakkan kursor atau tarik pipinya."
          loading="eager" fetchPriority="high" draggable={false} />
        <canvas id="faceGl" aria-hidden="true" />
        <div className="gif-mascot-props" id="faceProps" aria-hidden="true">
          <span id="faceFly" /><span id="faceHand" />
        </div>
      </div>
    </div>
  </div>;
}
