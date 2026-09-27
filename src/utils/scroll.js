export function onScrollIntoView(elements, callback, options = { threshold: 0.1 }) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, options);

  const els = Array.isArray(elements) || elements instanceof NodeList ? elements : [elements];
  els.forEach(el => observer.observe(el));
  
  return observer;
}

export function smoothScrollTo(target) {
  let element;
  if (typeof target === 'string') {
    element = document.querySelector(target);
  } else {
    element = target;
  }
  
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

export function getScrollProgress(element) {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  
  if (rect.top > windowHeight) return 0;
  if (rect.bottom < 0) return 1;
  
  const totalDistance = windowHeight + rect.height;
  const traveled = windowHeight - rect.top;
  
  return Math.max(0, Math.min(1, traveled / totalDistance));
}

let scrollPosition = 0;

export function lockScroll() {
  scrollPosition = window.pageYOffset;
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollPosition}px`;
  document.body.style.width = '100%';
}

export function unlockScroll() {
  document.body.style.overflow = '';
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  window.scrollTo(0, scrollPosition);
}
