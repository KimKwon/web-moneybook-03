import './index.scss';

import fileTextIcon from '@/assets/icon/file-text.svg';
import calendarIcon from '@/assets/icon/calendar.svg';
import chartIcon from '@/assets/icon/chart.svg';
import MonthController from './monthController';
import Component from '@/lib/component';

const NAV_INFO = [
  { className: 'nav-main', href: '/', icon: fileTextIcon },
  { className: 'nav-calendar', href: '/calendar', icon: calendarIcon },
  { className: 'nav-statistic', href: '/statistic', icon: chartIcon },
];
export default class Header extends Component {
  constructor($target) {
    super($target);
  }

  isNavItemActive(targetHref) {
    return location.pathname === targetHref;
  }

  showNavItem() {
    return NAV_INFO.map(
      ({ className, href, icon }) => `
            <a is="my-anchor" class="${
              className + (this.isNavItemActive(href) ? ' active' : '')
            }" href=${href}>${icon}</a>
          `,
    ).join('');
  }

  template() {
    return /*html*/ `
      <div class="header">
        <a is="my-anchor" href="/" class="header-title" >우아한 가계부</a>
        <div class="month-controller" ></div>
        <div class="nav">
          ${this.showNavItem()}
        </div>
      </div>
    `;
  }

  render() {
    this.$target.innerHTML = this.template();
    const $monthController = this.$target.querySelector('.month-controller');
    new MonthController($monthController);
  }
}
