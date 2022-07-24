import Component from '@/lib/component';
import './index.scss';
import saveButtonIcon from '@/assets/icon/save-button.svg';
import lineIcon from '@/assets/icon/line.svg';

class AccountForm extends Component {
  constructor($target, initialState) {
    super($target, initialState);
  }
  template() {
    return /*html*/ `
        <form class="account-form">
            <div class="account-form-wrapper">
                <span class="account-form-label">날짜</span>
                <input type="date" class="account-form-input" placeholder="입력해주세요" />
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
                  <span><img src="${lineIcon}"/></span>
                  <input  class="account-form-input amount" placeholder="입력해주세요"/>
                </div>
            </div>
            <button class="account-form-button"><img src="${saveButtonIcon}"/></button>
        </form>
    `;
  }
  reFatchFormData(newFormData) {
    console.log(newFormData);
    const { categoryId, methodId, content, amount, date } = newFormData;
    this.$formContent.value = content;
    this.$formAmount.value = amount;
  }
  didMount() {
    /* 테스트 */
    this.$formContent = document.querySelector('.content');
    this.$formAmount = document.querySelector('.amount');
  }
  render() {
    const template = this.template();
    this.$target.insertAdjacentHTML('beforeend', template);
  }
}
export default AccountForm;
