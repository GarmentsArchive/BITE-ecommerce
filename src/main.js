import { router } from './router.js';
import { cartStore } from './store.js';
import { killPageAnimations } from './utils/animations.js';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

async function initApp() {
  const navContainer = document.getElementById('main-nav');
  const footerContainer = document.getElementById('main-footer');
  const pageContainer = document.getElementById('page-content');

  // Initialize nav
  try {
    const { renderNav } = await import('./components/nav.js');
    if (navContainer) renderNav(navContainer);
  } catch (e) {
    console.warn('Nav failed to load', e);
  }

  // Initialize footer
  try {
    const { renderFooter } = await import('./components/footer.js');
    if (footerContainer) renderFooter(footerContainer);
  } catch (e) {
    console.warn('Footer failed to load', e);
  }

  // Cart subscription for nav badge
  cartStore.subscribe(() => {
    const count = cartStore.getCount();
    const bagLink = document.getElementById('nav-bag');
    if (bagLink) {
      bagLink.textContent = count > 0 ? `BAG (${count})` : 'BAG';
    }
  });

  // Route wrapper with page enter animation
  const createRoute = (importFn, renderFnName) => async (params, container) => {
    killPageAnimations();
    container.style.opacity = '0';

    try {
      const module = await importFn();
      await module[renderFnName](container, params);

      // clearProps matters: a leftover inline transform on the page
      // container makes it the containing block for its descendants,
      // which breaks position:fixed — including ScrollTrigger's pins
      // for the editorial frame sequences.
      gsap.fromTo(
        container,
        { opacity: 0, y: 8 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
          clearProps: 'opacity,transform',
        }
      );
    } catch (e) {
      console.error('Failed to load route', e);
      container.innerHTML = `
        <div class="page-container section" style="padding-top: calc(var(--nav-height) + var(--space-2xl)); text-align: center;">
          <h1 class="type-display">PAGE NOT FOUND</h1>
          <p class="type-editorial-italic" style="color: var(--bite-caption); margin-top: var(--space-md);">
            The page you're looking for doesn't exist.
          </p>
          <a href="#/" class="btn-editorial" style="margin-top: var(--space-lg); display: inline-block;">BACK TO MAGAZINE</a>
        </div>
      `;
      container.style.opacity = '1';
    }
  };

  // Register routes
  router.register('/', createRoute(() => import('./pages/home.js'), 'renderHome'));
  router.register('/editorial', createRoute(() => import('./pages/editorial.js'), 'renderEditorial'));
  router.register('/store', createRoute(() => import('./pages/store.js'), 'renderStore'));
  router.register('/product/:id', createRoute(() => import('./pages/product.js'), 'renderProduct'));
  router.register('/cart', createRoute(() => import('./pages/cart.js'), 'renderCart'));
  router.register('/checkout', createRoute(() => import('./pages/checkout.js'), 'renderCheckout'));
  router.register('/about', createRoute(() => import('./pages/about.js'), 'renderAbout'));
  router.register('/delivery', createRoute(() => import('./pages/delivery.js'), 'renderDelivery'));
  router.register('/returns', createRoute(() => import('./pages/returns.js'), 'renderReturns'));
  router.register('/faq', createRoute(() => import('./pages/faq.js'), 'renderFaq'));
  router.register('/contact', createRoute(() => import('./pages/contact.js'), 'renderContact'));
  router.register('/privacy', createRoute(() => import('./pages/privacy.js'), 'renderPrivacy'));
  router.register('/terms', createRoute(() => import('./pages/terms.js'), 'renderTerms'));

  if (pageContainer) {
    router.init(pageContainer);
  }
}

document.addEventListener('DOMContentLoaded', initApp);
