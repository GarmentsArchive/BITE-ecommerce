import { ASSETS } from '../data/assets.js';
import { lazyLoadImages } from '../utils/lazy-load.js';
import { revealOnScroll } from '../utils/animations.js';

export function renderAbout(container) {
  container.innerHTML = `
    <div class="page-container section about-page">
      <div class="reveal text-center mb-xl">
        <h1 class="type-display mb-md">ABOUT BITE</h1>
        <p class="type-editorial-italic type-heading">Born in Cape Town. Made for mouths that want more.</p>
      </div>
      
      <div class="reveal mb-xl">
        <img src="${ASSETS.models?.holdingPeach || '/models/holding-peach.jpg'}" alt="BITE Model holding peach" class="img-lazy w-full" />
      </div>
      
      <div class="page-narrow">
        <section class="section--tight reveal info-page__section">
          <h2 class="type-subhead mb-sm">The Story</h2>
          <p class="type-editorial mb-md">BITE started as an idea between a beauty editor and a fruit vendor at the Old Biscuit Mill market in Woodstock, Cape Town. The concept was simple: what if lip colour could taste as good as it looks? What if glosses were made with the same ingredients you’d find at a fresh produce market? What if beauty felt less like a counter and more like a magazine?</p>
        </section>
        
        <section class="section--tight reveal info-page__section">
          <img src="${ASSETS.models?.cherry || '/models/cherry.jpg'}" alt="BITE Model" class="img-lazy w-full mb-md" />
          <h2 class="type-subhead mb-sm">The Philosophy</h2>
          <p class="type-editorial mb-md">We believe lip colour should be an expression, not an obligation. Every BITE product starts with a fruit — real cherry, real peach, real grape. The pigment follows the flavour. The finish follows the feeling. We don’t make products for everyone. We make products for people who read magazines cover to cover, who eat fruit with their hands, who believe that the right shade of red can change an afternoon.</p>
        </section>
        
        <section class="section--tight reveal info-page__section">
          <h2 class="type-subhead mb-sm">Cape Town</h2>
          <p class="type-editorial">Our studio sits somewhere between the mountain and the harbour, in a city that understands the relationship between beauty and chaos. Cape Town taught us that luxury doesn’t need to be quiet. That colour can be loud. That the best things happen when you stop following the rules and start following the light.</p>
        </section>
      </div>
    </div>
  `;
  
  lazyLoadImages(container);
  revealOnScroll(container.querySelectorAll('.reveal'));
}
