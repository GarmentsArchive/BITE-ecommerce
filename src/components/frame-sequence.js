/**
 * BITE — Scroll-driven frame sequences
 *
 * Two flavours:
 *   initInlineFrameSequence — the sequence lives inside a spread's
 *     picture frame and is scrubbed by that spread's own travel
 *     through the viewport. Costs the reader no extra scrolling.
 *   initPinnedFrameSequence — a full-viewport pinned moment. Used
 *     sparingly; a magazine has a few of these, not twelve.
 *
 * Both load frames only as the reader approaches, a few at a time,
 * so no page ever requests 480 photographs at once.
 */

import { ASSETS, getFramePath } from '../data/assets.js';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MAX_PARALLEL_REQUESTS = 6;
const PREFETCH_MARGIN = '700px 0px';

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Load a sequence in order, a few images at a time.
 * @returns {{frames: HTMLImageElement[], cancel: Function}}
 */
function loadSequence(sequenceKey, frameCount, onFirstFrame) {
  const frames = new Array(frameCount);
  let next = 0;
  let active = 0;
  let cancelled = false;
  let announced = false;

  const pump = () => {
    while (!cancelled && active < MAX_PARALLEL_REQUESTS && next < frameCount) {
      const i = next++;
      active++;
      const img = new Image();
      img.decoding = 'async';
      img.onload = () => {
        active--;
        frames[i] = img;
        if (!announced) {
          announced = true;
          onFirstFrame?.();
        }
        pump();
      };
      img.onerror = () => {
        active--;
        pump();
      };
      img.src = getFramePath(sequenceKey, i + 1);
    }
  };

  pump();

  return {
    frames,
    cancel() { cancelled = true; },
  };
}

/** Draw an image into the canvas with object-fit: cover semantics. */
function drawCover(ctx, img, width, height) {
  const scale = Math.max(width / img.width, height / img.height);
  const w = img.width * scale;
  const h = img.height * scale;
  ctx.drawImage(img, (width - w) / 2, (height - h) / 2, w, h);
}

function createCanvas(host) {
  const canvas = document.createElement('canvas');
  canvas.className = 'frame-sequence__canvas';
  host.appendChild(canvas);
  const ctx = canvas.getContext('2d', { alpha: false });
  return { canvas, ctx };
}

/**
 * Size the backing store to the element's real pixel size, capped
 * so we never allocate an absurd buffer on high-DPR displays.
 */
function sizeCanvas(canvas, host) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const rect = host.getBoundingClientRect();
  const w = Math.max(1, Math.round(rect.width * dpr));
  const h = Math.max(1, Math.round(rect.height * dpr));
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w;
    canvas.height = h;
    return true;
  }
  return false;
}

/**
 * Scrub a frame sequence with the host element's travel through the
 * viewport. No pin, no added page height.
 *
 * @param {HTMLElement} host
 * @param {string} sequenceKey key into ASSETS.frames
 * @returns {Function} dispose
 */
export function initInlineFrameSequence(host, sequenceKey, opts = {}) {
  const meta = ASSETS.frames[sequenceKey];
  if (!meta) {
    console.warn(`[BITE] unknown frame sequence "${sequenceKey}"`);
    return null;
  }

  const frameCount = opts.frameCount || meta.count;
  const { canvas, ctx } = createCanvas(host);

  let loader = null;
  let trigger = null;
  let current = -1;
  const state = { frame: 0 };

  const render = (force = false) => {
    if (!loader) return;
    const idx = Math.max(0, Math.min(frameCount - 1, Math.round(state.frame)));
    if (idx === current && !force) return;

    // Hold the last decoded frame rather than flashing an empty canvas.
    let img = loader.frames[idx];
    if (!img) {
      for (let back = idx; back >= 0; back--) {
        if (loader.frames[back]) { img = loader.frames[back]; break; }
      }
    }
    if (!img) return;

    current = idx;
    drawCover(ctx, img, canvas.width, canvas.height);
  };

  const start = () => {
    if (loader) return;
    loader = loadSequence(sequenceKey, frameCount, () => {
      sizeCanvas(canvas, host);
      host.classList.add('is-ready');
      render(true);
    });

    if (prefersReducedMotion()) return;

    trigger = ScrollTrigger.create({
      trigger: host,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 0.5, // smooths the stepping without softening the frames
      animation: gsap.to(state, {
        frame: frameCount - 1,
        ease: 'none',
        onUpdate: () => render(),
      }),
    });
  };

  const io = new IntersectionObserver((entries) => {
    if (entries.some(e => e.isIntersecting)) {
      start();
      io.disconnect();
    }
  }, { rootMargin: PREFETCH_MARGIN });

  io.observe(host);

  const ro = new ResizeObserver(() => {
    if (sizeCanvas(canvas, host)) render(true);
  });
  ro.observe(host);

  return () => {
    io.disconnect();
    ro.disconnect();
    trigger?.kill();
    loader?.cancel();
    canvas.remove();
  };
}

/**
 * A pinned, full-viewport sequence. `scrollLength` is deliberately
 * short — the reader should move through the photographs, not wade.
 *
 * @returns {Function} dispose
 */
export function initPinnedFrameSequence(container, sequenceKey, opts = {}) {
  const meta = ASSETS.frames[sequenceKey];
  if (!meta) {
    console.warn(`[BITE] unknown frame sequence "${sequenceKey}"`);
    return null;
  }

  const frameCount = opts.frameCount || meta.count;
  const scrollLength = opts.scrollLength || '+=100%';

  container.classList.add('frame-sequence');
  container.innerHTML = `
    <div class="frame-sequence__stage">
      ${opts.caption ? `<figcaption class="frame-sequence__caption type-meta">${opts.caption}</figcaption>` : ''}
    </div>`;

  const stage = container.querySelector('.frame-sequence__stage');
  const { canvas, ctx } = createCanvas(stage);

  let loader = null;
  let trigger = null;
  let current = -1;
  const state = { frame: 0 };

  const render = (force = false) => {
    if (!loader) return;
    const idx = Math.max(0, Math.min(frameCount - 1, Math.round(state.frame)));
    if (idx === current && !force) return;
    let img = loader.frames[idx];
    if (!img) {
      for (let back = idx; back >= 0; back--) {
        if (loader.frames[back]) { img = loader.frames[back]; break; }
      }
    }
    if (!img) return;
    current = idx;
    drawCover(ctx, img, canvas.width, canvas.height);
  };

  const start = () => {
    if (loader) return;
    loader = loadSequence(sequenceKey, frameCount, () => {
      sizeCanvas(canvas, stage);
      container.classList.add('is-ready');
      render(true);
    });

    if (prefersReducedMotion()) return;

    trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: scrollLength,
      pin: true,
      pinSpacing: true,
      scrub: 0.5,
      animation: gsap.to(state, {
        frame: frameCount - 1,
        ease: 'none',
        onUpdate: () => render(),
      }),
    });
  };

  const io = new IntersectionObserver((entries) => {
    if (entries.some(e => e.isIntersecting)) {
      start();
      io.disconnect();
    }
  }, { rootMargin: PREFETCH_MARGIN });

  io.observe(container);

  const ro = new ResizeObserver(() => {
    if (sizeCanvas(canvas, stage)) render(true);
  });
  ro.observe(stage);

  return () => {
    io.disconnect();
    ro.disconnect();
    trigger?.kill();
    loader?.cancel();
  };
}

/** Back-compat with the original call signature. */
export const initFrameSequence = initPinnedFrameSequence;
