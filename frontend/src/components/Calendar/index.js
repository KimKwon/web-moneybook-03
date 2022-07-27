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
  dayOfWeekTemplate() {
    return `
    ${DAY.map((day) => `<div>${day}</div>`).join('')}
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
  emptyCalendarDate(num) {
    let emptyTemplate = '';
    for (let i = 0; i < num; i++) {
      emptyTemplate += `<div></div>`;
    }
    return emptyTemplate;
  }
  dateGridTemplate() {
    const { calendarData, month, year } = this.state;
    if (!calendarData) return;
    const startDay = new Date(year, month - 1, 1).getDay();
    const lastDate = new Date(year, month, 0).getDate();
    console.log(month);
    console.log(year);
    return `
        ${this.emptyCalendarDate(startDay)}    
        ${calendarData.map((item) => `<div>item</div>`).join('')}
        ${this.emptyCalendarDate(7 - ((lastDate % 7) - (7 - startDay)))}    
    `;
  }
  template() {
    return `
    <div class="calendar">
        <div class="calendar-header">${this.dayOfWeekTemplate()}</div>
        <div class="calendar-body">${this.dateGridTemplate()}</div>
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
    this.setState({ year, month, calendarData: filledData });
  }

  render() {
    this.$target.innerHTML = this.template();
  }
}

export default Calendar;
