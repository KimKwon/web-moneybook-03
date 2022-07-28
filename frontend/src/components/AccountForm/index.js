import Component from '@/lib/component';
import './index.scss';
import saveButtonIcon from '@/assets/icon/save-button-active.svg';
import lineIcon from '@/assets/icon/line.svg';
import plusIcon from '@/assets/icon/plus.svg';
import dropArrow from '@/assets/icon/drop-arrow.svg';
import store from '@/store/index';
import { SELECTOR_MAP } from '@/constants/selector-map';
import { createAccountHistory, patchAccountHistory } from '@/lib/api/accountHistory';
import DropDown from '../Dropdown/index';
import { createPaymentMethod, deletePaymentMethod } from '@/lib/api/paymentMethod';

const INCOME = 'income';
const EXPENDITURE = 'expenditure';

const INITIAL_FORM_DATA = {
  id: '',
  date: new Date().toString(),
  categoryName: '',
  categoryId: '',
  content: '',
  methodName: '',
  methodId: '',
  amount: '',
  isProfit: false,
};

class AccountForm extends Component {
  constructor($target) {
    super($target, {
      accountInfo: INITIAL_FORM_DATA,
      currentCategoryType: INCOME,
      isEditMode: false,
    });
  }

  initForm() {
    this.setState({
      accountInfo: INITIAL_FORM_DATA,
      currentCategoryType: INCOME,
      isEditMode: false,
    });
  }

  getCurrentAccountInput() {
    const $date = this.$form.querySelector('.account-form-input.date');
    const $content = this.$form.querySelector('.account-form-input.content');
    const $amount = this.$form.querySelector('.account-form-input.amount');
    return { $date, $content, $amount };
  }

  getSelectedCategory() {
    const $category = this.$form.querySelector('.account-form-dropdown-category__selected');
    return { categoryId: $category.dataset.id, categoryName: $category.innerText };
  }

  getSelectedMethod() {
    const $method = this.$form.querySelector('.account-form-dropdown-method__selected');
    return { methodId: $method.dataset.id, methodName: $method.innerText };
  }

  getNextAccountInput() {
    const { id, isProfit } = this.state.accountInfo;
    const { $date, $content, $amount } = this.getCurrentAccountInput();
    const { categoryId, categoryName } = this.getSelectedCategory();
    const { methodId, methodName } = this.getSelectedMethod();

    return {
      id,
      date: $date.value,
      content: $content.value,
      amount: Number($amount.value.toString().replaceAll(',', '')),
      methodId,
      methodName,
      categoryId,
      categoryName,
      isProfit,
    };
  }

  async handleFormSubmit(e) {
    e.preventDefault();

    const { isEditMode } = this.state;
    const { id, methodName, categoryName, ...nextFormData } = this.getNextAccountInput();

    if (!isEditMode) {
      createAccountHistory(nextFormData);
    } else {
      patchAccountHistory(id, nextFormData);
    }

    store.dispatch(
      isEditMode ? 'updateAccountHistory' : 'addAccountHistory',
      {
        ...nextFormData,
        id,
        methodName,
        categoryName,
      },
      SELECTOR_MAP.ACCOUNT_HISTORY,
    );

    this.initForm();
  }

  toggleActiveStateOfSubmitButton(forceState) {
    const $submitButton = this.$form.querySelector('.account-form-button');
    $submitButton.classList.toggle('active', forceState);
  }

  checkIsFormValid() {
    const { methodName, categoryName, ...nextFormData } = this.getNextAccountInput();
    const { date, content, amount } = nextFormData;
    if (!date || !content || !amount || !methodName || !categoryName) {
      this.toggleActiveStateOfSubmitButton(false);
      return false;
    }

    this.state = {
      ...this.state,
      accountInfo: {
        ...this.state.accountInfo,
        ...nextFormData,
        isProfit: this.state.currentCategoryType === INCOME,
      },
    };
    this.toggleActiveStateOfSubmitButton(true);
    return true;
  }

  template() {
    const { currentCategoryType, accountInfo } = this.state;
    const { date, amount, content, categoryId, categoryName, methodId, methodName } = accountInfo;
    const initialDate = date.getParsedDatestring('YYYY-MM-DD');
    return /*html*/ `
        <form class="account-form">
            <div class="account-form-wrapper">
                <span class="account-form-label">날짜</span>
                <input pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" type="text" value=${initialDate} maxlength="10" class="account-form-input date" placeholder="입력해주세요" />
            </div>
            <div class="account-form__delimiter"></div>
            <div class="account-form-wrapper --dropable">
                <span class="account-form-label">분류</span>
                <button type="button" class="account-form-dropdown-category">
                  <span class="account-form-dropdown-category__selected" data-id="${categoryId}">
                    ${categoryName || '선택하세요'}
                  </span>
                  ${dropArrow}
                </button>
            </div>
            <div class="account-form__delimiter"></div>
            <div class="account-form-wrapper">
                <span class="account-form-label">내용</span>
                <input class="account-form-input content" value="${content}" data-name="content"  placeholder="입력하세요"/>
            </div>
            <div class="account-form__delimiter"></div>
            <div class="account-form-wrapper --dropable">
                <span class="account-form-label">결제수단</span>
                <button type="button" class="account-form-dropdown-method">
                  <span class="account-form-dropdown-method__selected" data-id="${methodId}">
                    ${methodName || '선택하세요'}
                  </span>
                  ${dropArrow}
                </button>
            </div>
            <div class="account-form__delimiter"></div>
            <div class="account-form-wrapper">
                <span class="account-form-label">금액</span>
                <div class="account-form-amount">
                  <button type="button" class="account-form-amount__toggleButton">
                    ${currentCategoryType === INCOME ? plusIcon : lineIcon}
                  </button>
                  <input
                    value="${amount === '' ? amount : Number(amount).toLocaleString()}"
                    class="account-form-input amount" placeholder="입력하세요"
                  />
                  <span>원</span>
                </div>
            </div>
            <button type="submit" class="account-form-button disabled">${saveButtonIcon}</button>
        </form>
    `;
  }

  attachEvent() {
    this.$form.addEventListener('submit', this.handleFormSubmit.bind(this));
    this.$form.addEventListener('input', this.checkIsFormValid.bind(this));

    const toggleButton = this.$form.querySelector('.account-form-amount__toggleButton');
    toggleButton.addEventListener('click', () => {
      const { currentCategoryType } = this.state;
      const nextCategory = currentCategoryType === INCOME ? EXPENDITURE : INCOME;
      this.setState({ currentCategoryType: nextCategory, categoryName: '', categoryId: '' });
    });

    this.attachCategoryDropdown();
    this.attachMethodDropdown();
  }

  attachMethodDropdown() {
    const methods = store.getState(SELECTOR_MAP.PAYMENT_METHODS);
    const $methodDropdown = this.$form.querySelector('.account-form-dropdown-method');
    const methodDropdown = new DropDown(
      $methodDropdown,
      methods,
      (selectedMethod, selectedId) => {
        // select
        $methodDropdown.children[0].innerText = selectedMethod;
        $methodDropdown.children[0].dataset.id = selectedId;

        this.checkIsFormValid();
      },
      async (name) => {
        // add
        const newPaymentMethod = await createPaymentMethod({ name });
        store.dispatch('addPaymentMethod', newPaymentMethod, SELECTOR_MAP.PAYMENT_METHODS);
      },
      (id) => {
        // delete
        store.dispatch('removePaymentMethod', { id }, SELECTOR_MAP.PAYMENT_METHODS);
        deletePaymentMethod(id);
        this.setState({
          methodName: '',
        });
      },
      true,
    );

    $methodDropdown.addEventListener('click', () => {
      methodDropdown.toggle();
    });

    store.subscribe(SELECTOR_MAP.PAYMENT_METHODS, () => {
      methodDropdown.refetchDropdownData(store.getState(SELECTOR_MAP.PAYMENT_METHODS));
    });
  }

  attachCategoryDropdown() {
    const $categoryDropdown = this.$form.querySelector('.account-form-dropdown-category');
    const categoryDropDown = new DropDown(
      $categoryDropdown,
      store.getState(SELECTOR_MAP.CATEGORY)[this.state.currentCategoryType],
      (selectedCategory, selectedId) => {
        $categoryDropdown.children[0].innerText = selectedCategory;
        $categoryDropdown.children[0].dataset.id = selectedId;

        this.checkIsFormValid();
      },
    );
    $categoryDropdown.addEventListener('click', () => {
      categoryDropDown.toggle();
    });
  }

  refetchFormData(newFormData) {
    const { isProfit, ...restNewFormData } = newFormData;

    this.setState({
      accountInfo: {
        ...this.state.accountInfo,
        ...restNewFormData,
      },
      isEditMode: true,
      currentCategoryType: isProfit ? INCOME : EXPENDITURE,
    });
  }

  afterRender() {
    this.$form = this.$target.querySelector('.account-form');
    this.attachEvent();
  }

  render() {
    store.cleanupListener(SELECTOR_MAP.PAYMENT_METHODS);
    if (this.$form) {
      this.$form.remove();
      this.$form = null;
    }

    const template = this.template();
    this.$target.insertAdjacentHTML('afterBegin', template);

    this.afterRender();
  }
}
export default AccountForm;
