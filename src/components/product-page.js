/**
 * BITE — Product Page
 *
 * Editorial in its typography, conventional in its mechanics. Once
 * someone is ready to buy, clarity wins: the price, the quantity and
 * the button are exactly where they are expected to be, and the
 * detail sections are plain expandable text.
 *
 * The story that brought them here — the frame sequence and the
 * campaign photography — sits below the fold, not in front of it.
 */

import { getProduct, formatPrice } from '../data/products.js';
import { cartStore } from '../store.js';
import { openCart } from './cart.js';
import { createAccordion } from './accordion.js';
import { initInlineFrameSequence } from './frame-sequence.js';

function notFound(container) {
  container.innerHTML = `
    <div class="product-missing">
      <h1 class="type-display">PRODUCT NOT FOUND</h1>
      <p class="type-editorial-italic">That shade isn’t in this issue.</p>
      <a href="#/store" class="btn-editorial">BACK TO THE STORE</a>
    </div>
  `;
}

/**
 * @returns {Function|null} teardown for the editorial frame sequence
 */
export function renderProductPage(container, productId) {
  const product = getProduct(productId);

  if (!product) {
    notFound(container);
    return null;
  }

  const gallery = [product.images.product, ...product.editorialImages].filter(Boolean);

  container.innerHTML = `
    <article class="product">
      <nav class="product__breadcrumb type-meta" aria-label="Breadcrumb">
        <a href="#/store">STORE</a>
        <span aria-hidden="true">/</span>
        <span>${product.shade.toUpperCase()}</span>
      </nav>

      <div class="product__main">
        <div class="product__gallery">
          <div class="product__stage">
            <img
              class="product__image"
              id="product-stage-image"
              src="${gallery[0]}"
              alt="${product.name} in ${product.shade}"
              decoding="async"
            />
          </div>
          ${gallery.length > 1 ? `
          <div class="product__thumbs" role="tablist" aria-label="Product images">
            ${gallery.map((src, i) => `
              <button
                class="product__thumb${i === 0 ? ' is-active' : ''}"
                role="tab"
                aria-selected="${i === 0}"
                data-src="${src}"
                type="button"
              >
                <img src="${src}" alt="" loading="lazy" decoding="async" />
              </button>
            `).join('')}
          </div>` : ''}
        </div>

        <div class="product__detail">
          <p class="product__brand type-meta">BITE — ${product.category.toUpperCase()}</p>
          <h1 class="product__name">${product.name}</h1>
          <p class="product__shade">${product.shade}</p>
          <p class="product__price">${formatPrice(product.price, product.currency)}</p>
          <p class="product__tagline type-editorial-italic">${product.tagline}</p>

          <div class="product__buy">
            <div class="product__quantity">
              <button class="product__qty-btn" data-step="-1" type="button" aria-label="Decrease quantity">&minus;</button>
              <span class="product__qty-value" aria-live="polite" aria-label="Quantity">1</span>
              <button class="product__qty-btn" data-step="1" type="button" aria-label="Increase quantity">+</button>
            </div>
            <button class="product__add" type="button">ADD TO BAG</button>
          </div>

          <p class="product__availability type-meta">${product.availability.toUpperCase()}</p>

          <div class="product__accordion"></div>
        </div>
      </div>

      <section class="product__editorial" aria-label="${product.shade} editorial">
        <div class="product__editorial-head">
          <p class="type-meta">FROM THE EDITORIAL</p>
          <h2 class="product__editorial-title">${product.shade.toUpperCase()}</h2>
        </div>
        ${product.editorialFrames ? `
        <figure class="product__sequence" data-sequence="${product.editorialFrames}"></figure>` : ''}
        ${product.editorialImages.length ? `
        <div class="product__stills">
          ${product.editorialImages.map(src => `
            <img class="img-lazy" data-src="${src}" alt="${product.shade} editorial photograph" loading="lazy" decoding="async" />
          `).join('')}
        </div>` : ''}
        <a href="#/editorial" class="product__editorial-link">READ THE EDITORIAL</a>
      </section>
    </article>
  `;

  /* ── Gallery ───────────────────────────────────────────── */
  const stage = container.querySelector('#product-stage-image');
  container.querySelectorAll('.product__thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      stage.src = thumb.dataset.src;
      container.querySelectorAll('.product__thumb').forEach(t => {
        t.classList.toggle('is-active', t === thumb);
        t.setAttribute('aria-selected', String(t === thumb));
      });
    });
  });

  /* ── Quantity + add to bag ─────────────────────────────── */
  let qty = 1;
  const qtyValue = container.querySelector('.product__qty-value');

  container.querySelectorAll('.product__qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const step = Number(btn.dataset.step);
      qty = Math.max(1, Math.min(99, qty + step));
      qtyValue.textContent = qty;
    });
  });

  container.querySelector('.product__add').addEventListener('click', () => {
    cartStore.addItem(product.id, qty);
    openCart();
  });

  /* ── Detail sections ───────────────────────────────────── */
  container.querySelector('.product__accordion').appendChild(
    createAccordion([
      { title: 'Description', content: product.description },
      { title: 'Ingredients', content: product.ingredients },
      { title: 'How to Use', content: product.usage },
      { title: 'Shipping', content: product.shipping },
      { title: 'Returns', content: product.returns },
    ])
  );

  /* ── Editorial sequence ────────────────────────────────── */
  const sequenceHost = container.querySelector('.product__sequence');
  if (sequenceHost) {
    return initInlineFrameSequence(sequenceHost, sequenceHost.dataset.sequence);
  }

  return null;
}
