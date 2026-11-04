import { useId } from 'react';
import type { ConceptKey } from './portfolio-data';

const THEMES = {
  nextlevel: { name: 'nextlevel®', label: 'INDEPENDENT AI & DIGITAL STUDIO', title: ['Ideas beyond', 'the ordinary.'], small: 'WE TURN WHAT’S NEXT INTO WHAT’S NOW.', bg: '#111015', ink: '#f3effa', accent: '#b5a0ff', muted: '#b9b1c7', button: 'Explore our work', footer: 'STRATEGY  /  DESIGN  /  TECHNOLOGY' },
  aura: { name: 'aura.', label: 'OBJECTS FOR EVERYDAY RITUALS', title: ['A little less.', 'A little better.'], small: 'THOUGHTFUL OBJECTS. QUIET MOMENTS.', bg: '#eee8de', ink: '#363028', accent: '#b49779', muted: '#7f7568', button: 'Discover the collection', footer: 'CONSIDERED DESIGN  /  LASTING DETAILS' },
  solaris: { name: 'solaris↗', label: 'A CLEARER WAY FORWARD', title: ['Built for', 'what’s ahead.'], small: 'CONNECTING PEOPLE, IDEAS AND POSSIBILITY.', bg: '#e7ece4', ink: '#243b2f', accent: '#a5ba87', muted: '#657666', button: 'Discover our solutions', footer: 'PEOPLE  /  PURPOSE  /  PROGRESS' },
  folio: { name: 'FORMA®', label: 'INDEPENDENT DESIGN PRACTICE', title: ['Make it', 'mean something.'], small: 'SELECTED IDEAS & DIGITAL EXPERIENCES.', bg: '#ee5b35', ink: '#271d19', accent: '#f2d7b0', muted: '#662b21', button: 'View selected work', footer: 'ART DIRECTION  /  DIGITAL DESIGN' },
  terra: { name: 'terra', label: 'GROWN SLOW. MADE WITH CARE.', title: ['Good things', 'take root.'], small: 'A NEW WAY TO CONNECT WITH THE EVERYDAY.', bg: '#dedac7', ink: '#384633', accent: '#83966b', muted: '#6d745d', button: 'Meet our world', footer: 'ROOTED IN NATURE  /  MADE FOR YOU' },
  pulse: { name: 'pulse.', label: 'YOUR WORK, IN PERSPECTIVE', title: ['Less noise.', 'More clarity.'], small: 'ONE THOUGHTFUL SPACE FOR YOUR TEAM.', bg: '#161b30', ink: '#eff1ff', accent: '#a7b3ff', muted: '#a0aacb', button: 'Explore the workspace', footer: 'WORKSPACE  /  PROJECTS  /  INSIGHTS' },
};

/** Original vector design studies. These are illustrations, not screenshots of live client sites. */
export function ConceptPreview({ concept, mobile = false, className = '' }: { concept: ConceptKey; mobile?: boolean; className?: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const theme = THEMES[concept];
  const w = mobile ? 390 : 1200;
  const h = mobile ? 760 : 780;
  const titleY = mobile ? 156 : 255;
  const titleSize = mobile ? 49 : 92;
  const left = mobile ? 28 : 66;
  const artX = mobile ? 195 : 904;
  const artY = mobile ? 496 : 364;
  const artScale = mobile ? 0.7 : 1;

  return (
    <svg className={`concept-preview ${className}`} viewBox={`0 0 ${w} ${h}`} width={w} height={h} role="img" aria-label={`Ilustrasi konsep ${theme.name.replace(/[®↗]/g, '')}, tampilan ${mobile ? 'mobile' : 'desktop'}`}>
      <defs>
        <linearGradient id={`${uid}-orb`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor={theme.accent} />
          <stop offset="0.5" stopColor={concept === 'nextlevel' ? '#7b54dc' : theme.bg} />
          <stop offset="1" stopColor={theme.ink} />
        </linearGradient>
        <linearGradient id={`${uid}-bottle`} x1="0" x2="1">
          <stop stopColor="#a78970" /><stop offset="0.42" stopColor="#d1b9a2" /><stop offset="0.75" stopColor="#c3a58a" /><stop offset="1" stopColor="#a78970" />
        </linearGradient>
        <pattern id={`${uid}-grid`} width="32" height="32" patternUnits="userSpaceOnUse"><path d="M 32 0 L 0 0 0 32" fill="none" stroke={theme.accent} strokeOpacity="0.1" /></pattern>
      </defs>
      <rect width={w} height={h} fill={theme.bg} />
      {concept === 'nextlevel' && <rect width={w} height={h} fill={`url(#${uid}-grid)`} />}
      <g fontFamily="Arial, sans-serif" fill={theme.ink}>
        <text x={left} y={mobile ? 49 : 65} fontSize={mobile ? 23 : 30} fontWeight="700" letterSpacing="-1">{theme.name}</text>
        {mobile ? <g stroke={theme.ink} strokeWidth="1.5"><path d="M338 32h24M338 40h24" /></g> : <>
          <text x="674" y="61" fontSize="13">About</text><text x="754" y="61" fontSize="13">Our approach</text><text x="892" y="61" fontSize="13">Selected work</text>
          <rect x="1025" y="36" width="114" height="40" rx="20" fill="none" stroke={theme.ink} strokeOpacity="0.4" />
          <text x="1047" y="61" fontSize="12">Let’s talk ↗</text>
        </>}
        <path d={`M${left} ${mobile ? 76 : 98} H${w - left}`} stroke={theme.ink} strokeOpacity="0.14" />
        <text x={left} y={mobile ? 112 : 168} fontSize={mobile ? 8 : 11} letterSpacing={mobile ? 1.6 : 2.4} fill={theme.muted}>{theme.label}</text>
        <text x={left} y={titleY} fontFamily={concept === 'aura' || concept === 'terra' ? 'Georgia, serif' : 'Arial, sans-serif'} fontSize={titleSize} fontWeight={concept === 'aura' || concept === 'terra' ? 400 : 700} letterSpacing="-3">
          <tspan x={left}>{theme.title[0]}</tspan><tspan x={left} dy={mobile ? 55 : 100}>{theme.title[1]}</tspan>
        </text>
        <text x={left} y={mobile ? 244 : 412} fontSize={mobile ? 7.5 : 10} letterSpacing="1" fill={theme.muted}>{theme.small}</text>
        <rect x={left} y={mobile ? 268 : 455} width={mobile ? 175 : 215} height={mobile ? 39 : 50} rx={concept === 'folio' ? 0 : 26} fill={theme.ink} />
        <text x={left + (mobile ? 15 : 23)} y={mobile ? 292 : 485} fontSize={mobile ? 10 : 13} fill={theme.bg}>{theme.button}</text>
        <text x={left + (mobile ? 149 : 180)} y={mobile ? 292 : 485} fontSize="15" fill={theme.bg}>↗</text>
      </g>
      <g transform={`translate(${artX} ${artY}) scale(${artScale})`}>
        {concept === 'aura' ? <>
          <ellipse cy="210" rx="168" ry="22" fill="#8e7b63" opacity="0.1" />
          <path d="M-195 205L-160-190Q-95-242-30-190L-10 205Z" fill="#d4c6b3" />
          <path d="M-125 205L-105-120Q-72-157-40-120L-20 205Z" fill="#c8b79e" />
          <rect x="-48" y="-97" width="151" height="287" rx="57" fill={`url(#${uid}-bottle)`} />
          <rect x="-19" y="-142" width="93" height="64" rx="9" fill="#504339" />
          <rect x="-22" y="-25" width="99" height="128" rx="2" fill="#e8ded0" />
          <text x="27" y="13" textAnchor="middle" fontFamily="Georgia, serif" fontSize="31" fill="#4b3d31">aura.</text>
          <text x="27" y="44" textAnchor="middle" fontFamily="Arial" fontSize="8" letterSpacing="1.8" fill="#776250">DAILY RITUAL</text>
          <path d="M-3 65h60M10 74h34" stroke="#ae9a82" />
          <path d="M139 198Q215 52 169-185M143 129Q101 50 156 51Q204 72 172 111M173 28Q129-42 182-49Q226-23 192 14" fill="none" stroke="#767958" strokeWidth="3" />
        </> : concept === 'solaris' || concept === 'terra' ? <>
          <rect x="-210" y="-223" width="410" height="445" rx={concept === 'terra' ? 200 : 8} fill={theme.accent} />
          <circle cy="-18" r="147" fill={theme.bg} opacity="0.6" />
          {[0, 1, 2, 3, 4, 5, 6].map(i => <ellipse key={i} cy="-18" rx={26 + i * 19} ry="147" fill="none" stroke={theme.ink} strokeWidth="1.4" opacity="0.55" transform={`rotate(${concept === 'terra' ? -25 : 20} 0 -18)`} />)}
          <path d="M-140-18H140M-125-90H125M-125 54H125" stroke={theme.ink} strokeWidth="1.3" opacity="0.4" />
          <circle cx="89" cy="-98" r="9" fill={theme.ink} />
          <text x="-170" y="190" fill={theme.ink} fontSize="11" fontFamily="Arial" letterSpacing="2">{concept === 'terra' ? 'NATURALLY CONNECTED' : 'A WORLD OF POSSIBILITY'} ↗</text>
        </> : concept === 'pulse' ? <>
          <rect x="-220" y="-195" width="425" height="400" rx="16" fill="#242c46" stroke="#455077" />
          <text x="-191" y="-152" fill="#eee" fontSize="19" fontFamily="Arial">Workspace overview</text>
          {[0, 1, 2].map(i => <g key={i}><rect x={-192 + i * 125} y="-120" width="113" height="77" rx="8" fill="#333d5c" /><rect x={-178 + i * 125} y="-101" width="51" height="6" rx="3" fill="#8392bf" /><rect x={-178 + i * 125} y="-80" width="34" height="14" rx="3" fill={theme.accent} /></g>)}
          <rect x="-192" y="-25" width="366" height="197" rx="10" fill="#1b223a" />
          {[-1, 0, 1, 2].map(i => <path key={i} d={`M-173 ${i * 40 + 42}H150`} stroke="#333d5c" />)}
          <path d="M-170 130L-120 80L-67 101L-10 21L40 50L93 0L150-5" stroke={theme.accent} fill="none" strokeWidth="4" />
        </> : concept === 'folio' ? <>
          <rect x="-189" y="-212" width="378" height="424" fill="#28211d" />
          <g fill={theme.accent} transform="rotate(-14)"><rect x="-125" y="-42" width="250" height="84" rx="42" /><rect x="-42" y="-125" width="84" height="250" rx="42" /><rect x="-125" y="-42" width="250" height="84" rx="42" transform="rotate(45)" /><rect x="-125" y="-42" width="250" height="84" rx="42" transform="rotate(-45)" /></g>
          <circle r="34" fill="#ee5b35" />
          <text x="-157" y="185" fill={theme.accent} fontFamily="Arial" fontSize="11" letterSpacing="2">EXPERIMENT NO. 04 / FORMA</text>
        </> : <>
          <circle r="190" fill={theme.accent} opacity="0.035" />
          <circle r="155" fill={`url(#${uid}-orb)`} />
          {[-65, -30, 15, 60].map((angle, i) => <ellipse key={angle} rx={173 + i * 7} ry={47 + i * 12} transform={`rotate(${angle})`} fill="none" stroke={theme.accent} strokeWidth="1.2" opacity="0.7" />)}
          <circle cx="148" cy="-74" r="8" fill="#e8ddff" /><circle cx="-109" cy="129" r="4" fill="#e8ddff" />
          <path d="M-199-195h20M-189-205v20M175 176h20M185 166v20" stroke="#b5a0ff" />
        </>}
      </g>
      <g fontFamily="Arial, sans-serif" fill={theme.ink}>
        <path d={`M${left} ${mobile ? 704 : 654}H${w - left}`} stroke={theme.ink} strokeOpacity="0.16" />
        <text x={left} y={mobile ? 733 : 690} fontSize={mobile ? 7 : 10} letterSpacing="1.2">{theme.footer}</text>
        {!mobile && <><text x="66" y="737" fontSize="10" fill={theme.muted}>A DESIGN STUDY BY LOSTA MASTA</text><text x="1040" y="737" fontSize="10" fill={theme.muted}>CONCEPT / 2026</text></>}
      </g>
    </svg>
  );
}
