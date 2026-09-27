import { revealOnScroll } from '../utils/animations.js';

export function renderPrivacy(container) {
  container.innerHTML = `
    <div class="page-narrow section info-page">
      <div class="info-page__header reveal">
        <h1 class="type-display">PRIVACY POLICY</h1>
      </div>
      <div class="info-page__content reveal">
        <section class="info-page__section mb-lg">
          <h2 class="type-subhead mb-sm">Information We Collect</h2>
          <p class="type-body mb-sm">When you visit the BITE website, we collect certain information about your device, your interaction with the site, and information necessary to process your purchases. We may also collect additional information if you contact us for customer support.</p>
        </section>
        
        <section class="info-page__section mb-lg">
          <h2 class="type-subhead mb-sm">How We Use Your Information</h2>
          <p class="type-body mb-sm">We use your personal information to provide our services to you, which includes: offering products for sale, processing payments, shipping and fulfillment of your order, and keeping you up to date on new products, services, and offers.</p>
        </section>
        
        <section class="info-page__section mb-lg">
          <h2 class="type-subhead mb-sm">Data Security</h2>
          <p class="type-body mb-sm">We take reasonable precautions and follow industry best practices to make sure your personal information is not inappropriately lost, misused, accessed, disclosed, altered or destroyed.</p>
        </section>
        
        <section class="info-page__section mb-lg">
          <h2 class="type-subhead mb-sm">Cookies</h2>
          <p class="type-body mb-sm">We use cookies to maintain your shopping cart, analyze site traffic, and optimize your browsing experience. You can choose to disable cookies through your browser settings, though this may affect site functionality.</p>
        </section>
        
        <section class="info-page__section mb-lg">
          <h2 class="type-subhead mb-sm">Third-Party Services</h2>
          <p class="type-body mb-sm">In general, the third-party providers used by us will only collect, use and disclose your information to the extent necessary to allow them to perform the services they provide to us (such as payment gateways and couriers).</p>
        </section>
        
        <section class="info-page__section mb-lg">
          <h2 class="type-subhead mb-sm">Your Rights</h2>
          <p class="type-body mb-sm">If you are a resident of certain territories, you have the right to access the personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. Please contact us to exercise this right.</p>
        </section>
        
        <section class="info-page__section mb-lg">
          <h2 class="type-subhead mb-sm">Contact Us</h2>
          <p class="type-body mb-sm">For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by email at privacy@bitebeauty.co.za.</p>
        </section>
      </div>
    </div>
  `;
  
  revealOnScroll(container.querySelectorAll('.reveal'));
}
