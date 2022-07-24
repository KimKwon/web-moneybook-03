import './index.scss';
import Component from '@/lib/component';
class AccountList extends Component {
  constructor($target, initialState) {
    super($target, initialState);
  }
  template() {
    const { accountHistoryByDate } = this.state;
    return ` ${accountHistoryByDate
      .map((accountByDate) => {
        const { month, date, day, income, expenditure, data } = accountByDate;
        /* html */
        return `
            <div class="account-history-bydate">
              <div class="account-history-bydate-header">
                <span class="account-history-date">${month}월 ${date}일 ${day}</span>
              <div>
            ${this.incomeTemplate(income)}
            ${this.expenditureTemplate(expenditure)} 
          </div>
        </div>
        ${data.map((account) => this.accountTemplate(account)).join('')}
      </div>
    </div>
    `;
      })
      .join('')}
    `;
  }

  incomeTemplate(income) {
    return `
      ${income !== 0 ? `<span>수입 ${income}</span>` : ''}
    `;
  }

  expenditureTemplate(expenditure) {
    return `
    ${expenditure !== 0 ? `<span>지출 ${expenditure}</span>` : ''}
    `;
  }

  accountTemplate(account) {
    const { content, methodName, amount, categoryId, isProfit, idx } = account;
    return /* html */ `
        <div data-idx='${idx}' class="account-wrapper">
        <div class="account-category">
          <div class="category-tag">
              <span>태그 샘플 ${categoryId}</span>
          </div>
        </div>
        <div class="account-history-content">${content}</div>
        <div class="account-history-method">${methodName}</div>
        <div class="account-history-amount">${isProfit ? '' : '-'}${amount.toLocaleString(
      'ko-KR',
    )} 원</div>
      </div>
    `;
  }

  render() {
    this.$target.innerHTML = this.template();
  }
}

export default AccountList;
