import { revealOnScroll } from '../utils/animations.js';

export function renderContact(container) {
  container.innerHTML = `
    <div class="page-container section info-page">
      <div class="info-page__header reveal mb-xl">
        <h1 class="type-display">CONTACT</h1>
      </div>
      <div class="grid gap-lg info-page__content reveal" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));">
        <div class="contact-info">
          <p class="type-body mb-sm">For press, stockist enquiries, and general questions.</p>
          <p class="type-body mb-sm"><strong>Email:</strong> hello@bitebeauty.co.za</p>
          <p class="type-body mb-sm"><strong>Instagram:</strong> @bitebeauty</p>
          <p class="type-body mb-sm mt-md">Studio visits by appointment only.</p>
          <p class="type-body mb-sm">Woodstock, Cape Town, South Africa</p>
        </div>
        <div class="contact-form-wrapper">
          <form id="contact-form" class="flex" style="flex-direction: column; gap: 1rem;">
            <input type="text" name="name" placeholder="Name" required class="form-input type-body" style="padding: 1rem; border: 1px solid var(--bite-black); background: transparent;" />
            <input type="email" name="email" placeholder="Email" required class="form-input type-body" style="padding: 1rem; border: 1px solid var(--bite-black); background: transparent;" />
            <input type="text" name="subject" placeholder="Subject" required class="form-input type-body" style="padding: 1rem; border: 1px solid var(--bite-black); background: transparent;" />
            <textarea name="message" placeholder="Message" rows="5" required class="form-input type-body" style="padding: 1rem; border: 1px solid var(--bite-black); background: transparent;"></textarea>
            <button type="submit" class="btn-editorial btn-editorial--fill mt-sm" style="align-self: flex-start;">SEND MESSAGE</button>
          </form>
          <div id="contact-success" class="type-editorial mt-md" style="display: none; padding: 2rem; border: 1px solid var(--bite-black);">
            Thank you for your message. We will get back to you shortly.
          </div>
        </div>
      </div>
    </div>
  `;
  
  const form = container.querySelector('#contact-form');
  const successMsg = container.querySelector('#contact-success');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.style.display = 'none';
    successMsg.style.display = 'block';
  });

  revealOnScroll(container.querySelectorAll('.reveal'));
}
