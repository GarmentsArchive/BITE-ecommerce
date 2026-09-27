/**
 * BITE — Editorial accordion
 *
 * Used by the product detail sections and the FAQ. Styling lives in
 * pages.css, including the +/× marker — the component must not draw
 * its own, or every row ends up with two.
 *
 * The panel animates on grid-template-rows (0fr → 1fr) so content of
 * any height opens smoothly without measuring it in JavaScript.
 */

let uid = 0;

export function createAccordion(items, options = {}) {
  const { allowMultiple = false } = options;

  const root = document.createElement('div');
  root.className = 'accordion';

  items.forEach(item => {
    const id = `acc-${++uid}`;

    const el = document.createElement('div');
    el.className = 'accordion__item';
    el.innerHTML = `
      <h3 class="accordion__heading">
        <button
          class="accordion__trigger"
          type="button"
          aria-expanded="false"
          aria-controls="${id}"
        >${item.title}</button>
      </h3>
      <div class="accordion__panel" id="${id}" role="region">
        <div class="accordion__panel-inner">
          <div class="accordion__content">${item.content}</div>
        </div>
      </div>
    `;

    const trigger = el.querySelector('.accordion__trigger');

    trigger.addEventListener('click', () => {
      const isOpen = el.classList.contains('is-open');

      if (!allowMultiple) {
        root.querySelectorAll('.accordion__item.is-open').forEach(open => {
          open.classList.remove('is-open');
          open.querySelector('.accordion__trigger').setAttribute('aria-expanded', 'false');
        });
      }

      if (!isOpen) {
        el.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });

    root.appendChild(el);
  });

  return root;
}
