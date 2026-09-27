/**
 * BITE — Checkout
 *
 * The plainest page on the site, on purpose. Labelled fields, one
 * column, a summary that updates as choices change, and honest
 * messaging about what happens when the order is placed.
 */

import { cartStore } from '../store.js';
import { getProduct, formatPrice } from '../data/products.js';
import { DELIVERY_OPTIONS, FREE_DELIVERY_THRESHOLD, getDeliveryCost } from '../data/shipping.js';
import { buildOrder, placeOrder } from '../services/orders.js';
import { isPaymentConfigured, PaymentNotConfiguredError } from '../services/payment.js';

const FIELDS = [
  { name: 'email',     label: 'Email',            type: 'email', required: true,  autocomplete: 'email',            group: 'contact' },
  { name: 'phone',     label: 'Phone',            type: 'tel',   required: true,  autocomplete: 'tel',              group: 'contact' },
  { name: 'firstName', label: 'First name',       type: 'text',  required: true,  autocomplete: 'given-name',       group: 'address', half: true },
  { name: 'lastName',  label: 'Last name',        type: 'text',  required: true,  autocomplete: 'family-name',      group: 'address', half: true },
  { name: 'address1',  label: 'Address',          type: 'text',  required: true,  autocomplete: 'address-line1',    group: 'address' },
  { name: 'address2',  label: 'Apartment, suite (optional)', type: 'text', required: false, autocomplete: 'address-line2', group: 'address' },
  { name: 'city',      label: 'City',             type: 'text',  required: true,  autocomplete: 'address-level2',   group: 'address', half: true },
  { name: 'postal',    label: 'Postal code',      type: 'text',  required: true,  autocomplete: 'postal-code',      group: 'address', half: true },
];

function validate(name, value) {
  const field = FIELDS.find(f => f.name === name);
  if (!field) return null;
  const trimmed = value.trim();

  if (field.required && !trimmed) return `${field.label} is required.`;
  if (!trimmed) return null;

  if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) {
    return 'Enter a valid email address.';
  }
  if (name === 'phone' && trimmed.replace(/[^\d]/g, '').length < 9) {
    return 'Enter a valid phone number.';
  }
  if (name === 'postal' && !/^\d{4}$/.test(trimmed)) {
    return 'Enter a 4-digit South African postal code.';
  }
  return null;
}

function fieldMarkup(field) {
  return `
    <div class="checkout__field${field.half ? ' checkout__field--half' : ''}">
      <label class="checkout__label" for="cf-${field.name}">${field.label}</label>
      <input
        class="checkout__input"
        id="cf-${field.name}"
        name="${field.name}"
        type="${field.type}"
        autocomplete="${field.autocomplete}"
        ${field.required ? 'required' : ''}
      />
      <p class="checkout__error" data-error-for="${field.name}" role="alert"></p>
    </div>`;
}

function emptyState(container) {
  container.innerHTML = `
    <div class="checkout-empty">
      <h1 class="type-display">CHECKOUT</h1>
      <p class="type-editorial-italic">Your bag is empty.</p>
      <a href="#/store" class="btn-editorial">BACK TO THE STORE</a>
    </div>
  `;
}

export function renderCheckout(container) {
  const items = cartStore.getItems();

  if (items.length === 0) {
    emptyState(container);
    return;
  }

  let deliveryOptionId = DELIVERY_OPTIONS.find(o => o.isDefault).id;

  container.innerHTML = `
    <div class="checkout">
      <header class="checkout__header">
        <p class="type-meta">BITE — ISSUE 01</p>
        <h1 class="checkout__title">CHECKOUT</h1>
      </header>

      <div class="checkout__body">
        <form class="checkout__form" novalidate>
          <section class="checkout__section">
            <h2 class="checkout__legend">1 — Contact</h2>
            <div class="checkout__fields">
              ${FIELDS.filter(f => f.group === 'contact').map(fieldMarkup).join('')}
            </div>
          </section>

          <section class="checkout__section">
            <h2 class="checkout__legend">2 — Delivery address</h2>
            <div class="checkout__fields">
              ${FIELDS.filter(f => f.group === 'address').map(fieldMarkup).join('')}
            </div>
          </section>

          <section class="checkout__section">
            <h2 class="checkout__legend">3 — Delivery method</h2>
            <div class="checkout__delivery">
              ${DELIVERY_OPTIONS.map(option => `
                <label class="checkout__option${option.isDefault ? ' is-selected' : ''}">
                  <input type="radio" name="delivery" value="${option.id}" ${option.isDefault ? 'checked' : ''} />
                  <span class="checkout__option-text">
                    <span class="checkout__option-label">${option.label}</span>
                    <span class="checkout__option-detail">${option.detail}</span>
                  </span>
                  <span class="checkout__option-price" data-price-for="${option.id}"></span>
                </label>
              `).join('')}
            </div>
            <p class="checkout__note">Delivery is free on orders over ${formatPrice(FREE_DELIVERY_THRESHOLD)}.</p>
          </section>

          <section class="checkout__section">
            <h2 class="checkout__legend">4 — Payment</h2>
            <div class="checkout__payment">
              <p class="checkout__payment-status">
                ${isPaymentConfigured()
                  ? 'You will be taken to our secure payment provider.'
                  : 'No payment provider is connected to this store yet, so an order cannot be completed. Everything up to this point is live — the order is assembled and validated, and connecting a provider is the only remaining step.'}
              </p>
            </div>
          </section>
        </form>

        <aside class="checkout__summary" aria-label="Order summary">
          <h2 class="checkout__legend">Order summary</h2>
          <ul class="checkout__lines">
            ${items.map(item => {
              const product = getProduct(item.productId);
              if (!product) return '';
              return `
                <li class="checkout__line">
                  <img src="${product.images.product}" alt="" loading="lazy" decoding="async" />
                  <span class="checkout__line-text">
                    <span class="checkout__line-name">${product.name}</span>
                    <span class="checkout__line-shade">${product.shade} &middot; Qty ${item.quantity}</span>
                  </span>
                  <span class="checkout__line-price">${formatPrice(product.price * item.quantity)}</span>
                </li>`;
            }).join('')}
          </ul>

          <dl class="checkout__totals">
            <div><dt>Subtotal</dt><dd data-total="subtotal"></dd></div>
            <div><dt>Delivery</dt><dd data-total="delivery"></dd></div>
            <div class="checkout__grand"><dt>Total</dt><dd data-total="grand"></dd></div>
          </dl>

          <button class="checkout__place" type="button">PLACE ORDER</button>
          <p class="checkout__result" role="status"></p>
        </aside>
      </div>
    </div>
  `;

  const form = container.querySelector('.checkout__form');
  const placeBtn = container.querySelector('.checkout__place');
  const result = container.querySelector('.checkout__result');

  /* ── Totals ────────────────────────────────────────────── */
  const paintTotals = () => {
    const subtotal = cartStore.getSubtotal();
    const delivery = getDeliveryCost(deliveryOptionId, subtotal);

    container.querySelector('[data-total="subtotal"]').textContent = formatPrice(subtotal);
    container.querySelector('[data-total="delivery"]').textContent =
      delivery === 0 ? 'Free' : formatPrice(delivery);
    container.querySelector('[data-total="grand"]').textContent = formatPrice(subtotal + delivery);

    // Show each option at the price it would actually cost today.
    DELIVERY_OPTIONS.forEach(option => {
      const cost = getDeliveryCost(option.id, subtotal);
      const el = container.querySelector(`[data-price-for="${option.id}"]`);
      if (el) el.textContent = cost === 0 ? 'Free' : formatPrice(cost);
    });
  };
  paintTotals();

  container.querySelectorAll('input[name="delivery"]').forEach(radio => {
    radio.addEventListener('change', () => {
      deliveryOptionId = radio.value;
      container.querySelectorAll('.checkout__option').forEach(opt => {
        opt.classList.toggle('is-selected', opt.contains(radio));
      });
      paintTotals();
    });
  });

  /* ── Validation ────────────────────────────────────────── */
  const showError = (name, message) => {
    const el = container.querySelector(`[data-error-for="${name}"]`);
    const input = form.elements[name];
    if (el) el.textContent = message || '';
    if (input) input.classList.toggle('has-error', Boolean(message));
  };

  FIELDS.forEach(field => {
    const input = form.elements[field.name];
    if (!input) return;
    input.addEventListener('blur', () => showError(field.name, validate(field.name, input.value)));
    input.addEventListener('input', () => {
      if (input.classList.contains('has-error')) {
        showError(field.name, validate(field.name, input.value));
      }
    });
  });

  const collect = () => {
    const customer = {};
    let firstInvalid = null;

    FIELDS.forEach(field => {
      const input = form.elements[field.name];
      const value = input ? input.value.trim() : '';
      const error = validate(field.name, value);
      showError(field.name, error);
      if (error && !firstInvalid) firstInvalid = input;
      customer[field.name] = value;
    });

    return { customer, firstInvalid };
  };

  /* ── Place order ───────────────────────────────────────── */
  placeBtn.addEventListener('click', async () => {
    result.textContent = '';
    result.className = 'checkout__result';

    const { customer, firstInvalid } = collect();
    if (firstInvalid) {
      firstInvalid.focus();
      result.textContent = 'Please correct the highlighted fields.';
      result.classList.add('is-error');
      return;
    }

    const order = buildOrder({
      items: cartStore.getItems(),
      customer,
      deliveryOptionId,
    });

    placeBtn.disabled = true;
    placeBtn.textContent = 'PLACING ORDER…';

    try {
      const payment = await placeOrder(order);
      cartStore.clear();
      result.textContent = `Order placed. Reference ${payment.reference}.`;
      result.classList.add('is-success');
    } catch (error) {
      if (error instanceof PaymentNotConfiguredError) {
        // Say so plainly rather than showing a fake confirmation.
        result.innerHTML = `
          Your details are valid and the order is ready
          (${order.lines.length} item${order.lines.length === 1 ? '' : 's'},
          ${formatPrice(order.total)}), but no payment provider is
          connected yet, so it cannot be completed.
        `;
        result.classList.add('is-notice');
        console.info('[BITE] order ready for a payment provider:', order);
      } else {
        result.textContent = 'Something went wrong. Please try again.';
        result.classList.add('is-error');
        console.error('[BITE] checkout failed', error);
      }
    } finally {
      placeBtn.disabled = false;
      placeBtn.textContent = 'PLACE ORDER';
    }
  });
}
