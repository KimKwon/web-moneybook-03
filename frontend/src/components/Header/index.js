import './index.scss';

import { SELECTOR_MAP } from '@/constants/selector-map';
import store from '@/store';

import Component from '@/lib/component';
import fileTextIcon from '@/assets/icon/file-text.svg';
import calendarIcon from '@/assets/icon/calendar.svg';
import chartIcon from '@/assets/icon/chart.svg';
import leftArrowIcon from '@/assets/icon/left-arrow.svg';
import rightArrowIcon from '@/assets/icon/right-arrow.svg';

export default class Header extends Component {
  constructor($target, initialState) {
    super($target);
  }
  //store.subscribe('month', this.render.bind(this));
  init() {
    this.$element = document.createElement('div');
    this.$element.className = 'header';
  }

  didMount() {
    this.$element.addEventListener('click', (e) => {
      const { month } = store.getState(SELECTOR_MAP.CURRENT_DATE);
      const $prev = e.target.closest('button');
      const nextMonth = $prev.className === 'month-controller__prev' ? month - 1 : month + 1;
      store.dispatch('updateMonth', nextMonth, SELECTOR_MAP.CURRENT_DATE);
    });
    store.subscribe(SELECTOR_MAP.CURRENT_DATE, this.render.bind(this));
  }

  template() {
    const { year, month } = store.getState(SELECTOR_MAP.CURRENT_DATE);
    return `
        <a is="my-anchor" href="/" class="header-title" >우아한 가계부</a> 
        <div class="month-controller">
          <button class="month-controller__prev">
            <img src="${leftArrowIcon}">
          </button>
          <div>
            <div class="month-controller-year">${month} 월</div>
            <div class="month-controller-month">${year}</div>
          </div> 
          <button class="month-controller__next">
            <img src="${rightArrowIcon}">
          </button>
        </div>
        <div class='nav'>
          <a class="nav-main" is="my-anchor" href="/"><img src="${fileTextIcon}"></a> 
          <a class="nav-calendar" is="my-anchor" href="/calendar"><img src="${calendarIcon}"></a>
          <a class="nav-statistic" is="my-anchor" href="/statistic"><img src="${chartIcon}"></a>
        </div>
    `;
  }
  render() {
    this.$element.innerHTML = this.template();
    this.$target.appendChild(this.$element);
  }
}
