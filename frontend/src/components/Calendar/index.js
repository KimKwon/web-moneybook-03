import './index.scss';
import Component from '@/lib/component';
import store from '@/store/index';
import { SELECTOR_MAP } from '@/constants/selector-map';
import { groupByDate, fillEmptyDay } from '@/utils/date';
import { calcGroupedDateInfo } from '@/utils/calculation';
const DAY = ['일', '월', '화', '수', '목', '금', '토'];

class Calendar extends Component {
  constructor($target, initialState) {
    super($target, initialState);
    this.setData();
  }
  didMount() {
    store.subscribe(SELECTOR_MAP.ACCOUNT_HISTORY, this.setData.bind(this));
  }

  dayOfWeekTemplate() {
    return `
    ${DAY.map((day) => `<div>${day}</div>`).join('')}
    `;
  }

  footerTemplate() {
    const { calendarData, totalData } = this.state;
    const { totalIncome, totalExpenditure } = totalData;
    return `
        <span>
            <span>총 수입 ${totalIncome.toLocaleString()}</span>
            <span>총 지출 ${(totalExpenditure * -1).toLocaleString()}</span>
        </span>
        <span>
            총계 ${(totalIncome - totalExpenditure).toLocaleString()}
        </span>
    `;
  }

  calendarGridTemplate() {
    const { calendarData, month, year } = this.state;
    const startDay = new Date(year, month - 1, 1).getDay();
    const lastDate = new Date(year, month, 0).getDate();
    return `
        ${this.emptyCalendarDateTemplate(startDay)}    
        ${calendarData.map((item, index) => this.validCalendarDateTemplate(item)).join('')}
        ${this.emptyCalendarDateTemplate(7 - ((lastDate % 7) - (7 - startDay)))}    
    `;
  }

  emptyCalendarDateTemplate(num) {
    let emptyTemplate = '';
    for (let i = 0; i < num; i++) {
      emptyTemplate += `<div></div>`;
    }
    return emptyTemplate;
  }

  validCalendarDateTemplate(info) {
    const { date, income, expenditure } = info;
    const total = income - expenditure;

    return `
      <div>
        <div class="calendar-amount-info">
          ${
            income !== 0
              ? `<div class="calendar-income">${Number(income).toLocaleString()}</div>`
              : ``
          }
          ${
            expenditure !== 0
              ? `<div class="calendar-expenditure">${Number(
                  expenditure * -1,
                ).toLocaleString()}</div>`
              : ``
          }
          ${
            total !== 0 ? `<div class="calendar-total">${Number(total).toLocaleString()}</div>` : ''
          }
        </div>
        <span class="calendar-date">${date}</span>
    </div>`;
  }

  template() {
    return `
    <div class="calendar">
        <div class="calendar-header">${this.dayOfWeekTemplate()}</div>
        <div class="calendar-body">${this.calendarGridTemplate()}</div>
        <div class="calendar-footer">
        ${this.footerTemplate()}
        </div>
    </div>
    `;
  }

  setData() {
    const { year, month } = store.getState(SELECTOR_MAP.CURRENT_DATE);
    const accountHistory = store.getState(SELECTOR_MAP.ACCOUNT_HISTORY);
    const historyDataByDate = groupByDate(accountHistory);
    const totalData = calcGroupedDateInfo(historyDataByDate);
    const filledData = fillEmptyDay(historyDataByDate, year, month);
    this.setState({ year, month, calendarData: filledData, totalData });
  }

  render() {
    if (Object.keys(this.state).length === 0) return;
    this.$target.innerHTML = this.template();
  }
}

export default Calendar;
