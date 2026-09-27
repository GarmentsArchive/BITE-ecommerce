/**
 * BITE — Navigation
 *
 * Minimal by design: the wordmark, two destinations, and the bag.
 *
 * The bar has to stay legible over a burgundy spread and over ivory
 * paper, so it tracks which sections are currently passing beneath
 * it. Sections that need light type mark themselves with
 * data-nav-theme="light"; the bar keeps a live count of them rather
 * than toggling on whichever entry fired last.
 */

import { cartStore } from '../store.js';
import { openCart } from './cart.js';

const NAV_HEIGHT = 56;

export function renderNav(container) {
  container.innerHTML = `
    <nav class="main-nav" aria-label="Primary">
      <div class="main-nav__inner">
        <a href="#/" class="main-nav__logo" aria-label="BITE — home">BITE</a>
        <div class="main-nav__links">
          <a href="#/editorial" class="main-nav__link type-meta">EDITORIAL</a>
          <a href="#/store" class="main-nav__link type-meta">STORE</a>
          <button id="nav-bag" class="main-nav__bag type-meta" aria-label="Open your bag">BAG</button>
        </div>
      </div>
    </nav>
  `;

  const nav = container.querySelector('.main-nav');
  const bagBtn = container.querySelector('#nav-bag');

  bagBtn.addEventListener('click', () => openCart());

  /* ── Bag count ─────────────────────────────────────────── */
  const paintBag = () => {
    const count = cartStore.getCount();
    bagBtn.textContent = count > 0 ? `BAG (${count})` : 'BAG';
    bagBtn.classList.toggle('main-nav__bag--filled', count > 0);
  };
  paintBag();
  cartStore.subscribe(paintBag);

  /* ── Plate on scroll ───────────────────────────────────── */
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      nav.classList.toggle('main-nav--plate', window.scrollY > 80);
      ticking = false;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Legibility over dark sections ─────────────────────── */

  // Every dark section currently under the bar. A Set, because two
  // sections can overlap the bar during a transition and the bar
  // must not flip back to dark type while either is still there.
  const darkSections = new Set();

  const applyTheme = () => {
    nav.classList.toggle('main-nav--over-dark', darkSections.size > 0);
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) darkSections.add(entry.target);
      else darkSections.delete(entry.target);
    });
    applyTheme();
  }, {
    // Collapse the viewport to the strip the bar occupies, so a
    // section counts only while it is actually behind the bar.
    rootMargin: `0px 0px -${Math.max(0, window.innerHeight - NAV_HEIGHT)}px 0px`,
    threshold: 0,
  });

  const watched = new WeakSet();
  const scan = (root = document) => {
    root.querySelectorAll?.('[data-nav-theme="light"]').forEach(el => {
      if (watched.has(el)) return;
      watched.add(el);
      sectionObserver.observe(el);
    });
  };

  const pageContent = document.getElementById('page-content');

  // Routes swap page content wholesale; pick up new dark sections
  // and drop the ones that left with the old page.
  const contentObserver = new MutationObserver(() => {
    darkSections.forEach(el => {
      if (!el.isConnected) darkSections.delete(el);
    });
    scan(pageContent);
    applyTheme();
  });

  if (pageContent) {
    contentObserver.observe(pageContent, { childList: true, subtree: true });
    scan(pageContent);
  }
}
