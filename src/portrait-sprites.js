// Paged WebP frames retain GIF timing while sharing the existing elastic mesh.
// Only requested pages reach the GPU; at most six pages remain resident.
export function createPortraitSprites(gl, animations, isDisposed) {
  const pages = new Map(), pending = new Map(), failed = new Set(), starts = new Map();
  let used = new Set();
  const ensure = async page => {
    if (pages.has(page.src)) return pages.get(page.src);
    if (pending.has(page.src)) return pending.get(page.src);
    if (failed.has(page.src) || isDisposed()) return null;
    const job = (async () => {
      const image = new Image();
      image.decoding = 'async'; image.src = page.src;
      try {
        await image.decode();
        if (isDisposed()) return null;
        const texture = gl.createTexture();
        gl.activeTexture(gl.TEXTURE5); gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        const entry = { texture, touched: performance.now() };
        pages.set(page.src, entry);
        return entry;
      } catch {
        failed.add(page.src);
        return null;
      } finally { pending.delete(page.src); }
    })();
    pending.set(page.src, job);
    return job;
  };
  const ready = name => animations[name] ? ensure(animations[name].pages[0]) : Promise.resolve(null);
  return {
    ready,
    begin(name, now) { starts.set(name, now); void ready(name); },
    beginFrame() { used = new Set(); },
    frame(name, now) {
      const clip = animations[name];
      if (!clip) return null;
      const elapsed = Math.max(0, now - (starts.get(name) ?? now));
      let index = 0, end = clip.durations[0];
      while (index < clip.durations.length - 1 && elapsed >= end) end += clip.durations[++index];
      const pageIndex = clip.pages.findIndex(page => index >= page.first && index < page.first + page.count);
      const page = clip.pages[pageIndex];
      const entry = pages.get(page.src);
      if (!entry) { void ensure(page); return null; }
      used.add(page.src); entry.touched = now;
      // Start fetching the next page before crossing its boundary.
      if (clip.pages[pageIndex + 1] && page.first + page.count - index <= 3) void ensure(clip.pages[pageIndex + 1]);
      const cell = index - page.first, size = clip.cellSize;
      const width = page.columns * size, height = page.rows * size;
      return { texture: entry.texture, rect: [
        ((cell % page.columns) * size + .5) / width,
        (Math.floor(cell / page.columns) * size + .5) / height,
        (size - 1) / width, (size - 1) / height,
      ] };
    },
    trim() {
      if (pages.size <= 6) return;
      const candidates = [...pages].filter(([key]) => !used.has(key)).sort((a, b) => a[1].touched - b[1].touched);
      for (const [key, entry] of candidates) {
        if (pages.size <= 6) break;
        gl.deleteTexture(entry.texture); pages.delete(key);
      }
    },
    cleanup() { for (const entry of pages.values()) gl.deleteTexture(entry.texture); pages.clear(); },
  };
}
