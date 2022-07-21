class Router {
  constructor() {
    this.currentActivePage = null;
    this.routes = [
      { path: /^\/$/, element: () => console.log('메인페이지 렌더!') },
      { path: /^\/calendar$/, element: () => console.log('달력페이지 렌더!') },
      { path: /^\/statistic$/, element: () => console.log('calendar page render!') },
    ];

    this.#init();
  }

  #getCurrentPath() {
    if (!window.location) return '/';

    return window.location.pathname;
  }

  #route() {
    const targetPage = this.routes.find((route) => route.path.test(this.#getCurrentPath()));
    if (!targetPage) {
      /**
       * TODO :: NOT FOUND PAGE 인스턴스 호출 or 메인페이지로 fallback
       */
      console.log('NOT FOUND!');
      return;
    }

    targetPage.element();
  }

  #init() {
    window.addEventListener('historychange', ({ detail: { to } }) => {
      const shouldReplaced = this.#getCurrentPath === to;
      const mutateState = shouldReplaced ? history.replaceState : history.pushState;
      mutateState(null, '', to);

      this.#route();
    });

    window.addEventListener('popstate', () => {
      this.#route();
    });

    this.#route();
  }

  static navigate(to) {
    const historyChangeEvent = new CustomEvent('historychange', {
      detail: {
        to,
      },
    });

    dispatchEvent(historyChangeEvent);
  }
}

export default Router;
