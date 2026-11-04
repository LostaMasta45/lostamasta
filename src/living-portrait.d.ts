export function initLivingPortrait(
  root: HTMLElement,
  options?: {
    isPaused?: () => boolean;
    images?: { rest: string; left: string; right: string } & Partial<Record<'winkl' | 'puff' | 'grin' | 'raised' | 'smug', string>>;
  },
): () => void;
