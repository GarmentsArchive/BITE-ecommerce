/**
 * BITE — Editorial
 *
 * The full run of spreads, with two pinned frame sequences held
 * between them. Everything below the masthead loads as the reader
 * approaches it.
 */

import { renderEditorialSection } from '../components/editorial.js';
import { initPinnedFrameSequence } from '../components/frame-sequence.js';
import { EDITORIAL_EXTENDED, PINNED_MOMENTS } from '../data/editorial.js';
import { lazyLoadImages } from '../utils/lazy-load.js';
import { registerTeardown } from '../utils/animations.js';

export function renderEditorial(container) {
  container.innerHTML = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'editorial-page';

  wrapper.innerHTML = `
    <header class="editorial-masthead">
      <div class="editorial-masthead__meta type-meta">
        <span>BITE BEAUTY</span>
        <span>ISSUE 01</span>
        <span>CAPE TOWN</span>
      </div>
      <h1 class="editorial-masthead__title">EDITORIAL</h1>
      <p class="editorial-masthead__standfirst">
        Nine fruits. Nine shades. Nine stories of colour, skin and light.
      </p>
    </header>
  `;

  const spreads = document.createElement('div');
  wrapper.appendChild(spreads);
  container.appendChild(wrapper);

  registerTeardown(renderEditorialSection(spreads, EDITORIAL_EXTENDED));

  // Hold a couple of sequences full-frame, between spreads.
  PINNED_MOMENTS.forEach(moment => {
    const anchor = spreads.querySelector(`#story-${moment.after}`);
    if (!anchor) return;
    const host = document.createElement('section');
    host.className = 'frame-sequence-host';
    host.setAttribute('data-nav-theme', 'light');
    anchor.insertAdjacentElement('afterend', host);
    registerTeardown(
      initPinnedFrameSequence(host, moment.sequence, { caption: moment.caption })
    );
  });

  lazyLoadImages(container);
}
