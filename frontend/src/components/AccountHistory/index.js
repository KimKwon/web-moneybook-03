import './index.scss';
import Component from '@/lib/component';
import store from '@/store/index';
import { SELECTOR_MAP } from '@/constants/selector-map';
import AccountList from '../AccountList/index';
import { dayToString } from '@/utils/date';

class AccountHitory extends Component {
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
  }

  handelFilterClickEvent(e) {
    const $filterCheckbox = e.target.closest('.filter-checkbox');
    if (!$filterCheckbox) return;
    const filterType = $filterCheckbox.dataset['type'];
    this.filterInfo[filterType] = !this.filterInfo[filterType];
    this.filterAccountHistory();
  }

  filterAccountHistory(e) {
    const accountHistoryList = this.originAccountHistory.filter((account) => {
      return (
        (this.filterInfo.income && account.isProfit) ||
        (this.filterInfo.expenditure && !account.isProfit)
      );
    });
    this.accountHistoryByDate = this.groupByDate(accountHistoryList);
    this.reFatchAccountHistoryList();
  }

  changeFormData(e) {
    const $account = e.target.closest('.account-wrapper');
    if (!$account) return;
    const idx = $account.dataset['idx'];
    const account = this.originAccountHistory[idx];
    this.onChangeFormData(account);
  }

  groupByDate(targetData) {
    const groupData = targetData.reduce((acc, cur, idx) => {
      let len = acc.length;
      if (len === 0 || acc[len - 1].date != cur.date.getDate()) {
        acc.push({});
        len = acc.length;
      }
      if (!acc[len - 1].date) {
        acc[len - 1].date = cur.date.getDate();
        acc[len - 1].month = cur.date.getMonth();
        acc[len - 1].day = dayToString(cur.date.getDay()); //
        acc[len - 1].data = [];
        acc[len - 1].income = 0;
        acc[len - 1].expenditure = 0;
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

  reFatchAccountHistoryList() {
    this.$accountList.setState({ accountHistoryByDate: this.accountHistoryByDate });
    this.$accountList.render();
  }

  template() {
    return /* html */ `
        <div class="account-history">
          <div class="account-history-header">
            <h2>전체내역</h2>
            <div class="account-history-filter">
                <div class="filter-checkbox" data-type="income" >[ ] 수입</div>
                <div class="filter-checkbox" data-type="expenditure" >[ ] 지출</div>
            </div>
          </div>  
          <div class="account-history-list"></div>
        </div>
    `;
  }

  render() {
    this.$target.insertAdjacentHTML('beforeend', this.template());
    const $historyList = this.$target.querySelector('.account-history-list');
    this.$accountList = new AccountList($historyList, {
      accountHistoryByDate: this.accountHistoryByDate,
    });
  }
}

export default AccountHitory;
