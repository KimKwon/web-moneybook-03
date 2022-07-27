import './index.scss';
import Component from '@/lib/component';
import store from '@/store/index';
import { SELECTOR_MAP } from '@/constants/selector-map';
import { groupByDate, fillEmptyDay } from '@/utils/date';

const DAY = ['일', '월', '화', '수', '목', '금', '토'];

class Calendar extends Component {
  constructor($target, initialState) {
    super($target, initialState);
    this.setData();
  }
  init() {}
  didMount() {
    store.subscribe(SELECTOR_MAP.CURRENT_DATE, this.setData.bind(this));
  }
  headerTemplate() {
    return `
    ${DAY.map((day) => `<span>${day}</span>`).join('')}
    `;
  }

  footerTemplate() {
    const totalIncome = 44;
    const totalExpenditure = 55;
    return `
        <span>
            <span>총 수입 ${totalIncome}</span>
            <span>총 지출 ${totalExpenditure}</span>
        </span>
        <span>
            총계 ${totalIncome + totalExpenditure}
        </span>
    `;
  }
  calendarTemplate() {}
  template() {
    return `
    <div class="calendar">
        <div class="calendar-header">${this.headerTemplate()}</div>
        <div class="calendar-body">${this.calendarTemplate()}</div>
        <div class="calendar-footer">
        ${this.footerTemplate()}
        </div>
    </div>
    `;
  }

  async setData() {
    const { year, month } = store.getState(SELECTOR_MAP.CURRENT_DATE);
    const accountHistory = store.getState(SELECTOR_MAP.ACCOUNT_HISTORY);
    const historyDataByDate = groupByDate(accountHistory);
    const filledData = fillEmptyDay(historyDataByDate, year, month);
    this.setState({ calendarData: filledData });
    console.log(filledData);
  }

  render() {
    this.$target.innerHTML = this.template();
  }
}

export default Calendar;
