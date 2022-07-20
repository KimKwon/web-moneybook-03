import { SELECTOR_MAP } from '@/constants/selector-map';
import reducer from './reducer';

const { ACCOUNT_HISTORY, CATEGORY, PAYMENT_METHODS } = SELECTOR_MAP;

/**
 * @param  { } initialState
 * @param  { } reducer
 */

const createStore = (initialState, reducer) => {
  return {
    reducer,
    listeners: {
      [ACCOUNT_HISTORY]: [],
      [CATEGORY]: [],
      [PAYMENT_METHODS]: [],
    },
    state: {
      [ACCOUNT_HISTORY]: [],
      [CATEGORY]: [1, 2, 3, 4],
      [PAYMENT_METHODS]: [],
    },

    isValidSelector(selector) {
      return selector && selector in this.listeners;
    },

    getState(selector) {
      if (selector && selector in this.state) return Object.freeze(this.state[selector]);

      return Object.freeze(this.state);
    },

    notify(selector) {
      if (!this.isValidSelector(selector)) return;

      this.listeners[selector].forEach((listener) => {
        listener();
      });
    },

    subscribe(selector, listener) {
      if (!this.isValidSelector(selector)) return;

      this.listeners[selector].push(listener);

      return () => this.listeners[selector].filter((l) => l !== listener);
    },

    dispatch(action, payload, selector) {
      this.state = this.reducer(this.state, action, payload);
      this.notify(selector);
    },
  };
};

const store = createStore(undefined, reducer);

export default store;
