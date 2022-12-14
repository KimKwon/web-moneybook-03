import Component from '@/lib/component';
import checkbox from '@/assets/icon/save-button-active.svg';
import { calcGroupedDateInfo } from '@/utils/calculation';

class AccountHistoryHeader extends Component {
  constructor($target, initialState) {
    super($target, initialState);
  }

  init() {
    this.$target.addEventListener('click', this.handelFilterClickEvent.bind(this));
  }

  afterRender() {
    const { filterInfo } = this.state;

    const $filterCheckboxes = this.$target.querySelectorAll('.filter-checkbox');
    $filterCheckboxes.forEach(($checkbox) => {
      const { type } = $checkbox.dataset;
      $checkbox.classList.toggle('active', filterInfo[type]);
    });
  }

  handelFilterClickEvent(e) {
    const { filterInfo, filterAccountHistory } = this.state;

    const $filterCheckbox = e.target.closest('.filter-checkbox');
    if (!$filterCheckbox) return;
    const filterType = $filterCheckbox.dataset['type'];

    filterInfo[filterType] = !filterInfo[filterType];

    filterAccountHistory();
  }

  template() {
    const { accountHistoryByDate } = this.state;
    const { length, totalIncome, totalExpenditure } = calcGroupedDateInfo(accountHistoryByDate);
    return /* html */ `
      <h1>전체내역 ${length}건</h1>
      <div class="account-history-filter">
        <div class="filter-checkbox active" data-type="income">
          ${checkbox}
          <span>수입</span>
          <span class="filter-checkbox__amount">${totalIncome.toLocaleString()}</span>
        </div>
        <div class="filter-checkbox active" data-type="expenditure">
          ${checkbox} 
          <span>지출</span>
          <span class="filter-checkbox__amount">${totalExpenditure.toLocaleString()}</span>
        </div>
      </div>
    `;
  }

  render() {
    this.$target.innerHTML = this.template();
    this.afterRender();
  }
}

export default AccountHistoryHeader;
