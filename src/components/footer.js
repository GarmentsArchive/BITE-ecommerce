/**
 * BITE — Footer Component
 */

import { router } from '../router.js';

export function renderFooter(container) {
  container.innerHTML = '';
  container.className = 'footer';

  const footer = document.createElement('div');
  footer.className = 'footer__inner page-container';
  footer.innerHTML = `
    <div class="footer__grid">
      <div class="footer__col">
        <div class="footer__brand type-heading" style="color: var(--bite-white); margin-bottom: var(--space-md);">BITE</div>
        <p class="type-editorial-italic" style="color: var(--bite-caption-light); max-width: 280px; line-height: 1.6;">
          A magazine you can shop.<br/>
          Born in Cape Town.
        </p>
      </div>
      <div class="footer__col">
        <h4 class="footer__heading type-meta">SHOP</h4>
        <a href="#/store" class="footer__link type-small">The Store</a>
        <a href="#/editorial" class="footer__link type-small">Editorial</a>
        <a href="#/" class="footer__link type-small">Current Issue</a>
      </div>
      <div class="footer__col">
        <h4 class="footer__heading type-meta">HELP</h4>
        <a href="#/delivery" class="footer__link type-small">Delivery</a>
        <a href="#/returns" class="footer__link type-small">Returns</a>
        <a href="#/faq" class="footer__link type-small">FAQ</a>
        <a href="#/contact" class="footer__link type-small">Contact</a>
      </div>
      <div class="footer__col">
        <h4 class="footer__heading type-meta">LEGAL</h4>
        <a href="#/privacy" class="footer__link type-small">Privacy Policy</a>
        <a href="#/terms" class="footer__link type-small">Terms & Conditions</a>
        <a href="#/about" class="footer__link type-small">About BITE</a>
      </div>
    </div>
    <div class="footer__bottom">
      <span class="type-meta" style="color: var(--bite-caption);">&copy; ${new Date().getFullYear()} BITE BEAUTY. CAPE TOWN, SOUTH AFRICA.</span>
    </div>
  `;

  container.appendChild(footer);

  // Handle footer nav clicks
  footer.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const hash = link.getAttribute('href').slice(1);
      router.navigate(hash);
    });
  });
}
