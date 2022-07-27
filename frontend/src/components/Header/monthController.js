import './index.scss';

import { SELECTOR_MAP } from '@/constants/selector-map';
import store from '@/store';
import leftArrowIcon from '@/assets/icon/left-arrow.svg';
import rightArrowIcon from '@/assets/icon/right-arrow.svg';
import Component from '@/lib/component';
import debounce from '@/utils/debounce';
import { getAccountHistory } from '@/lib/api/accountHistory';
import { getStartAndEndDate } from '@/utils/date';

export default class MonthController extends Component {
  constructor($target) {
    super($target);
  }

  didMount() {
    this.$year = this.$target.querySelector('.month-controller-year');
    this.$month = this.$target.querySelector('.month-controller-month');
    this.refetchDate();
    store.subscribe(SELECTOR_MAP.CURRENT_DATE, this.refetchDate.bind(this));
    this.$target.addEventListener('click', this.changeMonth.bind(this));

    this.debouncedRequest = debounce(this.requestRefetchHistory.bind(this));
  }

  changeMonth(e) {
    const { month } = store.getState(SELECTOR_MAP.CURRENT_DATE);
    const $prev = e.target.closest('button');
    if (!$prev) return;
    const nextMonth = $prev.className === 'month-controller__prev' ? month - 1 : month + 1;
    store.dispatch('updateMonth', nextMonth, SELECTOR_MAP.CURRENT_DATE);
    this.debouncedRequest();
  }

  async requestRefetchHistory() {
    const { year, month } = store.getState(SELECTOR_MAP.CURRENT_DATE);
    store.dispatch('changeLoadingState', true, SELECTOR_MAP.IS_LOADING);
    const nextAccountHistory = await getAccountHistory({
      ...getStartAndEndDate(new Date(year, month - 1)),
    });

    /**
     * 로딩 상태 확인을 위해 임시로 setTimeout 부여.
     */
    setTimeout(() => {
      store.dispatch('changeLoadingState', false, SELECTOR_MAP.IS_LOADING);
      store.dispatch('setAccountHistory', nextAccountHistory, SELECTOR_MAP.ACCOUNT_HISTORY);
    }, 1500);
  }

  refetchDate() {
    const { year, month } = store.getState(SELECTOR_MAP.CURRENT_DATE);
    this.$year.innerText = year;
    this.$month.innerText = `${month}월`;
  }

  template() {
    return `
        <button class="month-controller__prev">
          ${leftArrowIcon}
        </button>
        <div>
            <div class="month-controller-month"></div>
            <div class="month-controller-year"></div>
        </div> 
        <button class="month-controller__next">
          ${rightArrowIcon}
        </button>
    `;
  }

  render() {
    this.$target.innerHTML = this.template();
  }
}
