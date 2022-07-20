import { SELECTOR_MAP } from '@/constants/selector-map';
import reducer from './reducer';

const { ACCOUNT_HISTORY, CATEGORY, PAYMENT_METHODS } = SELECTOR_MAP;

/**
 * @param  { } initialState
 * @param  { } reducer
 */

const createStore = (initialState, reducer) => {
  const listeners = {
    [ACCOUNT_HISTORY]: [],
    [CATEGORY]: [],
    [PAYMENT_METHODS]: [],
  };
  //initialState ||
  let state = {
    [ACCOUNT_HISTORY]: [],
    [CATEGORY]: [1, 2, 3, 4],
    [PAYMENT_METHODS]: [],
  };

  const isValidSelector = (selector) => {
    return selector && selector in listeners;
  };

  const notify = (selector) => {
    if (!isValidSelector(selector)) return;

    listeners[selector].forEach((listener) => {
      listener();
    });
  };

  return {
    getState(selector) {
      if (selector && selector in state) return Object.freeze(state[selector]);

      return Object.freeze(state);
    },

    subscribe(selector, listener) {
      if (!isValidSelector(selector)) return;

      listeners[selector].push(listener);

      return () => listeners[selector].filter((l) => l !== listener);
    },

    dispatch(action, payload, selector) {
      state = reducer(state, action, payload);
      notify(selector);
    },
  };
};

const store = createStore(undefined, reducer);

export default store;
