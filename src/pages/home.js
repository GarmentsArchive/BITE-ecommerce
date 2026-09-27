/**
 * BITE — The Cover
 *
 * Cover → four spreads → the collection plate → the products.
 * A reader who never clicks anything still arrives at the store.
 */

import { renderHero } from '../components/hero.js';
import { renderEditorialSection } from '../components/editorial.js';
import { createProductCard } from '../components/product-card.js';
import { getFeaturedProducts } from '../data/products.js';
import { EDITORIAL_STORIES } from '../data/editorial.js';
import { lazyLoadImages } from '../utils/lazy-load.js';
import { revealOnScroll, registerTeardown } from '../utils/animations.js';

export function renderHome(container) {
  container.innerHTML = '';

  // 1 — The cover
  const heroWrapper = document.createElement('div');
  container.appendChild(heroWrapper);
  renderHero(heroWrapper);

  // 2 — Four spreads, closing on the collection plate
  const editorialWrapper = document.createElement('div');
  container.appendChild(editorialWrapper);
  registerTeardown(renderEditorialSection(editorialWrapper, EDITORIAL_STORIES));

  // 3 — The products themselves. The plate above already announced
  //     them, so this section leads with the grid, not another title.
  const collection = document.createElement('section');
  collection.className = 'section page-container home-collection';
  collection.innerHTML = `
    <div class="home-collection__head reveal">
      <p class="type-meta">FEATURED — FOUR OF NINE</p>
      <a href="#/store" class="home-collection__all">VIEW ALL PRODUCTS</a>
    </div>
    <div class="product-grid product-grid--featured reveal"></div>
  `;

  const grid = collection.querySelector('.product-grid');
  getFeaturedProducts().slice(0, 4).forEach(product => {
    grid.appendChild(createProductCard(product));
  });

  container.appendChild(collection);

  lazyLoadImages(container);
  revealOnScroll(container.querySelectorAll('.reveal'));
}
