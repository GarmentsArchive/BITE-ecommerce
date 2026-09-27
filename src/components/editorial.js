/**
 * BITE — Editorial Spread Renderer
 *
 * Emits the DOM that editorial.css's layout variants target: the
 * image wrap and the content block are DIRECT children of the
 * spread, so each variant can place them in its own grid cells.
 *
 * Beyond the single hero picture, a spread may carry a PLATE — a
 * group of product-in-hand shots arranged as a diptych, triptych or
 * proof sheet, or a small inset the copy wraps around. Plates are
 * what make the page read as print rather than as a product listing.
 *
 * Copy is rendered at one of three densities (see data/editorial.js).
 * A 'sparse' spread deliberately gets almost no text.
 */

import { initInlineFrameSequence } from './frame-sequence.js';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LAYOUTS = new Set([
  'center-offset', 'right-heavy', 'full-bleed',
  'minimal', 'asymmetric', 'type-behind', 'reverse',
]);

const PLATE_TYPES = new Set(['single', 'diptych', 'triptych', 'contact', 'inset']);

/** Layouts that put the nav over a dark background. */
const DARK_LAYOUTS = new Set(['full-bleed']);

function esc(str) {
  return String(str ?? '').replace(/[&<>"']/g, c => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

/* ── Media ──────────────────────────────────────────────────── */

function mediaMarkup(story) {
  const media = story.media || 'image';

  if (media === 'video' && story.video) {
    return `
      <video
        class="editorial-spread__image editorial-spread__video"
        data-src="${esc(story.video)}"
        ${story.poster ? `poster="${esc(story.poster)}"` : ''}
        muted loop playsinline preload="none"
        aria-label="${esc(story.title)} — editorial film"
      ></video>`;
  }

  if (media === 'frames' && story.frameSequence) {
    return `<div class="editorial-spread__frames" data-sequence="${esc(story.frameSequence)}"></div>`;
  }

  return `
    <img
      class="editorial-spread__image img-lazy"
      data-src="${esc(story.image)}"
      alt="${esc(story.alt || `${story.title} — BITE editorial`)}"
      loading="lazy" decoding="async"
    />`;
}

/* ── Plates ─────────────────────────────────────────────────── */

/**
 * One photograph in a plate, with its hung caption.
 * `fig` is the running figure number across the whole run.
 */
function plateFigure(image, fig) {
  return `
    <figure class="plate__item">
      <div class="plate__frame">
        <img class="plate__image img-lazy"
             data-src="${esc(image.src)}"
             alt="${esc(image.caption || 'BITE product photograph')}"
             loading="lazy" decoding="async" />
      </div>
      ${image.caption ? `
        <figcaption class="plate__caption">
          <span class="plate__fig">fig. ${String(fig).padStart(2, '0')}</span>
          ${esc(image.caption)}
        </figcaption>` : ''}
    </figure>`;
}

/**
 * Diptych, triptych and contact sheets run as a full-width band
 * beneath the main composition — the newspaper photo strip.
 * 'single' and 'inset' are placed within the composition instead.
 */
function plateBandMarkup(story, figStart) {
  const plate = story.plate;
  if (!plate || !PLATE_TYPES.has(plate.type)) return '';
  if (plate.type === 'inset') return '';

  const modifier = plate.type;
  const items = plate.images
    .map((img, i) => plateFigure(img, figStart + i))
    .join('');

  return `
    <div class="plate plate--${modifier}">
      ${items}
    </div>`;
}

/** The inset plate lives inside the copy, with text flowing round it. */
function insetMarkup(story, fig) {
  const plate = story.plate;
  if (!plate || plate.type !== 'inset' || !plate.images.length) return '';
  return plateFigure(plate.images[0], fig).replace(
    'class="plate__item"',
    'class="plate__item plate__item--inset"'
  );
}

/* ── Copy ───────────────────────────────────────────────────── */

/**
 * Density decides how much the reader is given.
 *   sparse   — nothing but the furniture above it
 *   standard — one caption-length line
 *   dense    — a standfirst set in columns, plus a pull quote
 */
function copyMarkup(story, fig) {
  const density = story.density || 'standard';
  if (density === 'sparse') return '';

  if (density === 'standard') {
    return story.description
      ? `<p class="editorial-spread__description">${esc(story.description)}</p>`
      : '';
  }

  // dense
  const columns = story.columns || 2;
  const inset = insetMarkup(story, fig);

  return `
    <div class="editorial-spread__body editorial-spread__body--cols-${columns}">
      ${inset}
      <p class="editorial-spread__standfirst${story.dropCap ? ' has-drop-cap' : ''}">
        ${esc(story.standfirst)}
      </p>
      ${story.pullQuote ? `
        <blockquote class="editorial-spread__pull">${esc(story.pullQuote)}</blockquote>` : ''}
    </div>
    ${story.marginalia ? `
      <p class="editorial-spread__marginalia">${esc(story.marginalia)}</p>` : ''}`;
}

/* ── Spread ─────────────────────────────────────────────────── */

function spreadMarkup(story, index, total, figStart) {
  const layout = LAYOUTS.has(story.layout) ? story.layout : 'center-offset';
  const density = story.density || 'standard';
  const num = String(story.number || index + 1).padStart(2, '0');
  const tot = String(total).padStart(2, '0');
  const isDark = DARK_LAYOUTS.has(layout);

  const backdrop = layout === 'type-behind'
    ? `<div class="editorial-spread__backdrop" aria-hidden="true">${esc(story.title)}</div>`
    : '';

  // A standard-density spread with wrap:true still gets its inset,
  // even though it has no multi-column body to float it inside.
  const insetInline = (story.wrap && story.plate?.type === 'inset')
    ? insetMarkup(story, figStart)
    : '';

  const figAfterInset = figStart + (story.plate?.type === 'inset' ? 1 : 0);

  return `
    <article
      class="editorial-spread editorial-spread--${layout} editorial-spread--${density} editorial-spread--tall"
      id="story-${esc(story.id)}"
      ${story.swatch ? `style="--spread-swatch: ${esc(story.swatch)}"` : ''}
      ${isDark ? 'data-nav-theme="light"' : ''}
      data-spread-index="${index}"
    >
      ${backdrop}

      <figure class="editorial-spread__image-wrap">
        ${mediaMarkup(story)}
      </figure>

      <div class="editorial-spread__content">
        <span class="editorial-spread__swatch" aria-hidden="true"></span>
        ${story.kicker ? `<p class="editorial-spread__kicker">${esc(story.kicker)}</p>` : ''}
        <div class="editorial-spread__index" aria-hidden="true">${num} / ${tot}</div>
        ${story.category ? `<div class="editorial-spread__category">${esc(story.category)}</div>` : ''}
        <h2 class="editorial-spread__title">${esc(story.title)}</h2>
        ${story.subtitle ? `<h3 class="editorial-spread__subtitle">${esc(story.subtitle)}</h3>` : ''}
        ${story.wrap ? insetInline : ''}
        ${copyMarkup(story, figStart)}
        <div class="editorial-spread__footer">
          ${story.price ? `<span class="editorial-spread__price">${esc(story.price)}</span>` : ''}
          <a class="editorial-spread__cta" href="#/product/${esc(story.productId)}">${esc(story.cta || `Shop ${story.title}`)}</a>
        </div>
      </div>

      ${plateBandMarkup(story, figAfterInset)}

      <p class="editorial-spread__folio" aria-hidden="true">BITE — ISSUE 01 — ${num}</p>
    </article>`;
}

/* ── Media lifecycle ────────────────────────────────────────── */

function initVideos(root, teardown) {
  const videos = root.querySelectorAll('.editorial-spread__video');
  if (!videos.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const video = entry.target;
      if (entry.isIntersecting) {
        if (!video.src && video.dataset.src) {
          video.src = video.dataset.src;
          video.removeAttribute('data-src');
        }
        video.play()
          .then(() => video.classList.add('loaded'))
          .catch(() => video.classList.add('loaded')); // poster stands in
      } else if (!video.paused) {
        video.pause();
      }
    });
  }, { rootMargin: '200px 0px', threshold: 0.15 });

  videos.forEach(v => io.observe(v));
  teardown.push(() => io.disconnect());
}

/**
 * Type settles into each spread as it arrives — a short stagger,
 * once, never replayed. clearProps afterwards so no inline
 * transform is left behind to become a containing block.
 */
function initReveals(root, teardown) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  root.querySelectorAll('.editorial-spread').forEach(spread => {
    const targets = [
      ...spread.querySelectorAll('.editorial-spread__content > *'),
      ...spread.querySelectorAll('.plate__item'),
    ];
    if (!targets.length) return;

    const tween = gsap.from(targets, {
      y: 18,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.055,
      clearProps: 'transform,opacity',
      scrollTrigger: {
        trigger: spread,
        start: 'top 78%',
        once: true,
      },
    });

    teardown.push(() => {
      tween.scrollTrigger?.kill();
      tween.kill();
    });
  });
}

function initFrames(root, teardown) {
  root.querySelectorAll('.editorial-spread__frames').forEach(host => {
    const key = host.dataset.sequence;
    if (!key) return;
    const dispose = initInlineFrameSequence(host, key);
    if (dispose) teardown.push(dispose);
  });
}

/**
 * Render a run of editorial spreads.
 *
 * @param {HTMLElement} container
 * @param {Array} stories
 * @param {Object} [opts]
 * @param {boolean} [opts.showOutro=true]
 * @returns {Function} teardown
 */
export function renderEditorialSection(container, stories, opts = {}) {
  const { showOutro = true } = opts;
  const total = stories.length;

  // Figure numbers run continuously across the whole issue.
  let fig = 1;
  const spreads = stories.map((story, i) => {
    const html = spreadMarkup(story, i, total, fig);
    fig += story.plate?.images?.length || 0;
    return html;
  }).join('');

  const outro = showOutro ? `
    <section class="collection-transition" id="the-collection">
      <div class="collection-transition__rule" aria-hidden="true"></div>
      <p class="collection-transition__eyebrow type-meta">END OF EDITORIAL</p>
      <h2 class="collection-transition__title">THE COLLECTION</h2>
      <p class="collection-transition__meta type-meta">ISSUE 01 &middot; ${total} PRODUCTS</p>
      <a href="#/store" class="collection-transition__cta">ENTER THE STORE</a>
    </section>` : '';

  container.innerHTML = `<div class="editorial-section">${spreads}${outro}</div>`;

  const teardown = [];
  initVideos(container, teardown);
  initFrames(container, teardown);
  initReveals(container, teardown);

  return () => teardown.forEach(fn => { try { fn(); } catch (e) { /* already gone */ } });
}
