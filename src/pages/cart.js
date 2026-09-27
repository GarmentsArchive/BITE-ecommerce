/**
 * BITE — Cart Page (fallback for direct #/cart navigation)
 */

import { cartStore } from '../store.js';
import { getProduct, formatPrice } from '../data/products.js';
import { router } from '../router.js';
import { lazyLoadImages } from '../utils/lazy-load.js';

export function renderCart(container) {
  container.innerHTML = '';

  const items = cartStore.getItems();
  const wrapper = document.createElement('div');
  wrapper.className = 'page-container section';
  wrapper.style.cssText = 'padding-top: calc(var(--nav-height) + var(--space-2xl));';

  if (items.length === 0) {
    wrapper.innerHTML = `
      <div style="text-align: center; padding: var(--space-3xl) 0;">
        <h1 class="type-display" style="margin-bottom: var(--space-md);">YOUR BAG</h1>
        <p class="type-editorial-italic" style="color: var(--bite-caption); margin-bottom: var(--space-lg);">Your bag is empty.</p>
        <a href="#/store" class="btn-editorial">CONTINUE SHOPPING</a>
      </div>
    `;
  } else {
    let itemsHTML = '';
    let subtotal = 0;

    items.forEach(item => {
      const product = getProduct(item.productId);
      if (!product) return;
      const lineTotal = product.price * item.quantity;
      subtotal += lineTotal;

      itemsHTML += `
        <div class="cart-item" data-product-id="${item.productId}" style="display: flex; gap: var(--space-md); padding: var(--space-md) 0; border-bottom: 1px solid var(--bite-border);">
          <img src="${product.images.product}" alt="${product.name}" style="width: 100px; height: 130px; object-fit: cover;" />
          <div style="flex: 1; display: flex; flex-direction: column; justify-content: center;">
            <div class="type-small" style="font-weight: 500;">${product.name}</div>
            <div class="type-caption" style="margin-top: 2px;">${product.shade}</div>
            <div style="display: flex; align-items: center; gap: var(--space-sm); margin-top: var(--space-sm);">
              <button class="qty-btn qty-dec" style="width: 28px; height: 28px; border: 1px solid var(--bite-border); background: none; cursor: pointer; font-size: 14px;">−</button>
              <span class="type-small">${item.quantity}</span>
              <button class="qty-btn qty-inc" style="width: 28px; height: 28px; border: 1px solid var(--bite-border); background: none; cursor: pointer; font-size: 14px;">+</button>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; align-items: flex-end; justify-content: space-between;">
            <button class="cart-remove type-meta" style="cursor: pointer; color: var(--bite-caption);">&times;</button>
            <span class="type-price">${formatPrice(lineTotal)}</span>
          </div>
        </div>
      `;
    });

    wrapper.innerHTML = `
      <h1 class="type-display" style="margin-bottom: var(--space-lg);">YOUR BAG</h1>
      <div style="display: grid; grid-template-columns: 1fr 340px; gap: var(--space-2xl);">
        <div class="cart-items-list">${itemsHTML}</div>
        <div style="position: sticky; top: calc(var(--nav-height) + var(--space-lg)); align-self: start; padding: var(--space-lg); border: 1px solid var(--bite-border);">
          <div class="type-meta" style="margin-bottom: var(--space-md);">ORDER SUMMARY</div>
          <div class="divider" style="margin-bottom: var(--space-md);"></div>
          <div style="display: flex; justify-content: space-between; margin-bottom: var(--space-sm);">
            <span class="type-small">Subtotal</span>
            <span class="type-price">${formatPrice(subtotal)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: var(--space-md);">
            <span class="type-small">Delivery</span>
            <span class="type-small" style="color: var(--bite-caption);">Calculated at checkout</span>
          </div>
          <div class="divider" style="margin-bottom: var(--space-md);"></div>
          <div style="display: flex; justify-content: space-between; margin-bottom: var(--space-lg);">
            <span class="type-small" style="font-weight: 600;">Total</span>
            <span class="type-price" style="font-weight: 600;">${formatPrice(subtotal)}</span>
          </div>
          <a href="#/checkout" class="btn-editorial--fill" style="display: block; text-align: center; width: 100%; padding: 1rem;">CHECKOUT</a>
        </div>
      </div>
    `;
  }

  container.appendChild(wrapper);

  // Event handlers for quantity buttons and remove
  wrapper.querySelectorAll('.cart-item').forEach(itemEl => {
    const productId = itemEl.dataset.productId;
    itemEl.querySelector('.qty-dec')?.addEventListener('click', () => {
      const current = cartStore.getItems().find(i => i.productId === productId);
      if (current && current.quantity > 1) {
        cartStore.updateQuantity(productId, current.quantity - 1);
      } else {
        cartStore.removeItem(productId);
      }
      renderCart(container);
    });
    itemEl.querySelector('.qty-inc')?.addEventListener('click', () => {
      const current = cartStore.getItems().find(i => i.productId === productId);
      if (current) {
        cartStore.updateQuantity(productId, current.quantity + 1);
      }
      renderCart(container);
    });
    itemEl.querySelector('.cart-remove')?.addEventListener('click', () => {
      cartStore.removeItem(productId);
      renderCart(container);
    });
  });
}
