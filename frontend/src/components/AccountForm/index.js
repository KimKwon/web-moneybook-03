import Component from '@/lib/component';
import './index.scss';
import saveButtonIcon from '@/assets/icon/save-button.svg';
import lineIcon from '@/assets/icon/line.svg';
class AccountForm extends Component {
  constructor($target) {
    super($target, {
      accountInfo: {
        date: new Date().toString(),
        category: '',
        content: '',
        method: '',
        amount: '',
      },
    });
  }
  template() {
    const initialDate = this.state.accountInfo.date.getParsedDatestring('YYYY-MM-DD');
    return /*html*/ `
        <form class="account-form">
            <div class="account-form-wrapper">
                <span class="account-form-label">날짜</span>
                <input type="date" value=${initialDate} class="account-form-input" placeholder="입력해주세요" />
            </div>
            <div class="account-form-wrapper">
                <span class="account-form-label">분류</span>
                <div class="account-form-input">선택하세요</div>
            </div>
            <div class="account-form-wrapper">
                <span class="account-form-label">내용</span>
                <input class="account-form-input content" data-name="content"  placeholder="입력해주세요"/>
            </div>
            <div class="account-form-wrapper">
                <span class="account-form-label">결제수단</span>
                <div class="account-form-input">선택하세요</div>
            </div>
            <div class="account-form-wrapper">
                <span class="account-form-label">금액</span>
                <div class="account-form-amount">
                  <span>${lineIcon}</span>
                  <input class="account-form-input amount" placeholder="입력해주세요"/>
                </div>
            </div>
            <button type="submit" class="account-form-button">${saveButtonIcon}</button>
        </form>
    `;
  }

  attachEvent() {
    this.$form.addEventListener('submit', (e) => {
      e.preventDefault();
    });
  }

  reFatchFormData(newFormData) {
    const { categoryId, methodId, content, amount, date } = newFormData;
  }

  didMount() {
    /* 테스트 */
    this.$form = this.$target.querySelector('.account-form');
    this.attachEvent();
  }
  render() {
    const template = this.template();
    this.$target.insertAdjacentHTML('beforeend', template);
  }
}
export default AccountForm;
