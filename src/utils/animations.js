import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

export function revealOnScroll(elements) {
  const els = Array.isArray(elements) || elements instanceof NodeList ? elements : [elements];
  
  els.forEach(el => {
    gsap.fromTo(el, 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });
}

export function staggerReveal(elements, stagger = 0.1) {
  gsap.fromTo(elements,
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: elements[0],
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    }
  );
}

export function parallax(element, speed = 0.3) {
  gsap.to(element, {
    y: () => (window.innerHeight * speed),
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });
}

export function fadeIn(element, duration = 0.6) {
  return gsap.fromTo(element,
    { opacity: 0 },
    { opacity: 1, duration, ease: 'power2.inOut' }
  );
}

export function pageEnter(container) {
  return new Promise(resolve => {
    gsap.fromTo(container,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', onComplete: resolve }
    );
  });
}

export function pageExit(container) {
  return new Promise(resolve => {
    gsap.to(container, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: resolve
    });
  });
}

/**
 * Teardown registry.
 *
 * Components that attach observers, canvases or media loaders return
 * a disposer. Pages register those here so a route change releases
 * them along with the scroll triggers.
 */
const pageTeardowns = [];

export function registerTeardown(fn) {
  if (typeof fn === 'function') pageTeardowns.push(fn);
}

export function killPageAnimations() {
  while (pageTeardowns.length) {
    const dispose = pageTeardowns.pop();
    try { dispose(); } catch (e) { console.warn('[BITE] teardown failed', e); }
  }
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
}
