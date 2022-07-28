import CalendarPage from '@/pages/Calendar';
import Main from '@/pages/Main';
import NotFound from '@/pages/NotFound';
import Statistic from '@/pages/Statistic';

class Router {
  constructor($rootTarget) {
    this.$rootTarget = $rootTarget;
    this.currentActivePage = null;
    this.routes = [
      { path: /^\/$/, element: () => Main(this.$rootTarget) },
      { path: /^\/calendar$/, element: () => CalendarPage(this.$rootTarget) },
      { path: /^\/statistic$/, element: () => new Statistic(this.$rootTarget) },
    ];

    this.#init();
  }

  static getCurrentPath() {
    if (!window.location) return '/';

    return window.location.pathname;
  }

  static navigate(to) {
    const historyChangeEvent = new CustomEvent('historychange', {
      detail: {
        to,
      },
    });

    dispatchEvent(historyChangeEvent);
  }

  #route() {
    const targetPage = this.routes.find((route) => route.path.test(Router.getCurrentPath()));
    if (!targetPage) {
      NotFound(this.$rootTarget);
      return;
    }

    targetPage.element();
  }

  #init() {
    window.addEventListener('historychange', ({ detail: { to } }) => {
      const shouldReplaced = Router.getCurrentPath === to;

      if (shouldReplaced) history.replaceState(null, '', to);
      else history.pushState(null, '', to);

      this.#route();
    });

    window.addEventListener('popstate', () => {
      this.#route();
    });

    this.#route();
  }
}

export default Router;
