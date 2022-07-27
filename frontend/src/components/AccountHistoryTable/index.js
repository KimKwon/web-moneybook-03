import './index.scss';
import Component from '@/lib/component';
import Category from '../Category/index';
class AccountHistoryTable extends Component {
  constructor($target, initialState) {
    super($target, initialState);
  }
  template() {
    const { accountHistoryByDate } = this.state;
    return ` ${accountHistoryByDate
      .map((historyGroup) => {
        const { month, date, day, income, expenditure, data } = historyGroup;
        /* html */
        return `
            <div class="account-history-table">
              <div class="account-history-bydate-header">
                <span class="account-history-date">${month}월 ${date}일 ${day}</span>
                <div>
                  ${this.incomeTemplate(income)}
                  ${this.expenditureTemplate(expenditure)} 
                </div>
              </div>
              ${data.map((historyItem) => this.historyItemTemplate(historyItem)).join('')}
          </div>
        `;
      })
      .join('')}
    `;
  }

  incomeTemplate(income) {
    if (!income) return '';
    return `
      ${income !== 0 ? `<span>수입 ${income?.toLocaleString()}</span>` : ''}
    `;
  }

  expenditureTemplate(expenditure) {
    if (!expenditure) return '';
    return `
    ${expenditure !== 0 ? `<span>지출 ${expenditure?.toLocaleString()}</span>` : ''}
    `;
  }

  historyItemTemplate(historyItem) {
    const { content, methodName, amount, categoryId, isProfit, idx, categoryName } = historyItem;
    return /* html */ `
        <div data-idx='${idx}' class="history-item-wrapper">
        <div>
          <div class="history-item-category" data-id='${categoryId}' data-name='${categoryName}'></div>
          <div class="history-item-content">${content}</div>
        </div>
        <div class="history-item-method">${methodName}</div>
        <div class="history-item-amount right">${isProfit ? '' : '-'} ${amount.toLocaleString(
      'ko-KR',
    )}원</div>
      </div>
    `;
  }

  /* 위에가 템플릿으로 만들어져서 아래부분을 끼워 넣을 수가 없네요 */
  renderCategory() {
    const $categories = this.$target.querySelectorAll('.history-item-category');
    $categories.forEach(($category) => {
      const id = $category.dataset['id'];
      const name = $category.dataset['name'];
      new Category($category, { id, name });
    });
  }

  render() {
    this.$target.innerHTML = this.template();
    this.renderCategory();
  }
}

export default AccountHistoryTable;
