import { revealOnScroll } from '../utils/animations.js';

export function renderDelivery(container) {
  container.innerHTML = `
    <div class="page-narrow section info-page">
      <div class="info-page__header reveal">
        <h1 class="type-display">DELIVERY</h1>
      </div>
      <div class="info-page__content reveal">
        <section class="info-page__section mb-lg">
          <h2 class="type-subhead mb-sm">Processing</h2>
          <p class="type-body">Orders are processed within 1–2 business days. You will receive a confirmation email once your order has been dispatched.</p>
        </section>
        <section class="info-page__section mb-lg">
          <h2 class="type-subhead mb-sm">Delivery Times</h2>
          <ul class="type-body ml-md" style="list-style-type: disc;">
            <li>Cape Town Metro: 2–3 business days</li>
            <li>Greater South Africa: 4–7 business days</li>
            <li>International: 7–14 business days</li>
          </ul>
        </section>
        <section class="info-page__section mb-lg">
          <h2 class="type-subhead mb-sm">Delivery Costs</h2>
          <ul class="type-body ml-md" style="list-style-type: disc;">
            <li>Standard delivery (SA): R60</li>
            <li>Express delivery (SA): R120</li>
            <li>Free delivery on orders over R500</li>
            <li>International rates calculated at checkout</li>
          </ul>
        </section>
        <section class="info-page__section mb-lg">
          <h2 class="type-subhead mb-sm">Tracking</h2>
          <p class="type-body">A tracking number will be emailed to you once your order has shipped. Track your order through our courier partner’s website.</p>
        </section>
        <section class="info-page__section mb-lg">
          <h2 class="type-subhead mb-sm">Delays</h2>
          <p class="type-body">Deliveries may be subject to delays during peak periods, public holidays, or due to circumstances beyond our control. We will communicate any significant delays via email.</p>
        </section>
      </div>
    </div>
  `;
  
  revealOnScroll(container.querySelectorAll('.reveal'));
}
