import './index.scss';
import Component from '@/lib/component';
import store from '@/store/index';
import { SELECTOR_MAP } from '@/constants/selector-map';
class AccountHitory extends Component {
  constructor($target, initialState, onChangeFormData) {
    super($target);
    this.onChangeFormData = onChangeFormData;
  }
  didMount() {
    this.$target.addEventListener('click', this.changeFormData.bind(this));
  }
  changeFormData(e) {
    const $account = e.target.closest('.account-wrapper');
    if (!$account) return;
    const idx = $account.dataset['idx'];
    const account = {
      categoryId: 1,
      methodId: 3,
      content: '서브웨어 계란샌드위치',
      amount: '4000원',
      date: '2020-2-2',
    };
    this.onChangeFormData(account);
  }
  groupByDate(targetData) {
    const groupData = targetData.reduce((acc, cur, idx) => {
      console.log(acc);
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
  template() {
    const accountHistory = store.getState(SELECTOR_MAP.ACCOUNT_HISTORY);
    const groupByAccountHistory = this.groupByDate(accountHistory);
    console.log(groupByAccountHistory);
    return /* html */ `
        <div class="account-history">
          <div class="account-history-header">
            <h2>전체내역</h2>
            <div>
                <div>[ ] 수입</div>
                <div>[ ] 지출</div>
             </div>
           </div>  
          <div class="account-history-list" >
            ${groupByAccountHistory
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
                    const { content, methodName, amount, categoryId, isProfit } = account;
                    return `
                    <div data-idx='0' class="account-wrapper">
                      <div class="account-category">
                        <div class="category-tag">
                            <span>태그 샘플 ${categoryId}</span>
                        </div>
                      </div>
                      <div class="account-history-content">${content}</div>
                      <div class="account-history-method">${methodName}</div>
                      <div class="account-history-amount">${
                        isProfit ? '' : '-'
                      }${amount.toLocaleString('ko-KR')} 원</div>
                    </div>
                    `;
                  })
                  .join('')}
              </div>
            </div>
            `,
              )
              .join('')}

            </div>
          </div>
        </div>
    `;
  }

  render() {
    const template = this.template();
    this.$target.insertAdjacentHTML('beforeend', template);
  }
}

export default AccountHitory;
