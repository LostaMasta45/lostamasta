export function initLivingPortrait(
  root: HTMLElement,
  options?: {
    isPaused?: () => boolean;
    images?: { rest: string; left: string; right: string } & Partial<Record<'winkl' | 'puff' | 'grin' | 'raised' | 'smug', string>>;
    portrait?: {
      stills: Record<string, string>;
      rotation: string[];
      animations: Record<string, {
        poster: string;
        duration: number;
        durations: number[];
        cellSize: number;
        pages: { src: string; first: number; count: number; columns: number; rows: number }[];
      }>;
    };
  },
): () => void;
