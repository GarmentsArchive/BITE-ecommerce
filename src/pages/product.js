import { renderProductPage } from '../components/product-page.js';
import { lazyLoadImages } from '../utils/lazy-load.js';
import { registerTeardown } from '../utils/animations.js';

export function renderProduct(container, params) {
  container.innerHTML = '';
  registerTeardown(renderProductPage(container, params.id));
  lazyLoadImages(container);
}
