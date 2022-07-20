import { SELECTOR_MAP } from './constants/selector-map';
import store from './store';

const app = document.querySelector('#app');

class Component {
  constructor() {
    this.init();
    this.render();
  }

  init() {
    store.subscribe(SELECTOR_MAP.CATEGORY, this.render);
  }

  render() {
    const category = store.getState(SELECTOR_MAP.CATEGORY);
    app.innerHTML = `
      <button class="something">으아아악!</button>
      <ul>
        ${category
          .map(
            (c) =>
              `<li>
            ${c}
          </li>`,
          )
          .join('')}
      </ul>
    `;

    app.addEventListener('click', (e) => {
      const target = e.target.closest('button.something');
      if (!target) return;

      store.dispatch('ADD', 8, SELECTOR_MAP.CATEGORY);
    });
  }
}

new Component();
