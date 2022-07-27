import './index.scss';
import Component from '@/lib/component';
import store from '@/store/index';
import { SELECTOR_MAP } from '@/constants/selector-map';

const DAY = ['일', '월', '화', '수', '목', '금', '토'];

class Calendar extends Component {
  constructor($target, initialState) {
    super($target, initialState);
  }
  init() {}
  didMount() {}
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
  template() {
    return `
    <div class="calendar">
        <div class="calendar-header">${this.headerTemplate()}</div>
        <div class="calendar-body">body</div>
        <div class="calendar-footer">
        ${this.footerTemplate()}
        </div>
    </div>
    `;
  }

  render() {
    this.$target.innerHTML = this.template();
  }
}

export default Calendar;
