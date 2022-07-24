import './index.scss';

import { SELECTOR_MAP } from '@/constants/selector-map';
import store from '@/store';
import leftArrowIcon from '@/assets/icon/left-arrow.svg';
import rightArrowIcon from '@/assets/icon/right-arrow.svg';
import Component from '@/lib/component';

export default class MonthController extends Component {
  constructor($target) {
    super($target);
  }

  didMount() {
    this.$year = this.$target.querySelector('.month-controller-year');
    this.$month = this.$target.querySelector('.month-controller-month');
    this.refetchDate();
    store.subscribe(SELECTOR_MAP.CURRENT_DATE, this.refetchDate.bind(this));
    this.$target.addEventListener('click', this.changeMonth);
  }

  changeMonth(e) {
    const { month } = store.getState(SELECTOR_MAP.CURRENT_DATE);
    const $prev = e.target.closest('button');
    if (!$prev) return;
    const nextMonth = $prev.className === 'month-controller__prev' ? month - 1 : month + 1;
    store.dispatch('updateMonth', nextMonth, SELECTOR_MAP.CURRENT_DATE);
  }

  refetchDate() {
    const { year, month } = store.getState(SELECTOR_MAP.CURRENT_DATE);
    this.$year.innerText = year;
    this.$month.innerText = `${month} 월`;
  }

  template() {
    return `
        <button class="month-controller__prev">
            <img src="${leftArrowIcon}">
        </button>
        <div>
            <div class="month-controller-month"></div>
            <div class="month-controller-year"></div>
        </div> 
        <button class="month-controller__next">
            <img src="${rightArrowIcon}">
        </button>
    `;
  }

  render() {
    this.$target.innerHTML = this.template();
  }
}
