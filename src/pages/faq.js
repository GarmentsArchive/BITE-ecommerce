import { createAccordion } from '../components/accordion.js';
import { revealOnScroll } from '../utils/animations.js';

export function renderFaq(container) {
  container.innerHTML = '';
  
  const faqData = [
    {
      title: 'What is BITE?',
      content: 'BITE is a Cape Town-born beauty brand specialising in fruit-infused lip products. We make lip oils, glosses, and stains using real fruit extracts and natural ingredients.'
    },
    {
      title: 'Are BITE products vegan?',
      content: 'Yes. All BITE products are 100% vegan and cruelty-free. We never test on animals, and our formulations contain no animal-derived ingredients.'
    },
    {
      title: 'What is Kush Lip Oil?',
      content: 'Our Kush Lip Oil is a high-shine lip oil infused with hemp-derived cannabis seed oil and real fruit pigment. It delivers buildable colour with a glossy, non-sticky finish.'
    },
    {
      title: 'Do you ship internationally?',
      content: 'Yes, we ship to most countries worldwide. International shipping rates are calculated at checkout. Delivery typically takes 7–14 business days.'
    },
    {
      title: 'Can I return a product?',
      content: 'We accept returns within 14 days of delivery. Products must be unused and in their original packaging. Visit our Returns page for full details.'
    },
    {
      title: 'How do I track my order?',
      content: 'Once your order has been dispatched, you will receive a tracking number via email. Use this number to track your delivery through our courier partner’s website.'
    },
    {
      title: 'Are your products suitable for sensitive skin?',
      content: 'Our products are formulated with gentle, natural ingredients. However, we recommend checking the full ingredients list on each product page if you have specific sensitivities or allergies.'
    },
    {
      title: 'Where is BITE based?',
      content: 'BITE is based in Cape Town, South Africa. Our studio is in the Woodstock neighbourhood, close to the Old Biscuit Mill market where the brand was first imagined.'
    }
  ];

  const html = `
    <div class="page-narrow section info-page">
      <div class="info-page__header reveal">
        <h1 class="type-display">FAQ</h1>
      </div>
      <div class="info-page__content faq-list reveal" id="faq-container">
        <!-- Accordion injected here -->
      </div>
    </div>
  `;
  
  container.innerHTML = html;
  
  const faqContainer = container.querySelector('#faq-container');
  try {
    const accordionContent = createAccordion(faqData);
    if (typeof accordionContent === 'string') {
      faqContainer.innerHTML = accordionContent;
    } else {
      faqContainer.appendChild(accordionContent);
    }
  } catch (e) {
    console.error('Error rendering accordion', e);
  }

  revealOnScroll(container.querySelectorAll('.reveal'));
}
