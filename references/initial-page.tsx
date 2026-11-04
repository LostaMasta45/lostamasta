import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, MotionValue, AnimatePresence } from 'framer-motion';
import {
  X,
  ArrowUpRight,
  Mail,
  Sparkles,
  Check,
  Globe,
  Zap,
  Smartphone,
  CheckCircle2,
  Layers,
} from 'lucide-react';

// ============================================================================
// DATA DEFINITIONS
// ============================================================================

const MARQUEE_IMAGES = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
];

interface ServiceItem {
  number: string;
  name: string;
  description: string;
  deliverables: string[];
}

const SERVICES_DATA: ServiceItem[] = [
  {
    number: '01',
    name: 'Company Profile & Landing Page',
    description:
      'Website representasi bisnis dan halaman promosi yang dirancang khusus untuk membangun kredibilitas instan serta meningkatkan konversi penjualan maupun leads klien.',
    deliverables: ['Desain Eksklusif', 'Copywriting Persuasif', 'Integrasi WhatsApp & Form', 'Mobile-First'],
  },
  {
    number: '02',
    name: 'E-Commerce & Katalog Online',
    description:
      'Toko online modern dengan tampilan produk yang elegan, keranjang belanja intuitif, integrasi pembayaran otomatis, serta kemudahan pengelolaan stok.',
    deliverables: ['Katalog Produk Dinamis', 'Payment Gateway', 'Hitung Ongkir Otomatis', 'Dashboard Admin'],
  },
  {
    number: '03',
    name: 'Custom Web App & Dashboard',
    description:
      'Pengembangan aplikasi berbasis web kustom, portal klien, hingga sistem manajemen internal yang cepat, aman, dan skalabel menggunakan teknologi terkini.',
    deliverables: ['React & TypeScript', 'REST API / Database', 'Autentikasi Aman', 'Performa Tinggi'],
  },
  {
    number: '04',
    name: 'UI/UX & Redesign Website',
    description:
      'Perombakan total tampilan website lama menjadi modern, interaktif, dan ramah pengguna (mobile-friendly) agar bisnis Anda tampil lebih unggul dari kompetitor.',
    deliverables: ['Audit UX menyeluruh', 'Prototipe Interaktif', 'Animasi Halus', 'Desain Responsif'],
  },
  {
    number: '05',
    name: 'Optimasi Kecepatan & SEO',
    description:
      'Penataan struktur kode, optimasi waktu muat halaman (loading super cepat), dan fondasi SEO teknis agar website mudah ditemukan di halaman pertama Google.',
    deliverables: ['Skor PageSpeed 95+', 'Struktur SEO On-Page', 'Sertifikat SSL & Keamanan', 'Google Analytics'],
  },
];

interface ProjectItem {
  number: string;
  name: string;
  category: string;
  clientType: string;
  metric: string;
  liveDomain: string;
  tags: string[];
  pagesBuilt: string[];
  description: string;
  col1Image1: string;
  col1Image2: string;
  col2Image: string;
}

const PROJECTS_DATA: ProjectItem[] = [
  {
    number: '01',
    name: 'Nextlevel AI & Studio Web',
    category: 'Landing Page & SaaS',
    clientType: 'Agensi Teknologi & AI',
    metric: '+210% Kenaikan Leads Klien',
    liveDomain: 'nextlevel-studio.id',
    tags: ['React', 'Tailwind CSS', 'Animasi Interaktif', 'SEO Ready'],
    pagesBuilt: [
      'Beranda Interaktif dengan Hero 3D',
      'Halaman Layanan & Kalkulator Harga',
      'Studi Kasus Klien & Portofolio',
      'Sistem Booking Konsultasi Otomatis',
    ],
    description:
      'Pembuatan website landing page berkonversi tinggi dengan navigasi cepat, animasi scroll modern, dan sistem penangkap prospek (lead generation) otomatis untuk klien agensi digital.',
    col1Image1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
    col1Image2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
    col2Image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
  },
  {
    number: '02',
    name: 'Aura Luxury E-Commerce',
    category: 'Toko Online & Brand Web',
    clientType: 'Brand Retail & Lifestyle Premium',
    metric: 'Waktu Muat 0.8 Detik',
    liveDomain: 'auracollection.co.id',
    tags: ['E-Commerce', 'Katalog Produk', 'Mobile-First', 'Payment Gateway'],
    pagesBuilt: [
      'Etalase Katalog Produk dengan Filter Cepat',
      'Halaman Detail Produk & Zoom Visual',
      'Keranjang Belanja & Checkout 1-Klik',
      'Integrasi Pembayaran QRIS, Virtual Account & Kurir',
    ],
    description:
      'Website toko online eksklusif yang menonjolkan estetika produk premium dengan pengalaman belanja super mulus di smartphone maupun desktop.',
    col1Image1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
    col1Image2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
    col2Image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
  },
  {
    number: '03',
    name: 'Solaris Fintech & Corporate',
    category: 'Company Profile & Web Portal',
    clientType: 'Perusahaan Korporasi & Finansial',
    metric: 'Skor Google PageSpeed 99/100',
    liveDomain: 'solaris-digital.com',
    tags: ['Dashboard Klien', 'Multi-Bahasa', 'Keamanan Tinggi', 'Custom CMS'],
    pagesBuilt: [
      'Profil Perusahaan & Visi Korporasi',
      'Dashboard Interaktif & Laporan Tahunan',
      'Portal Berita, Artikel SEO & Karir',
      'Panel CMS Kustom untuk Tim Internal Klien',
    ],
    description:
      'Website korporasi berskala enterprise yang menggabungkan profil perusahaan profesional, pusat informasi layanan, dan portal klien dengan performa serta keamanan terbaik.',
    col1Image1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
    col1Image2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
    col2Image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
  },
];

// ============================================================================
// REUSABLE COMPONENTS
// ============================================================================

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  style?: React.CSSProperties;
  as?: keyof typeof motion;
}

const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className = '',
  style,
  as = 'div',
}) => {
  const MotionTag = (motion as unknown as Record<string, React.ComponentType<any>>)[as] || motion.div;

  return (
    <MotionTag
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
      style={style}
    >
      {children}
    </MotionTag>
  );
};

interface MagnetProps {
  children: React.ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
}

const Magnet: React.FC<MagnetProps> = ({
  children,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className = '',
}) => {
  const magnetRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!magnetRef.current) return;
      const rect = magnetRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = Math.abs(centerX - e.clientX);
      const distY = Math.abs(centerY - e.clientY);

      if (distX < rect.width / 2 + padding && distY < rect.height / 2 + padding) {
        setIsActive(true);
        const offsetX = (e.clientX - centerX) / strength;
        const offsetY = (e.clientY - centerY) / strength;
        setPosition({ x: offsetX, y: offsetY });
      } else {
        setIsActive(false);
        setPosition({ x: 0, y: 0 });
      }
    };

    const handleMouseLeave = () => {
      setIsActive(false);
      setPosition({ x: 0, y: 0 });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [padding, strength]);

  return (
    <div
      ref={magnetRef}
      className={className}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: isActive ? activeTransition : inactiveTransition,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
};

interface ContactButtonProps {
  onClick?: () => void;
  className?: string;
  label?: string;
}

const ContactButton: React.FC<ContactButtonProps> = ({
  onClick,
  className = '',
  label = 'Buat Website Sekarang',
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full text-white font-medium uppercase tracking-widest px-7 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer select-none whitespace-nowrap ${className}`}
      style={{
        background:
          'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow:
          '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
        outline: '2px solid white',
        outlineOffset: '-3px',
      }}
    >
      {label}
    </button>
  );
};

interface LiveProjectButtonProps {
  onClick?: () => void;
}

const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-6 py-2.5 sm:px-8 sm:py-3 text-xs sm:text-sm md:text-base hover:bg-[#D7E2EA] hover:text-[#0C0C0C] transition-colors duration-200 cursor-pointer shrink-0 select-none whitespace-nowrap flex items-center gap-2"
    >
      <span>Lihat Detail Web</span>
      <ArrowUpRight className="w-4 h-4" />
    </button>
  );
};

// Character-by-character scroll-driven opacity animation
interface AnimatedCharProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const AnimatedChar: React.FC<AnimatedCharProps> = ({ char, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <span className="relative inline-block">
      <span className="opacity-0 select-none" aria-hidden="true">
        {char}
      </span>
      <motion.span style={{ opacity }} className="absolute left-0 top-0">
        {char}
      </motion.span>
    </span>
  );
};

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '', style }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.25'],
  });

  const words = text.split(' ');
  const totalChars = text.length;
  let globalCharIndex = 0;

  return (
    <p
      ref={containerRef}
      className={`text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[600px] flex flex-wrap justify-center px-2 ${className}`}
      style={style}
    >
      {words.map((word, wordIdx) => {
        const wordChars = word.split('');
        return (
          <span key={wordIdx} className="inline-flex whitespace-pre">
            {wordChars.map((char, charIdx) => {
              const start = globalCharIndex / totalChars;
              const end = (globalCharIndex + 1) / totalChars;
              globalCharIndex += 1;
              return (
                <AnimatedChar
                  key={charIdx}
                  char={char}
                  progress={scrollYProgress}
                  range={[start, end]}
                />
              );
            })}
            {wordIdx < words.length - 1 && (() => {
              const start = globalCharIndex / totalChars;
              const end = (globalCharIndex + 1) / totalChars;
              globalCharIndex += 1;
              return (
                <AnimatedChar
                  key={`space-${wordIdx}`}
                  char={'\u00A0'}
                  progress={scrollYProgress}
                  range={[start, end]}
                />
              );
            })()}
          </span>
        );
      })}
    </p>
  );
};

// ============================================================================
// SECTION 1: HERO SECTION
// ============================================================================

interface HeroSectionProps {
  onOpenContact: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContact }) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="min-h-[100svh] h-screen flex flex-col justify-between relative w-full"
      style={{ overflowX: 'clip' }}
    >
      {/* Top Group: Navbar + Hero Heading */}
      <div className="w-full relative z-20">
        <FadeIn delay={0} y={-20}>
          <nav className="flex items-center justify-between px-5 sm:px-8 md:px-10 pt-5 sm:pt-6 md:pt-8">
            <button
              type="button"
              onClick={() => scrollToSection('about')}
              className="text-[#D7E2EA] font-medium uppercase tracking-wider text-xs sm:text-base md:text-lg lg:text-[1.35rem] hover:opacity-70 transition-opacity duration-200 cursor-pointer bg-transparent border-none"
            >
              Tentang
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('services')}
              className="text-[#D7E2EA] font-medium uppercase tracking-wider text-xs sm:text-base md:text-lg lg:text-[1.35rem] hover:opacity-70 transition-opacity duration-200 cursor-pointer bg-transparent border-none"
            >
              Layanan
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('projects')}
              className="text-[#D7E2EA] font-medium uppercase tracking-wider text-xs sm:text-base md:text-lg lg:text-[1.35rem] hover:opacity-70 transition-opacity duration-200 cursor-pointer bg-transparent border-none"
            >
              Portofolio Web
            </button>
            <button
              type="button"
              onClick={onOpenContact}
              className="text-[#D7E2EA] font-medium uppercase tracking-wider text-xs sm:text-base md:text-lg lg:text-[1.35rem] hover:opacity-70 transition-opacity duration-200 cursor-pointer bg-transparent border-none"
            >
              Kontak
            </button>
          </nav>
        </FadeIn>

        <div className="overflow-hidden w-full px-2 sm:px-4">
          <FadeIn delay={0.15} y={40}>
            <h1 className="hero-heading font-black uppercase tracking-tight leading-[0.9] whitespace-nowrap w-full text-center text-[12.2vw] sm:text-[12.8vw] md:text-[13.2vw] lg:text-[13.6vw] mt-4 sm:mt-3 md:-mt-2 select-none">
              LOSTA MASTA
            </h1>
          </FadeIn>
        </div>
      </div>

      {/* Centered Hero Portrait with Magnetic Hover */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 w-[220px] sm:w-[340px] md:w-[420px] lg:w-[500px] top-[46%] -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 pointer-events-auto">
        <FadeIn delay={0.6} y={30}>
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
          >
            <div className="relative flex flex-col items-center">
              <div className="mb-2 sm:mb-3 px-3.5 py-1.5 rounded-full bg-[#0C0C0C]/85 border border-[#D7E2EA]/25 backdrop-blur-md flex items-center gap-2 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#D7E2EA] font-medium whitespace-nowrap">
                  Tersedia untuk Proyek Website Baru
                </span>
              </div>
              <img
                src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png"
                alt="Losta Masta — Spesialis Pembuatan Website & Web Developer"
                className="w-full h-auto object-contain block select-none pointer-events-none"
              />
            </div>
          </Magnet>
        </FadeIn>
      </div>

      {/* Bottom Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-6 px-5 sm:px-8 md:px-10 pb-6 sm:pb-8 md:pb-10 relative z-20">
        <FadeIn delay={0.35} y={20}>
          <p className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug text-[0.75rem] sm:text-[0.9rem] md:text-[1.05rem] lg:text-[1.2rem] max-w-[270px] sm:max-w-[260px] md:max-w-[320px]">
            Spesialis pembuatan website modern, cepat, dan berkonversi tinggi untuk bisnis Anda
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20} className="self-end sm:self-auto">
          <ContactButton onClick={onOpenContact} label="Buat Website Sekarang" />
        </FadeIn>
      </div>
    </section>
  );
};

// ============================================================================
// SECTION 2: MARQUEE SECTION (ETALASE DESAIN WEBSITE)
// ============================================================================

const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  const row1Base = MARQUEE_IMAGES.slice(0, 11);
  const row2Base = MARQUEE_IMAGES.slice(11, 21);

  const row1Images = [...row1Base, ...row1Base, ...row1Base];
  const row2Images = [...row2Base, ...row2Base, ...row2Base];

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const sectionTop = sectionRef.current.offsetTop;
      const calculatedOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setOffset(calculatedOffset);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#0C0C0C] pt-16 sm:pt-28 md:pt-36 pb-10 overflow-hidden w-full"
    >
      <div className="px-5 sm:px-8 md:px-10 mb-6 sm:mb-8 flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-xs sm:text-sm uppercase tracking-[0.2em] text-[#D7E2EA]/60">
          <Globe className="w-4 h-4 text-[#B600A8]" />
          <span> Galeri Eksplorasi Antarmuka & Landing Page Website</span>
        </div>
        <span className="text-[11px] sm:text-xs uppercase tracking-widest text-[#D7E2EA]/40">
          20+ Desain Web Interaktif
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {/* Row 1: Moves RIGHT on scroll */}
        <div
          className="flex gap-3 justify-center"
          style={{
            transform: `translateX(${offset - 200}px)`,
            willChange: 'transform',
          }}
        >
          {row1Images.map((src, index) => (
            <img
              key={`row1-${index}`}
              src={src}
              alt={`Pratinjau Desain Website ${index + 1}`}
              loading="lazy"
              className="w-[260px] h-[170px] sm:w-[340px] sm:h-[220px] md:w-[420px] md:h-[270px] shrink-0 rounded-2xl object-cover select-none border border-[#D7E2EA]/10"
            />
          ))}
        </div>

        {/* Row 2: Moves LEFT on scroll */}
        <div
          className="flex gap-3 justify-center"
          style={{
            transform: `translateX(${-(offset - 200)}px)`,
            willChange: 'transform',
          }}
        >
          {row2Images.map((src, index) => (
            <img
              key={`row2-${index}`}
              src={src}
              alt={`Pratinjau Desain Website ${index + 12}`}
              loading="lazy"
              className="w-[260px] h-[170px] sm:w-[340px] sm:h-[220px] md:w-[420px] md:h-[270px] shrink-0 rounded-2xl object-cover select-none border border-[#D7E2EA]/10"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// SECTION 3: ABOUT SECTION ("TENTANG SAYA")
// ============================================================================

interface AboutSectionProps {
  onOpenContact: () => void;
}

const AboutSection: React.FC<AboutSectionProps> = ({ onOpenContact }) => {
  return (
    <section
      id="about"
      className="min-h-screen relative flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-24 sm:py-28 overflow-hidden"
    >
      {/* Top-Left Decorative 3D Moon Icon */}
      <FadeIn
        delay={0.1}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] left-[2%] sm:left-[3%] md:left-[4%] pointer-events-none select-none z-0 opacity-75 sm:opacity-100"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
          alt="Ikon Dekoratif 1"
          className="w-[70px] sm:w-[130px] md:w-[180px] lg:w-[210px] h-auto object-contain"
        />
      </FadeIn>

      {/* Bottom-Left Decorative 3D Object */}
      <FadeIn
        delay={0.25}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute bottom-[6%] left-[3%] sm:left-[6%] md:left-[10%] pointer-events-none select-none z-0 opacity-75 sm:opacity-100"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
          alt="Ikon Dekoratif 2"
          className="w-[65px] sm:w-[120px] md:w-[160px] lg:w-[180px] h-auto object-contain"
        />
      </FadeIn>

      {/* Top-Right Decorative 3D Lego Icon */}
      <FadeIn
        delay={0.15}
        x={80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] right-[2%] sm:right-[3%] md:right-[4%] pointer-events-none select-none z-0 opacity-75 sm:opacity-100"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
          alt="Ikon Dekoratif 3"
          className="w-[70px] sm:w-[130px] md:w-[180px] lg:w-[210px] h-auto object-contain"
        />
      </FadeIn>

      {/* Bottom-Right Decorative 3D Group */}
      <FadeIn
        delay={0.3}
        x={80}
        y={0}
        duration={0.9}
        className="absolute bottom-[6%] right-[3%] sm:right-[6%] md:right-[10%] pointer-events-none select-none z-0 opacity-75 sm:opacity-100"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
          alt="Ikon Dekoratif 4"
          className="w-[75px] sm:w-[140px] md:w-[190px] lg:w-[220px] h-auto object-contain"
        />
      </FadeIn>

      {/* Center Content */}
      <div className="relative z-10 flex flex-col items-center gap-10 sm:gap-14 md:gap-16 max-w-3xl mx-auto">
        <div className="flex flex-col items-center gap-8 sm:gap-10 md:gap-12">
          <FadeIn delay={0} y={40}>
            <h2
              className="hero-heading font-black uppercase leading-[0.95] tracking-tight text-center select-none"
              style={{ fontSize: 'clamp(2.25rem, 9.5vw, 140px)' }}
            >
              Tentang Saya
            </h2>
          </FadeIn>

          <AnimatedText
            text="Berfokus pada pembuatan website profesional selama lebih dari lima tahun, saya membantu bisnis, brand, dan startup memiliki website yang tidak hanya memukau secara visual, tetapi juga cepat, responsif di semua perangkat, dan mampu mengubah pengunjung menjadi pelanggan. Mari wujudkan website impian bisnis Anda!"
            className="text-base sm:text-lg md:text-xl lg:text-[1.35rem]"
          />

          {/* Quick Credibility Stats Pills for Clients */}
          <FadeIn delay={0.15} y={20}>
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 pt-2">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-[#D7E2EA]/20 text-xs sm:text-sm text-[#D7E2EA]">
                <Globe className="w-4 h-4 text-[#B600A8]" />
                <span>40+ Website Klien Dirilis</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-[#D7E2EA]/20 text-xs sm:text-sm text-[#D7E2EA]">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>99% Skor Performa & SEO</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-[#D7E2EA]/20 text-xs sm:text-sm text-[#D7E2EA]">
                <Smartphone className="w-4 h-4 text-emerald-400" />
                <span>100% Responsif Mobile & Desktop</span>
              </div>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.25} y={20}>
          <ContactButton onClick={onOpenContact} label="Konsultasi Website Gratis" />
        </FadeIn>
      </div>
    </section>
  );
};

// ============================================================================
// SECTION 4: SERVICES SECTION ("LAYANAN WEB")
// ============================================================================

const ServicesSection: React.FC = () => {
  return (
    <section
      id="services"
      className="bg-[#FFFFFF] rounded-t-[32px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-16 sm:py-24 md:py-32 w-full"
    >
      <FadeIn delay={0} y={40}>
        <div className="flex flex-col items-center text-center mb-12 sm:mb-20 md:mb-24">
          <span className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#0C0C0C]/50 font-semibold mb-2">
            Solusi Digital Lengkap untuk Bisnis Anda
          </span>
          <h2
            className="text-[#0C0C0C] font-black uppercase text-center leading-none tracking-tight select-none"
            style={{ fontSize: 'clamp(2.5rem, 10vw, 150px)' }}
          >
            Layanan Web
          </h2>
        </div>
      </FadeIn>

      <div className="max-w-5xl mx-auto">
        {SERVICES_DATA.map((service, i) => (
          <FadeIn key={service.number} delay={i * 0.1} y={30}>
            <div
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-8 md:gap-14 py-7 sm:py-10 md:py-12"
              style={{
                borderBottom: '1px solid rgba(12, 12, 12, 0.15)',
                borderTop: i === 0 ? '1px solid rgba(12, 12, 12, 0.15)' : 'none',
              }}
            >
              <span
                className="font-black text-[#0C0C0C] leading-none shrink-0 select-none sm:w-[140px] md:w-[180px]"
                style={{ fontSize: 'clamp(2.5rem, 8vw, 120px)' }}
              >
                {service.number}
              </span>

              <div className="flex flex-col gap-2 sm:gap-3 w-full">
                <h3
                  className="font-semibold uppercase text-[#0C0C0C] leading-tight"
                  style={{ fontSize: 'clamp(1.15rem, 2.2vw, 2rem)' }}
                >
                  {service.name}
                </h3>
                <p
                  className="font-light leading-relaxed max-w-2xl text-[#0C0C0C]/70"
                  style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.2rem)' }}
                >
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {service.deliverables.map((item) => (
                    <span
                      key={item}
                      className="text-[11px] sm:text-xs font-medium uppercase tracking-wider px-3 py-1 rounded-full bg-[#0C0C0C]/5 text-[#0C0C0C]/80 border border-[#0C0C0C]/15"
                    >
                      ✓ {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

// ============================================================================
// SECTION 5: PROJECTS SECTION ("PORTOFOLIO WEB")
// ============================================================================

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  totalCards: number;
  scrollYProgress: MotionValue<number>;
  onSelectProject: (project: ProjectItem) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  totalCards,
  scrollYProgress,
  onSelectProject,
}) => {
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const rangeStart = index * (1 / totalCards);
  const scale = useTransform(scrollYProgress, [rangeStart, 1], [1, targetScale]);

  return (
    <div className="min-h-[82vh] sm:h-[88vh] sticky top-14 sm:top-20 md:top-24 flex items-start justify-center w-full">
      <motion.div
        style={{
          scale,
          top: `${index * 22}px`,
        }}
        className="relative w-full max-w-6xl mx-auto rounded-[28px] sm:rounded-[44px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 flex flex-col gap-4 sm:gap-5 md:gap-6 origin-top shadow-2xl"
      >
        {/* Top Row: Number, Category + Website Name + Tags, Live Project Button */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 px-1 sm:px-3">
          <div className="flex items-start sm:items-center gap-4 sm:gap-6 md:gap-8">
            <span
              className="font-black text-[#D7E2EA] leading-none select-none shrink-0"
              style={{ fontSize: 'clamp(2.4rem, 6.5vw, 105px)' }}
            >
              {project.number}
            </span>

            <div className="flex flex-col gap-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[#D7E2EA]/70 font-light uppercase tracking-widest text-[0.7rem] sm:text-xs">
                  ({project.category})
                </span>
                <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-400/30">
                  {project.metric}
                </span>
              </div>

              <h3
                className="font-semibold uppercase text-[#D7E2EA] leading-tight"
                style={{ fontSize: 'clamp(1.15rem, 2.3vw, 2.1rem)' }}
              >
                {project.name}
              </h3>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] sm:text-xs uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/5 text-[#D7E2EA]/80 border border-[#D7E2EA]/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="self-start lg:self-center">
            <LiveProjectButton onClick={() => onSelectProject(project)} />
          </div>
        </div>

        {/* Bottom Row: Responsive Website Mockup Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 md:gap-5 w-full">
          {/* Left Column (5 cols on desktop, 2 stacked website screens) */}
          <div className="md:col-span-5 grid grid-cols-2 md:grid-cols-1 gap-3 sm:gap-4 md:gap-5">
            <div
              onClick={() => onSelectProject(project)}
              className="w-full overflow-hidden rounded-[20px] sm:rounded-[32px] md:rounded-[44px] h-[125px] sm:h-[160px] md:h-[185px] lg:h-[205px] cursor-pointer group relative"
            >
              <img
                src={project.col1Image1}
                alt={`${project.name} tampilan halaman 1`}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div
              onClick={() => onSelectProject(project)}
              className="w-full overflow-hidden rounded-[20px] sm:rounded-[32px] md:rounded-[44px] h-[125px] sm:h-[160px] md:h-[235px] lg:h-[275px] cursor-pointer group relative"
            >
              <img
                src={project.col1Image2}
                alt={`${project.name} tampilan halaman 2`}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Right Column (7 cols on desktop, 1 main website showcase image) */}
          <div
            onClick={() => onSelectProject(project)}
            className="md:col-span-7 overflow-hidden rounded-[20px] sm:rounded-[32px] md:rounded-[44px] h-[195px] sm:h-[270px] md:h-[440px] lg:h-[500px] cursor-pointer group relative"
          >
            <img
              src={project.col2Image}
              alt={`${project.name} tampilan utama website`}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-3 right-3 sm:bottom-5 sm:right-5 px-3.5 py-1.5 rounded-full bg-[#0C0C0C]/80 backdrop-blur-md border border-[#D7E2EA]/30 text-[11px] sm:text-xs uppercase tracking-widest text-[#D7E2EA] flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#B600A8]" />
              <span>{project.liveDomain}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
  onOpenContact: (preselectedType?: string) => void;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onSelectProject,
  onOpenContact,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      id="projects"
      className="bg-[#0C0C0C] rounded-t-[32px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-8 sm:-mt-12 md:-mt-14 relative z-10 px-4 sm:px-8 md:px-10 pt-16 sm:pt-24 md:pt-32 pb-16 sm:pb-24 w-full"
    >
      <FadeIn delay={0} y={40}>
        <div className="flex flex-col items-center text-center mb-12 sm:mb-20 md:mb-24">
          <span className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#D7E2EA]/60 mb-2">
            Hasil Karya Website yang Telah Kami Bangun untuk Klien
          </span>
          <h2
            className="hero-heading font-black uppercase text-center leading-none tracking-tight select-none"
            style={{ fontSize: 'clamp(2.25rem, 9.5vw, 145px)' }}
          >
            Portofolio Web
          </h2>
        </div>
      </FadeIn>

      <div ref={containerRef} className="relative flex flex-col gap-10 sm:gap-16 pb-16 sm:pb-24">
        {PROJECTS_DATA.map((project, index) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={index}
            totalCards={PROJECTS_DATA.length}
            scrollYProgress={scrollYProgress}
            onSelectProject={onSelectProject}
          />
        ))}
      </div>

      {/* Footer CTA for Clients Looking to Build a Website */}
      <div className="max-w-6xl mx-auto pt-12 sm:pt-20 border-t border-[#D7E2EA]/15 flex flex-col items-center text-center gap-6 sm:gap-8">
        <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#D7E2EA]/60">
          Ingin Bisnis Anda Memiliki Website Profesional Seperti di Atas?
        </p>
        <h3
          className="hero-heading font-black uppercase leading-[0.95] tracking-tight select-none"
          style={{ fontSize: 'clamp(2rem, 8vw, 110px)' }}
        >
          LOSTA MASTA
        </h3>
        <p className="text-sm sm:text-base md:text-lg text-[#D7E2EA]/75 font-light max-w-xl leading-relaxed px-2">
          Konsultasikan kebutuhan website Anda — mulai dari Landing Page promosi, Company Profile perusahaan, hingga Toko Online E-Commerce siap pakai.
        </p>
        <ContactButton
          onClick={() => onOpenContact()}
          label="Diskusikan Proyek Website Anda"
        />

        <div className="w-full pt-10 mt-6 border-t border-[#D7E2EA]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-[#D7E2EA]/50 font-light">
          <span>© {new Date().getFullYear()} LOSTA MASTA — Spesialis Pembuatan Website.</span>
          <span className="uppercase tracking-widest">Web Design • UI/UX • Full-Stack Development</span>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// INTERACTIVE MODALS (CONTACT/ORDER WEBSITE & CASE STUDY PREVIEW)
// ============================================================================

interface ContactModalProps {
  isOpen: boolean;
  initialWebsiteType?: string;
  onClose: () => void;
}

const WEBSITE_TYPES = [
  'Landing Page Promosi',
  'Company Profile Bisnis',
  'Toko Online / E-Commerce',
  'Custom Web App / Dashboard',
  'Redesign Website Lama',
];

const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  initialWebsiteType = 'Company Profile Bisnis',
  onClose,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [websiteType, setWebsiteType] = useState(initialWebsiteType);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (initialWebsiteType) {
      setWebsiteType(initialWebsiteType);
    }
  }, [initialWebsiteType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setMessage('');
      onClose();
    }, 1800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full max-w-lg rounded-[28px] sm:rounded-[36px] border-2 border-[#D7E2EA]/30 bg-[#0C0C0C] p-6 sm:p-8 text-[#D7E2EA] relative shadow-2xl max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-5 right-5 sm:top-6 sm:right-6 w-10 h-10 rounded-full border border-[#D7E2EA]/30 flex items-center justify-center text-[#D7E2EA] hover:bg-[#D7E2EA]/10 transition-colors cursor-pointer"
              aria-label="Tutup jendela konsultasi"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#B600A8] mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Losta Masta Web Studio</span>
            </div>

            <h3 className="hero-heading font-black uppercase text-2xl sm:text-4xl tracking-tight mb-2">
              Pesan Website Anda
            </h3>
            <p className="text-xs sm:text-sm text-[#D7E2EA]/70 font-light mb-5">
              Pilih jenis website yang Anda butuhkan dan ceritakan profil singkat bisnis Anda.
            </p>

            {submitted ? (
              <div className="py-12 flex flex-col items-center text-center gap-3">
                <div className="w-14 h-14 rounded-full bg-[#B600A8]/20 border border-[#B600A8] flex items-center justify-center text-white">
                  <Check className="w-7 h-7" />
                </div>
                <p className="text-xl font-medium uppercase tracking-wide">
                  Permintaan Terkirim!
                </p>
                <p className="text-sm text-[#D7E2EA]/60 font-light">
                  Terima kasih! Tim Losta Masta akan segera menghubungi Anda beserta estimasi penawaran website.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#D7E2EA]/70 mb-2">
                    Pilih Tipe Website
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {WEBSITE_TYPES.map((type) => {
                      const active = websiteType === type;
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setWebsiteType(type)}
                          className={`text-xs px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                            active
                              ? 'bg-[#B600A8] border-white text-white font-medium'
                              : 'bg-white/5 border-[#D7E2EA]/20 text-[#D7E2EA]/70 hover:border-[#D7E2EA]/50'
                          }`}
                        >
                          {type}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#D7E2EA]/70 mb-1.5">
                    Nama Anda / Nama Brand
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Budi — PT Maju Jaya"
                    className="w-full rounded-2xl bg-white/5 border border-[#D7E2EA]/20 px-4 py-3 text-sm text-white placeholder-[#D7E2EA]/30 focus:outline-none focus:border-[#B600A8]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#D7E2EA]/70 mb-1.5">
                    Email atau Nomor WhatsApp
                  </label>
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="0812xxxx atau email@bisnis.com"
                    className="w-full rounded-2xl bg-white/5 border border-[#D7E2EA]/20 px-4 py-3 text-sm text-white placeholder-[#D7E2EA]/30 focus:outline-none focus:border-[#B600A8]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#D7E2EA]/70 mb-1.5">
                    Kebutuhan Fitur Website
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Contoh: Saya ingin buat website katalog produk beserta tombol order ke WhatsApp dan halaman profil perusahaan..."
                    className="w-full rounded-2xl bg-white/5 border border-[#D7E2EA]/20 px-4 py-3 text-sm text-white placeholder-[#D7E2EA]/30 focus:outline-none focus:border-[#B600A8] resize-none"
                  />
                </div>
                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="rounded-full text-white font-medium uppercase tracking-widest px-8 py-3.5 text-xs sm:text-sm transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
                    style={{
                      background:
                        'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                      boxShadow:
                        '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
                      outline: '2px solid white',
                      outlineOffset: '-3px',
                    }}
                  >
                    <Mail className="w-4 h-4" />
                    Kirim Permintaan
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onOrderSimilar: (category: string) => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onOrderSimilar,
}) => {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 24 }}
            className="w-full max-w-4xl rounded-[28px] sm:rounded-[40px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-5 sm:p-8 text-[#D7E2EA] relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 mb-5 sm:mb-6">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/60">
                    Portofolio Web {project.number} • {project.category}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-400/30">
                    {project.metric}
                  </span>
                </div>
                <h3 className="text-xl sm:text-4xl font-black uppercase text-[#D7E2EA]">
                  {project.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#D7E2EA]/60 mt-0.5">
                  Klien: {project.clientType} • Domain: <span className="text-white underline">{project.liveDomain}</span>
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-[#D7E2EA] flex items-center justify-center text-[#D7E2EA] hover:bg-[#D7E2EA]/10 transition-colors cursor-pointer shrink-0"
                aria-label="Tutup pratinjau proyek"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <img
                src={project.col2Image}
                alt={project.name}
                className="w-full h-56 sm:h-80 object-cover rounded-[20px] sm:rounded-[28px] sm:col-span-2 border border-[#D7E2EA]/15"
              />
              <img
                src={project.col1Image1}
                alt={`${project.name} detail halaman 1`}
                className="w-full h-44 sm:h-52 object-cover rounded-[20px] sm:rounded-[28px] border border-[#D7E2EA]/15"
              />
              <img
                src={project.col1Image2}
                alt={`${project.name} detail halaman 2`}
                className="w-full h-44 sm:h-52 object-cover rounded-[20px] sm:rounded-[28px] border border-[#D7E2EA]/15"
              />
            </div>

            {/* Website Deliverables & Features Breakdown */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 sm:p-5 rounded-3xl bg-white/5 border border-[#D7E2EA]/15">
              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#B600A8] font-semibold mb-2">
                  <Layers className="w-4 h-4" />
                  <span>Halaman & Fitur yang Dibangun</span>
                </div>
                <ul className="space-y-1.5">
                  {project.pagesBuilt.map((page) => (
                    <li key={page} className="flex items-center gap-2 text-xs sm:text-sm text-[#D7E2EA]/85 font-light">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{page}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#B600A8] font-semibold mb-2">
                  <Zap className="w-4 h-4" />
                  <span>Tentang Proyek Website Ini</span>
                </div>
                <p className="text-xs sm:text-sm text-[#D7E2EA]/75 font-light leading-relaxed mb-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/50 text-[#D7E2EA] border border-[#D7E2EA]/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#D7E2EA]/15">
              <p className="text-xs sm:text-sm text-[#D7E2EA]/70 font-light">
                Tertarik membuat website seperti <strong>{project.name}</strong> untuk bisnis Anda?
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full border border-[#D7E2EA]/40 text-[#D7E2EA] px-5 py-2.5 text-xs uppercase tracking-widest hover:bg-[#D7E2EA]/10 transition-colors cursor-pointer"
                >
                  Tutup
                </button>
                <ContactButton
                  label="Pesan Website Serupa"
                  onClick={() => {
                    const category = project.category;
                    onClose();
                    onOrderSimilar(category);
                  }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ============================================================================
// MAIN APP COMPONENT
// ============================================================================

export function App() {
  const [contactOpen, setContactOpen] = useState(false);
  const [selectedWebsiteType, setSelectedWebsiteType] = useState<string>('Company Profile Bisnis');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  useEffect(() => {
    document.title = 'LOSTA MASTA — Jasa Pembuatan Website & Web Developer';
  }, []);

  const handleOpenContact = (preselectedType?: string) => {
    if (preselectedType) {
      setSelectedWebsiteType(preselectedType);
    }
    setContactOpen(true);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700;800;900&display=swap');

        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html, body, #root {
          background-color: #0C0C0C;
          font-family: 'Kanit', sans-serif;
          color: #D7E2EA;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .hero-heading {
          background: linear-gradient(180deg, #646973 0%, #BBCCD7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      <div
        className="min-h-screen w-full bg-[#0C0C0C] text-[#D7E2EA]"
        style={{
          overflowX: 'clip',
          fontFamily: "'Kanit', sans-serif",
        }}
      >
        <HeroSection onOpenContact={() => handleOpenContact()} />
        <MarqueeSection />
        <AboutSection onOpenContact={() => handleOpenContact()} />
        <ServicesSection />
        <ProjectsSection
          onSelectProject={(proj) => setActiveProject(proj)}
          onOpenContact={(type) => handleOpenContact(type)}
        />
      </div>

      <ContactModal
        isOpen={contactOpen}
        initialWebsiteType={selectedWebsiteType}
        onClose={() => setContactOpen(false)}
      />
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onOrderSimilar={(category) => handleOpenContact(category)}
      />
    </>
  );
}

export default App;