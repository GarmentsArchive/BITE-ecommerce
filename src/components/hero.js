/**
 * BITE — The Cover
 *
 * The photograph is left alone: no text is baked into it and no flat
 * scrim is laid over the whole frame. Every word here is real HTML,
 * positioned around the model rather than on top of her.
 */

import { ASSETS } from '../data/assets.js';

export function renderHero(container) {
  container.innerHTML = `
    <section class="hero" data-nav-theme="light">
      <img
        class="hero__image"
        src="${ASSETS.header.hero}"
        alt="BITE Kush Lip Oil in Cherry, held to camera"
        fetchpriority="high"
        decoding="async"
      />
      <div class="hero__scrim" aria-hidden="true"></div>

      <div class="hero__content">
        <div class="hero__masthead">
          <h1 class="hero__brand">BITE</h1>
          <p class="hero__slogan">
            Juicy colour.<br />High shine.<br /><em>Addictive.</em>
          </p>
        </div>

        <p class="hero__issue type-meta">ISSUE 01</p>

        <nav class="hero__actions" aria-label="Enter the magazine">
          <a href="#/editorial" class="hero__action">Browse Editorial</a>
          <a href="#/store" class="hero__action">Visit Store</a>
        </nav>

        <p class="hero__place type-meta">CAPE TOWN</p>

        <button class="hero__cue" type="button" aria-label="Scroll to the editorial">
          <span class="hero__cue-rule"></span>
        </button>
      </div>
    </section>
  `;

  // The cue simply continues the scroll the reader would have made.
  const cue = container.querySelector('.hero__cue');
  const hero = container.querySelector('.hero');
  cue?.addEventListener('click', () => {
    window.scrollTo({
      top: hero.offsetHeight,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
  });
}
