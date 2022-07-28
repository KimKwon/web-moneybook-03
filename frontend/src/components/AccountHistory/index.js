import './index.scss';
import Component from '@/lib/component';
import store from '@/store/index';
import { SELECTOR_MAP } from '@/constants/selector-map';
import AccountHistoryTable from '../AccountHistoryTable/index';
import { groupByDate } from '@/utils/date';
import AccountHistoryHeader from '../AccountHistoryHeader/index';
import Loader from '../Loader/index';

class AccountHistory extends Component {
  constructor($target, initialState, onChangeFormData) {
    super($target);
    this.onChangeFormData = onChangeFormData;
  }

  init() {
    this.filterInfo = { income: true, expenditure: true };
    this.refineData();
  }

  refineData() {
    this.originAccountHistory = store.getState(SELECTOR_MAP.ACCOUNT_HISTORY);
    this.setIndex(this.originAccountHistory);
    this.accountHistoryByDate = groupByDate(this.originAccountHistory);
  }

  didMount() {
    this.$target.addEventListener('click', this.changeFormData.bind(this));

    store.subscribe(SELECTOR_MAP.ACCOUNT_HISTORY, () => {
      this.refineData();
      this.filterAccountHistory();
    });
  }

  filterAccountHistory() {
    const accountHistory = this.originAccountHistory.filter((historyItem) => {
      return (
        (this.filterInfo.income && historyItem.isProfit) ||
        (this.filterInfo.expenditure && !historyItem.isProfit)
      );
    });

    this.accountHistoryByDate = groupByDate(accountHistory);
    this.refetchAccountHistoryTable();
  }

  changeFormData(e) {
    const $account = e.target.closest('.history-item-wrapper');
    if (!$account) return;
    const idx = $account.dataset['idx'];
    const account = this.originAccountHistory[idx];
    this.onChangeFormData(account);
  }

  setIndex(targetData) {
    targetData.map((item, index) => (item['idx'] = index));
  }

  refetchAccountHistoryTable() {
    store.cleanupListener(SELECTOR_MAP.CATEGORY);
    this.$accountTable.setState({ accountHistoryByDate: this.accountHistoryByDate });
    this.$accountHeader.setState({ accountHistoryByDate: this.accountHistoryByDate });
  }

  template() {
    return /* html */ `
        <div class="account-history">
          <div class="account-history__header"></div>  
          <div class="account-history__table"></div>
        </div>
    `;
  }

  render() {
    this.$target.insertAdjacentHTML('beforeend', this.template());
    const $historyTable = this.$target.querySelector('.account-history__table');
    const $historyHeader = this.$target.querySelector('.account-history__header');
    store.subscribe(SELECTOR_MAP.IS_LOADING, () => Loader.showLoader($historyTable));
    this.$accountTable = new AccountHistoryTable($historyTable, {
      accountHistoryByDate: this.accountHistoryByDate,
    });

    this.$accountHeader = new AccountHistoryHeader($historyHeader, {
      accountHistoryByDate: this.accountHistoryByDate,
      filterInfo: this.filterInfo,
      filterAccountHistory: this.filterAccountHistory.bind(this),
    });
  }
}

export default AccountHistory;
