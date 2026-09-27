import { getFramePath } from '../data/assets.js';

export function lazyLoadImages(container = document) {
  const images = container.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        if (img.dataset.srcset) {
          img.srcset = img.dataset.srcset;
        }
        
        img.onload = () => {
          img.classList.add('loaded');
          img.removeAttribute('data-src');
          if (img.dataset.srcset) {
            img.removeAttribute('data-srcset');
          }
        };
        
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: '200px 0px',
    threshold: 0.01
  });
  
  images.forEach(img => imageObserver.observe(img));
}

export function preloadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export async function preloadFrameSequence(sequenceKey, startFrame, endFrame) {
  const promises = [];
  for (let i = startFrame; i <= endFrame; i++) {
    const src = getFramePath ? getFramePath(sequenceKey, i) : `/${sequenceKey}/${i.toString().padStart(4, '0')}.jpg`;
    promises.push(preloadImage(src).catch(e => console.warn('Failed to preload frame', src, e)));
  }
  return Promise.all(promises);
}
