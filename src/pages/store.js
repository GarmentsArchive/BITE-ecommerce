/**
 * BITE — The Store
 *
 * Cleaner and more structured than the editorial pages: this is
 * where the reader buys something. The grid still has an editorial
 * rhythm (not nine identical cards) but every product carries the
 * same information in the same place, so scanning stays easy.
 */

import { createProductCard } from '../components/product-card.js';
import { PRODUCTS } from '../data/products.js';
import { lazyLoadImages } from '../utils/lazy-load.js';
import { revealOnScroll } from '../utils/animations.js';

export function renderStore(container) {
  container.innerHTML = `
    <div class="store">
      <header class="store-header">
        <div class="store-header__meta type-meta">
          <span>ISSUE 01</span>
          <span>${PRODUCTS.length} PRODUCTS</span>
          <span>CAPE TOWN</span>
        </div>
        <h1 class="store-header__title">THE STORE</h1>
        <p class="store-header__standfirst">Every shade. Every story. Every fruit.</p>
      </header>
      <div class="product-grid"></div>
    </div>
  `;

  const grid = container.querySelector('.product-grid');

  PRODUCTS.forEach(product => {
    const item = document.createElement('div');
    item.className = 'product-grid__item reveal';
    item.appendChild(createProductCard(product));
    grid.appendChild(item);
  });

  lazyLoadImages(container);
  revealOnScroll(container.querySelectorAll('.reveal'));
}
