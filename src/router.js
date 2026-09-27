export const router = {
  routes: [],
  container: null,
  currentRoute: null,

  init(containerEl) {
    this.container = containerEl;
    window.addEventListener('hashchange', () => this.handleHashChange());
    this.handleHashChange();
  },

  register(pattern, handler) {
    this.routes.push({ pattern, handler });
  },

  navigate(hash) {
    window.location.hash = hash;
  },

  getCurrentRoute() {
    return this.currentRoute;
  },

  async handleHashChange() {
    const hash = window.location.hash.slice(1) || '/';
    this.currentRoute = hash;
    
    let matchedRoute = null;
    let params = {};

    for (const route of this.routes) {
      if (route.pattern instanceof RegExp) {
        const match = hash.match(route.pattern);
        if (match) {
          matchedRoute = route;
          params = match.groups || {};
          break;
        }
      } else if (typeof route.pattern === 'string') {
        const routeParts = route.pattern.split('/');
        const hashParts = hash.split('/');
        
        if (routeParts.length === hashParts.length) {
          let isMatch = true;
          const currentParams = {};
          
          for (let i = 0; i < routeParts.length; i++) {
            if (routeParts[i].startsWith(':')) {
              currentParams[routeParts[i].slice(1)] = hashParts[i];
            } else if (routeParts[i] !== hashParts[i]) {
              isMatch = false;
              break;
            }
          }
          
          if (isMatch) {
            matchedRoute = route;
            params = currentParams;
            break;
          }
        }
      }
    }

    if (this.container) {
      this.container.innerHTML = '';
      window.scrollTo(0, 0);
      
      if (matchedRoute) {
        await matchedRoute.handler(params, this.container);
      } else {
        this.container.innerHTML = `
          <div class="page-missing">
            <p class="type-meta">BITE — ISSUE 01</p>
            <h1 class="type-display">PAGE NOT FOUND</h1>
            <p class="type-editorial-italic">That page isn’t in this issue.</p>
            <a href="#/" class="btn-editorial">BACK TO THE COVER</a>
          </div>
        `;
      }
    }
  }
};

export function link(hash) {
  return (e) => {
    e.preventDefault();
    router.navigate(hash);
  };
}
