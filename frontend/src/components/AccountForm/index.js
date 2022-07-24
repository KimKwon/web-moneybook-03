import Component from '@/lib/component';
import './index.scss';
import saveButtonIcon from '@/assets/icon/save-button.svg';
import lineIcon from '@/assets/icon/line.svg';
import plusIcon from '@/assets/icon/plus.svg';
import store from '@/store/index';
import { SELECTOR_MAP } from '@/constants/selector-map';
import shortid from 'shortid';

const INCOME = 'income';
const EXPENDITURE = 'expenditure';

class AccountForm extends Component {
  constructor($target) {
    super($target, {
      accountInfo: {
        date: new Date().toString(),
        category: '',
        content: '',
        method: '',
        amount: 1800000,
      },
      currentCategory: INCOME,
      isEditMode: false,
    });
  }

  initForm() {
    this.setState({
      accountInfo: {
        date: new Date().toString(),
        category: '',
        content: '',
        method: '',
        amount: 13133113,
      },
      currentCategory: EXPENDITURE,
      isEditMode: false,
    });
  }

  showMethods() {
    const methods = store.getState(SELECTOR_MAP.PAYMENT_METHODS);
    return methods
      .map(
        ({ name }) => `
        <option value=${name}>
          ${name}
        </option>
      `,
      )
      .join('');
  }

  showCategoryOptions() {
    const { currentCategory } = this.state;
    const category = store.getState(SELECTOR_MAP.CATEGORY);

    const categories =
      currentCategory === INCOME
        ? category.incomeCategoryDummyData
        : category.expenditureCategoryDummyData;

    return categories
      .map(
        ({ name }) => `
        <option value=${name}>
          ${name}
        </option>
      `,
      )
      .join('');
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const $date = this.$form.querySelector('.account-form-input.date');
    const $category = this.$form.querySelector('.account-form-dropdown.category');
    const $content = this.$form.querySelector('.account-form-input.content');
    const $method = this.$form.querySelector('.account-form-dropdown.method');
    const $amount = this.$form.querySelector('.account-form-input.amount');

    store.dispatch(
      'addAccountHistory',
      {
        id: shortid(),
        date: new Date($date.value),
        content: $content.value,
        amount: Number($amount.value.toString().replaceAll(',', '')),
        methodName: $method.selectedOptions[0]?.value,
        categoryName: $category.selectedOptions[0]?.value,
        categoryId: shortid(),
        isProfit: true,
      },
      SELECTOR_MAP.ACCOUNT_HISTORY,
    );

    this.initForm();
  }

  template() {
    const { currentCategory, accountInfo } = this.state;
    const { date, amount, content } = accountInfo;
    const initialDate = date.getParsedDatestring('YYYY-MM-DD');
    return /*html*/ `
        <form class="account-form">
            <div class="account-form-wrapper">
                <span class="account-form-label">날짜</span>
                <input type="date" value=${initialDate} class="account-form-input date" placeholder="입력해주세요" />
            </div>
            <div class="account-form-wrapper">
                <span class="account-form-label">분류</span>
                <select class="account-form-dropdown category">
                  <option selected disabled>선택하세요</option>
                  ${this.showCategoryOptions()}
                </select>
            </div>
            <div class="account-form-wrapper">
                <span class="account-form-label">내용</span>
                <input class="account-form-input content" value="${content}" data-name="content"  placeholder="입력하세요"/>
            </div>
            <div class="account-form-wrapper">
                <span class="account-form-label">결제수단</span>
                <select class="account-form-dropdown method"> 
                  <option selected disabled >선택하세요</option>
                  ${this.showMethods()}
                </select>
            </div>
            <div class="account-form-wrapper">
                <span class="account-form-label">금액</span>
                <div class="account-form-amount">
                  <button type="button" class="account-form-amount__toggleButton">
                    ${currentCategory === INCOME ? plusIcon : lineIcon}
                  </button>
                  <input
                    value=${amount === '' ? amount : Number(amount).toLocaleString()}
                    class="account-form-input amount" placeholder="입력하세요"
                  />
                  <span>원</span>
                </div>
            </div>
            <button type="submit" class="account-form-button">${saveButtonIcon}</button>
        </form>
    `;
  }

  attachEvent() {
    this.$form.addEventListener('submit', this.handleFormSubmit.bind(this));

    const toggleButton = this.$form.querySelector('.account-form-amount__toggleButton');
    toggleButton.addEventListener('click', () => {
      const { currentCategory } = this.state;
      const nextCategory = currentCategory === INCOME ? EXPENDITURE : INCOME;
      this.setState({ currentCategory: nextCategory });
    });
  }

  reFatchFormData(newFormData) {
    const { content, amount, date } = newFormData;

    this.setState({
      content,
      amount,
      date,
    });
  }

  afterRender() {
    this.$form = this.$target.querySelector('.account-form');
    this.attachEvent();
  }
  render() {
    const template = this.template();
    if (this.$form) {
      this.$form.remove();
      this.$form = null;
    }
    this.$target.insertAdjacentHTML('afterBegin', template);

    this.afterRender();
  }
}
export default AccountForm;
