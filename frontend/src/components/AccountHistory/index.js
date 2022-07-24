import './index.scss';
import Component from '@/lib/component';
import store from '@/store/index';
import { SELECTOR_MAP } from '@/constants/selector-map';
class AccountHitory extends Component {
  constructor($target, initialState, onChangeFormData) {
    super($target);
    this.onChangeFormData = onChangeFormData;
  }
  init() {
    this.filterInfo = { income: true, expenditure: true };
    this.originAccountHistory = store.getState(SELECTOR_MAP.ACCOUNT_HISTORY);
    this.setIndex(this.originAccountHistory);
    this.accountHistoryList = [...this.originAccountHistory];
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
  filterAccountHistory(e) {
    this.accountHistoryList = this.originAccountHistory.filter((account) => {
      return (
        (this.filterInfo.income && account.isProfit) ||
        (this.filterInfo.expenditure && !account.isProfit)
      );
    });
    this.reFatchList();
    // this.render();
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
        acc[len - 1].day = this.dayToString(cur.date.getDay()); //
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
  dayToString(day) {
    const dayMap = {
      0: '월',
      1: '화',
      2: '수',
      3: '목',
      4: '금',
      5: '토',
      6: '일',
    };
    return dayMap[day];
  }
  setIndex(targetData) {
    targetData.map((item, index) => (item['idx'] = index));
  }
  listTemplate() {
    const groupByAccountHistory = this.groupByDate(this.accountHistoryList);
    return ` ${groupByAccountHistory
      .map(
        (accountByDate) =>
          `
            <div class="account-history-bydate">
              <div class="account-history-bydate-header">
                <span class="account-history-date">${accountByDate.month}월 ${
            accountByDate.date
          }일 ${accountByDate.day}</span>
              <div>
            ${accountByDate.income !== 0 ? `<span>수입 ${accountByDate.income}</span>` : ''}
            ${
              accountByDate.expenditure !== 0
                ? `<span>지출 ${accountByDate.expenditure}</span>`
                : ''
            } 
          </div>
        </div>
        ${accountByDate.data
          .map((account) => {
            const { content, methodName, amount, categoryName, isProfit, idx } = account;
            return `
            <div data-idx='${idx}' class="account-wrapper">
              <div class="account-category">
                <div class="category-tag">
                    <span>${categoryName}</span>
                </div>
              </div>
              <div class="account-history-content">${content}</div>
              <div class="account-history-method">${methodName}</div>
              <div class="account-history-amount">${isProfit ? '' : '-'}${amount.toLocaleString(
              'ko-KR',
            )} 원</div>
            </div>
            `;
          })
          .join('')}
    `,
      )
      .join('')}
    `;
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
          <div class="account-history-list">${this.listTemplate()}</div>
        </div>
    `;
  }
  reFatchList() {
    const listTemplate = this.listTemplate();
    const $accountHistoryList = this.$target.querySelector('.account-history-list');
    $accountHistoryList.innerHTML = listTemplate;
  }

  render() {
    this.$target.insertAdjacentHTML('beforeend', this.template());
  }
}

export default AccountHitory;
