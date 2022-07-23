import Component from '@/lib/component';

class AccountForm extends Component {
  constructor($target) {
    super($target);
  }
  template() {
    return /*html*/ `
    <div class="account-form">
        <form>
            <div class="accout-form-wrapper">
                <span class="account-from-label">날짜</span>
                <input type="date "class="account-from-input" placeholder="입력해주세요" />
            </div>
            <div class="accout-form-wrapper">
                <span class="account-from-label">분류</span>
                <div class="account-from-input" placeholder="입력해주세요"></div>
            </div>
            <div class="accout-form-wrapper">
                <span class="account-from-label">내용</span>
                <input class="account-from-input" placeholder="입력해주세요" />
            </div>
            <div class="accout-form-wrapper">
                <span class="account-from-label">결제수단</span>
                <div class="account-from-input" placeholder="입력해주세요"></div>
            </div>
            <div class="accout-form-wrapper">
                <span class="account-from-label">금액</span>
                <span> + </span>
                <input class="account-from-input" placeholder="입력해주세요" />
            </div>
            <button class="account-form-button"></button>
        </form>
    </div>
    `;
  }
  render() {
    const template = this.template();
    this.$target.insertAdjacentHTML('afterend', template);
  }
}
export default AccountForm;
