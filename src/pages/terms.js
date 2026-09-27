import { revealOnScroll } from '../utils/animations.js';

export function renderTerms(container) {
  container.innerHTML = `
    <div class="page-narrow section info-page">
      <div class="info-page__header reveal">
        <h1 class="type-display">TERMS OF SERVICE</h1>
      </div>
      <div class="info-page__content reveal">
        <section class="info-page__section mb-lg">
          <h2 class="type-subhead mb-sm">Acceptance of Terms</h2>
          <p class="type-body mb-sm">By visiting our site and/or purchasing something from us, you engage in our "Service" and agree to be bound by the following terms and conditions. These Terms apply to all users of the site.</p>
        </section>
        
        <section class="info-page__section mb-lg">
          <h2 class="type-subhead mb-sm">Products and Pricing</h2>
          <p class="type-body mb-sm">All products are subject to availability. We reserve the right to limit the quantities of any products or services that we offer. All descriptions of products or product pricing are subject to change at any time without notice, at our sole discretion.</p>
        </section>
        
        <section class="info-page__section mb-lg">
          <h2 class="type-subhead mb-sm">Orders and Payment</h2>
          <p class="type-body mb-sm">We reserve the right to refuse any order you place with us. You agree to provide current, complete, and accurate purchase and account information for all purchases made at our store.</p>
        </section>
        
        <section class="info-page__section mb-lg">
          <h2 class="type-subhead mb-sm">Delivery</h2>
          <p class="type-body mb-sm">Delivery times are estimates and not guarantees. We are not liable for any delays in delivery caused by events beyond our reasonable control.</p>
        </section>
        
        <section class="info-page__section mb-lg">
          <h2 class="type-subhead mb-sm">Returns and Refunds</h2>
          <p class="type-body mb-sm">Our return and refund policies are outlined on our Returns page. By making a purchase, you agree to these terms.</p>
        </section>
        
        <section class="info-page__section mb-lg">
          <h2 class="type-subhead mb-sm">Intellectual Property</h2>
          <p class="type-body mb-sm">All content included on this site, such as text, graphics, logos, images, and software, is the property of BITE and is protected by South African and international copyright laws.</p>
        </section>
        
        <section class="info-page__section mb-lg">
          <h2 class="type-subhead mb-sm">Limitation of Liability</h2>
          <p class="type-body mb-sm">In no case shall BITE, our directors, officers, employees, affiliates, agents, contractors, or suppliers be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, or consequential damages of any kind.</p>
        </section>
        
        <section class="info-page__section mb-lg">
          <h2 class="type-subhead mb-sm">Governing Law</h2>
          <p class="type-body mb-sm">These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of South Africa.</p>
        </section>
        
        <section class="info-page__section mb-lg">
          <h2 class="type-subhead mb-sm">Changes to Terms</h2>
          <p class="type-body mb-sm">We reserve the right, at our sole discretion, to update, change or replace any part of these Terms of Service by posting updates and changes to our website. It is your responsibility to check our website periodically for changes.</p>
        </section>
        
        <section class="info-page__section mb-lg">
          <h2 class="type-subhead mb-sm">Contact</h2>
          <p class="type-body mb-sm">Questions about the Terms of Service should be sent to us at hello@bitebeauty.co.za.</p>
        </section>
      </div>
    </div>
  `;
  
  revealOnScroll(container.querySelectorAll('.reveal'));
}
