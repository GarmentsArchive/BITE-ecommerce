/**
 * BITE — Checkout Page
 */

import { renderCheckout as renderCheckoutComponent } from '../components/checkout.js';

export function renderCheckout(container) {
  container.innerHTML = '';
  renderCheckoutComponent(container);
}
