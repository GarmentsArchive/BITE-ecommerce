import { cartStore } from '../store.js';
import { getProduct, formatPrice } from '../data/products.js';

const lockScroll = () => document.body.style.overflow = 'hidden';
const unlockScroll = () => document.body.style.overflow = '';

let drawerRendered = false;

export function renderCartDrawer() {
  if (drawerRendered) return;
  drawerRendered = true;

  const drawerWrapper = document.createElement('div');
  drawerWrapper.id = 'cart-drawer-wrapper';
  drawerWrapper.innerHTML = `
    <div class="cart-overlay" style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.45); z-index: 999; opacity: 0; pointer-events: none; transition: opacity 0.3s ease;"></div>
    <div class="cart-drawer" style="position: fixed; top: 0; right: 0; width: 100%; max-width: 420px; height: 100vh; background: var(--bite-ivory); z-index: 1000; transform: translateX(100%); transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1); display: flex; flex-direction: column; box-shadow: -4px 0 20px rgba(0,0,0,0.08);">
      <div class="cart-header" style="display: flex; justify-content: space-between; align-items: center; padding: 1.25rem var(--space-page); border-bottom: 1px solid var(--bite-border);">
        <h2 style="font-family: var(--font-display); font-size: 1.1rem; letter-spacing: 0.05em; margin: 0;">YOUR BAG</h2>
        <button class="cart-close" style="font-size: 1.5rem; cursor: pointer; line-height: 1; padding: 4px;">&times;</button>
      </div>
      <div class="cart-items" style="flex: 1; overflow-y: auto; padding: var(--space-page);"></div>
      <div class="cart-footer" style="padding: var(--space-page); border-top: 1px solid var(--bite-border);">
        <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
          <span class="type-meta">SUBTOTAL</span>
          <span class="cart-subtotal-val type-price"></span>
        </div>
        <p class="type-caption" style="margin-bottom: 1rem; color: var(--bite-caption);">Shipping & taxes calculated at checkout.</p>
        <a href="#/checkout" class="cart-checkout-btn" style="display: block; width: 100%; padding: 0.9rem; background: var(--bite-black); color: var(--bite-white); text-align: center; text-decoration: none; font-family: var(--font-body); font-size: var(--type-meta); letter-spacing: 0.12em; text-transform: uppercase; font-weight: 500; transition: background 0.2s;">CHECKOUT</a>
      </div>
    </div>
  `;

  document.body.appendChild(drawerWrapper);

  const overlay = drawerWrapper.querySelector('.cart-overlay');
  const drawer = drawerWrapper.querySelector('.cart-drawer');
  const closeBtn = drawerWrapper.querySelector('.cart-close');
  const itemsContainer = drawerWrapper.querySelector('.cart-items');
  const subtotalVal = drawerWrapper.querySelector('.cart-subtotal-val');
  const checkoutBtn = drawerWrapper.querySelector('.cart-checkout-btn');

  function renderItems() {
    const items = cartStore.getItems();
    itemsContainer.innerHTML = '';

    if (items.length === 0) {
      itemsContainer.innerHTML = `
        <div style="text-align: center; padding-top: 3rem;">
          <p class="type-editorial-italic" style="color: var(--bite-caption); margin-bottom: 1.5rem;">Your bag is empty.</p>
          <a href="#/store" class="cart-continue type-meta" style="color: var(--bite-black); text-decoration: underline; letter-spacing: 0.08em;">CONTINUE SHOPPING</a>
        </div>
      `;
      const continueLink = itemsContainer.querySelector('.cart-continue');
      if (continueLink) continueLink.addEventListener('click', closeCart);
      subtotalVal.textContent = 'R0';
      checkoutBtn.style.pointerEvents = 'none';
      checkoutBtn.style.opacity = '0.4';
      return;
    }

    checkoutBtn.style.pointerEvents = 'auto';
    checkoutBtn.style.opacity = '1';

    items.forEach(item => {
      const product = getProduct(item.productId);
      if (!product) return;

      const el = document.createElement('div');
      el.style.cssText = 'display: flex; gap: 1rem; padding-bottom: 1.25rem; border-bottom: 1px solid var(--bite-border-light); margin-bottom: 1.25rem;';

      el.innerHTML = `
        <img src="${product.images.product}" alt="${product.name}" style="width: 72px; height: 90px; object-fit: cover; flex-shrink: 0;" />
        <div style="flex: 1; display: flex; flex-direction: column; min-width: 0;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <div class="type-small" style="font-weight: 500;">${product.name}</div>
              <div class="type-caption" style="color: var(--bite-caption); margin-top: 2px;">${product.shade}</div>
            </div>
            <button class="cart-remove-btn" data-id="${product.id}" style="font-size: 1.1rem; cursor: pointer; color: var(--bite-caption); line-height: 1; padding: 0;">&times;</button>
          </div>
          <div style="margin-top: auto; display: flex; justify-content: space-between; align-items: flex-end; padding-top: 0.5rem;">
            <div style="display: flex; border: 1px solid var(--bite-border); align-items: center;">
              <button class="cart-qty-dec" data-id="${product.id}" style="padding: 0.2rem 0.5rem; cursor: pointer; font-size: 13px;">−</button>
              <span class="type-meta" style="padding: 0 0.5rem; min-width: 20px; text-align: center;">${item.quantity}</span>
              <button class="cart-qty-inc" data-id="${product.id}" style="padding: 0.2rem 0.5rem; cursor: pointer; font-size: 13px;">+</button>
            </div>
            <div class="type-small" style="font-weight: 500;">${formatPrice(product.price * item.quantity)}</div>
          </div>
        </div>
      `;
      itemsContainer.appendChild(el);
    });

    subtotalVal.textContent = formatPrice(cartStore.getSubtotal());
  }

  // Event delegation
  itemsContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-id]');
    if (!btn) return;
    const id = btn.dataset.id;

    if (btn.classList.contains('cart-remove-btn')) {
      cartStore.removeItem(id);
    } else if (btn.classList.contains('cart-qty-dec')) {
      const item = cartStore.getItems().find(i => i.productId === id);
      if (item && item.quantity > 1) {
        cartStore.updateQuantity(id, item.quantity - 1);
      } else {
        cartStore.removeItem(id);
      }
    } else if (btn.classList.contains('cart-qty-inc')) {
      const item = cartStore.getItems().find(i => i.productId === id);
      if (item) cartStore.updateQuantity(id, item.quantity + 1);
    }
  });

  checkoutBtn.addEventListener('click', () => closeCart());
  closeBtn.addEventListener('click', closeCart);
  overlay.addEventListener('click', closeCart);

  cartStore.subscribe(renderItems);
  renderItems();
}

export function openCart() {
  renderCartDrawer();
  const overlay = document.querySelector('.cart-overlay');
  const drawer = document.querySelector('.cart-drawer');

  if (overlay && drawer) {
    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
      overlay.style.pointerEvents = 'auto';
      drawer.style.transform = 'translateX(0)';
      lockScroll();
    });
  }
}

export function closeCart() {
  const overlay = document.querySelector('.cart-overlay');
  const drawer = document.querySelector('.cart-drawer');

  if (overlay && drawer) {
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';
    drawer.style.transform = 'translateX(100%)';
    unlockScroll();
  }
}
