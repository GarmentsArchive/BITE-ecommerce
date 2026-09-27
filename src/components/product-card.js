/**
 * BITE — Product Card
 *
 * The whole card is one link, so a click anywhere opens the product.
 * "Add to bag" sits inside it as a real button and stops the click
 * from propagating — the two actions never fight each other.
 */

import { formatPrice } from '../data/products.js';
import { cartStore } from '../store.js';
import { openCart } from './cart.js';

export function createProductCard(product) {
  const card = document.createElement('article');
  card.className = 'product-card';

  card.innerHTML = `
    <a class="product-card__link" href="#/product/${product.id}">
      <div class="product-card__image-wrap">
        <img
          class="product-card__image img-lazy"
          data-src="${product.images.product}"
          alt="${product.name} in ${product.shade}"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div class="product-card__info">
        <h3 class="product-card__name">${product.name}</h3>
        <p class="product-card__shade">${product.shade}</p>
        <p class="product-card__price">${formatPrice(product.price, product.currency)}</p>
      </div>
    </a>
    <button class="product-card__add" type="button">
      ADD TO BAG
    </button>
  `;

  const addBtn = card.querySelector('.product-card__add');
  addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    cartStore.addItem(product.id, 1);
    openCart();
  });

  return card;
}
