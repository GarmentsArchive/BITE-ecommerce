import { revealOnScroll } from '../utils/animations.js';

export function renderReturns(container) {
  container.innerHTML = `
    <div class="page-narrow section info-page">
      <div class="info-page__header reveal">
        <h1 class="type-display">RETURNS</h1>
      </div>
      <div class="info-page__content reveal">
        <section class="info-page__section mb-lg">
          <h2 class="type-subhead mb-sm">Return Policy</h2>
          <p class="type-body">We accept returns within 14 days of delivery. Products must be unused, unopened, and in their original packaging.</p>
        </section>
        <section class="info-page__section mb-lg">
          <h2 class="type-subhead mb-sm">How to Return</h2>
          <p class="type-body">Email returns@bitebeauty.co.za with your order number and reason for return. We will provide a returns shipping label and instructions.</p>
        </section>
        <section class="info-page__section mb-lg">
          <h2 class="type-subhead mb-sm">Refunds</h2>
          <p class="type-body">Refunds are processed within 5–7 business days of receiving your returned product. The refund will be issued to your original payment method.</p>
        </section>
        <section class="info-page__section mb-lg">
          <h2 class="type-subhead mb-sm">Exchanges</h2>
          <p class="type-body">We currently do not offer direct exchanges. Please return your item and place a new order for the desired product.</p>
        </section>
        <section class="info-page__section mb-lg">
          <h2 class="type-subhead mb-sm">Damaged Items</h2>
          <p class="type-body">If your product arrives damaged, please contact us within 48 hours of delivery with photographs. We will arrange a replacement at no additional cost.</p>
        </section>
      </div>
    </div>
  `;
  
  revealOnScroll(container.querySelectorAll('.reveal'));
}
