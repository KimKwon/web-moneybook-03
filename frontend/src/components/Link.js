import Router from '@/lib/router';

class Link extends HTMLAnchorElement {
  constructor() {
    super();

    this.addEventListener('click', (e) => {
      e.preventDefault();
      const target = e.target;
      const nextPathname = target.href.replace(window.location.origin, '');
      Router.navigate(nextPathname);
    });
  }
}

function defineLinkComponent() {
  customElements.define('my-anchor', Link, { extends: 'a' });
}

export default defineLinkComponent;
