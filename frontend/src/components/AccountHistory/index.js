import './index.scss';
import Component from '@/lib/component';
import store from '@/store/index';
import { SELECTOR_MAP } from '@/constants/selector-map';
import AccountHistoryTable from '../AccountHistoryTable/index';
import { dayToString } from '@/utils/date';

class AccountHitoryTable extends Component {
  constructor($target, initialState, onChangeFormData) {
    super($target);
    this.onChangeFormData = onChangeFormData;
  }

  init() {
    this.filterInfo = { income: true, expenditure: true };
    this.originAccountHistory = store.getState(SELECTOR_MAP.ACCOUNT_HISTORY);
    this.setIndex(this.originAccountHistory);
    this.accountHistoryByDate = this.groupByDate(this.originAccountHistory);
  }

  didMount() {
    this.$target.addEventListener('click', this.changeFormData.bind(this));
    this.$target
      .querySelector('.account-history-filter')
      .addEventListener('click', this.handelFilterClickEvent.bind(this));

    store.subscribe(SELECTOR_MAP.ACCOUNT_HISTORY, () => {
      this.init();
      this.filterAccountHistory();
    });
  }

  handelFilterClickEvent(e) {
    const $filterCheckbox = e.target.closest('.filter-checkbox');
    if (!$filterCheckbox) return;
    const filterType = $filterCheckbox.dataset['type'];
    this.filterInfo[filterType] = !this.filterInfo[filterType];
    this.filterAccountHistory();
  }

  filterAccountHistory() {
    const accountHistory = this.originAccountHistory.filter((historyItem) => {
      return (
        (this.filterInfo.income && historyItem.isProfit) ||
        (this.filterInfo.expenditure && !historyItem.isProfit)
      );
    });

    this.accountHistoryByDate = this.groupByDate(accountHistory);
    this.reFatchAccountHistoryTable();
  }

  changeFormData(e) {
    const $account = e.target.closest('.history-item-wrapper');
    if (!$account) return;
    const idx = $account.dataset['idx'];
    const account = this.originAccountHistory[idx];
    this.onChangeFormData(account);
  }

  groupByDate(targetData) {
    const sortedTargetData = [...targetData];
    sortedTargetData.sort(function (a, b) {
      return new Date(a.date) - new Date(b.date);
    });
    const groupData = sortedTargetData.reduce((acc, cur) => {
      let len = acc.length;
      const currentDate = new Date(cur.date);
      if (len === 0 || acc[len - 1].date != currentDate.getDate()) {
        acc.push({});
        len = acc.length;
      }
      if (!acc[len - 1].date) {
        acc[len - 1] = {
          date: currentDate.getDate(),
          month: currentDate.getMonth(),
          day: dayToString(currentDate.getDay()),
          data: [],
          income: 0,
          expenditure: 0,
        };
      }
      acc[len - 1].income += cur.isProfit ? cur.amount : 0;
      acc[len - 1].expenditure += cur.isProfit ? 0 : cur.amount;
      acc[len - 1].data.push(cur);
      return [...acc];
    }, []);
    return groupData;
  }

  setIndex(targetData) {
    targetData.map((item, index) => (item['idx'] = index));
  }

  reFatchAccountHistoryTable() {
    this.$accountTable.setState({ accountHistoryByDate: this.accountHistoryByDate });
  }

  template() {
    return /* html */ `
        <div class="account-history">
          <div class="account-history-header">
            <h1 >전체내역</h1>
            <div class="account-history-filter">
                <div class="filter-checkbox" data-type="income" >[ ] 수입</div>
                <div class="filter-checkbox" data-type="expenditure" >[ ] 지출</div>
            </div>
          </div>  
          <div class="account-history-table"></div>
        </div>
    `;
  }

  render() {
    this.$target.insertAdjacentHTML('beforeend', this.template());
    const $historyTable = this.$target.querySelector('.account-history-table');
    this.$accountTable = new AccountHistoryTable($historyTable, {
      accountHistoryByDate: this.accountHistoryByDate,
    });
  }
}

export default AccountHitoryTable;
