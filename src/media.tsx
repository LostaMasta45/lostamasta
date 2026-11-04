import { useEffect, useRef, type ImgHTMLAttributes } from 'react';
import manifest from './media-manifest.json';

type ImageVariant = { url: string; width: number; height: number; bytes: number };
type MediaAsset = { source: string; variants?: ImageVariant[]; poster?: ImageVariant; video?: string };
const assets = new Map((manifest as MediaAsset[]).map((asset) => [asset.source, asset]));

export function LocalImage({ src, sizes, loading = 'lazy', ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const asset = assets.get(src ?? '');
  const variants = asset?.variants;
  const largest = variants?.at(-1);
  return (
    <img
      {...props}
      src={largest?.url ?? src}
      srcSet={variants?.map((image) => `${image.url} ${image.width}w`).join(', ')}
      sizes={sizes ?? '(min-width: 1024px) 525px, (min-width: 768px) 50vw, 100vw'}
      width={props.width ?? largest?.width}
      height={props.height ?? largest?.height}
      loading={loading}
      decoding="async"
    />
  );
}

export function GalleryVideo({ src, label }: { src: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const asset = assets.get(src);

  useEffect(() => {
    const video = ref.current?.querySelector('video');
    if (!video || !asset?.video || !asset.poster) return;
    const videoUrl = asset.video;
    const posterUrl = asset.poster.url;
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    const syncPlayback = () => {
      if (visible && !document.hidden && !reducedMotion.matches) {
        if (!video.getAttribute('src')) video.src = videoUrl;
        void video.play().catch(() => { /* The poster stays visible if autoplay is unavailable. */ });
      } else {
        video.pause();
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      const poster = ref.current?.querySelector('img');
      if (visible && poster && !poster.getAttribute('src')) poster.src = posterUrl;
      syncPlayback();
    }, { threshold: 0.05 });
    observer.observe(video);
    document.addEventListener('visibilitychange', syncPlayback);
    reducedMotion.addEventListener('change', syncPlayback);
    return () => {
      observer.disconnect();
      video.pause();
      document.removeEventListener('visibilitychange', syncPlayback);
      reducedMotion.removeEventListener('change', syncPlayback);
    };
  }, [asset]);

  return (
    <div ref={ref} className="relative w-[260px] h-[170px] sm:w-[340px] sm:h-[220px] md:w-[420px] md:h-[270px] shrink-0 rounded-2xl overflow-hidden select-none border border-[#D7E2EA]/10 bg-[#151515]">
      <img alt={label} width={640} height={411} decoding="async" className="absolute inset-0 w-full h-full object-cover" />
      <video
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        onError={(event) => { event.currentTarget.style.visibility = 'hidden'; }}
      />
    </div>
  );
}
