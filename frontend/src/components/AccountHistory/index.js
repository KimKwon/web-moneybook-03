import './index.scss';
import Component from '@/lib/component';
class AccountHitory extends Component {
  constructor($target, initialState, onChangeFormData) {
    super($target);
    this.onChangeFormData = onChangeFormData;
  }

  template() {
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
            <div class="account-history-bydate">
                <div class="account-history-bydate-header">
                  <span class="account-history-date">2022-05-33</span>
                  <span class="account-history-expenditure">지출 30000</span>
                </div>
                <div data-idx='1' class="account-wrapper">
                    <div class="account-category">
                    <div class="category-tag">
                        <span>태그 샘플</span>
                    </div>
                    </div>
                    <div class="account-history-content">서브웨이 먹었다</div>
                    <div class="account-history-method">결제 방법</div>
                    <div class="account-history-amount">결제 금액</div>
                </div>
                <div  data-idx='2' class="account-wrapper">
                <div class="account-category">
                <div class="category-tag">
                    <span>태그 샘플</span>
                </div>
                </div>
                <div class="account-history-content">치킨먹었다</div>
                <div class="account-history-method">결제 방법</div>
                <div class="account-history-amount">결제 금액</div>
            </div>
                <div>
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
