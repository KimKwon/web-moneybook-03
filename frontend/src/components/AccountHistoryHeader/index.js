import Component from '@/lib/component';
import checkbox from '@/assets/icon/save-button-active.svg';

class AccountHistoryHeader extends Component {
  constructor($target, initialState) {
    super($target, initialState);
  }

  init() {
    this.$target.addEventListener('click', this.handelFilterClickEvent.bind(this));
  }

  handelFilterClickEvent(e) {
    const { filterInfo, filterAccountHistory } = this.state;

    const $filterCheckbox = e.target.closest('.filter-checkbox');
    if (!$filterCheckbox) return;
    const filterType = $filterCheckbox.dataset['type'];
    filterInfo[filterType] = !filterInfo[filterType];
    filterAccountHistory();
  }

  calcGroupedDateInfo() {
    const { accountHistoryByDate } = this.state;
    const length = accountHistoryByDate.reduce((acc, timeGroup) => acc + timeGroup.data.length, 0);

    const [totalIncome, totalExpenditure] = accountHistoryByDate.reduce(
      (acc, timeGroup) => [acc[0] + timeGroup.income, acc[1] + timeGroup.expenditure],
      [0, 0],
    );

    return { length, totalIncome, totalExpenditure };
  }

  template() {
    const { length, totalIncome, totalExpenditure } = this.calcGroupedDateInfo();
    return /* html */ `
      <h1>전체내역 ${length}건</h1>
      <div class="account-history-filter">
        <div class="filter-checkbox" data-type="income">
          ${checkbox}
          <span>수입 ${totalIncome.toLocaleString()}</span>
        </div>
        <div class="filter-checkbox" data-type="expenditure">
          ${checkbox} 
          <span>지출 ${totalExpenditure.toLocaleString()}</span>
        </div>
      </div>
    `;
  }

  render() {
    this.$target.innerHTML = this.template();
  }
}

export default AccountHistoryHeader;
