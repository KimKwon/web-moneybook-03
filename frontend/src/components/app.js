import Component from '@/lib/component';
import Router from '@/lib/router';
import AccountForm from './AccountForm/index';
import Header from './Header/index';
import './app.scss';
import AccountHitory from './AccountHistory/index';
import store from '@/store/index';
import { SELECTOR_MAP } from '@/constants/selector-map';
class App extends Component {
  constructor($target, initialState) {
    super($target, initialState);
  }

  init() {
    this.setCategorydummyData();
    this.setPaymentMethodDummyData();
    this.setAccountHistory();
    new Router();
    const $header = this.$target.querySelector('header');
    new Header($header);
    const $main = this.$target.querySelector('main');
    this.$target.$accountForm = new AccountForm($main);
    new AccountHitory($main, {}, this.onChangeFormData.bind(this));
  }
  setAccountHistory() {
    const accountHistory = [
      {
        id: 1,
        date: new Date('2022-07-22'),
        content: '국밥',
        amount: 8000,
        methodName: '현대카드',
        categoryName: '',
        categoryId: 2,
        isProfit: true,
      },
      {
        id: 2,
        date: new Date(),
        content: '서브웨이',
        amount: 8000,
        methodName: '농협카드',
        categoryName: '',
        categoryId: 4,
        isProfit: false,
      },
      {
        id: 3,
        date: new Date(),
        content: '국밥',
        amount: 8000,
        methodName: '현대카드',
        categoryName: '',
        categoryId: 1,
        isProfit: false,
      },
      {
        id: 4,
        date: new Date(),
        content: '월급',
        amount: 28000,
        methodName: '현대카드',
        categoryName: '',
        categoryId: 11,
        isProfit: false,
      },
    ];
    store.dispatch('setAccountHistory', accountHistory, SELECTOR_MAP.ACCOUNT_HISTORY);
    console.log(store.getState(SELECTOR_MAP.ACCOUNT_HISTORY));
  }
  setPaymentMethodDummyData() {
    const paymentMethod = [
      {
        id: 1,
        name: '현대카드',
        isDelete: false,
      },
      {
        id: 2,
        name: '카카오카드',
        isDelete: false,
      },
      {
        id: 3,
        name: '농협카드',
        isDelete: true,
      },
      {
        id: 4,
        name: '현금',
        isDelete: false,
      },
    ];
    store.dispatch('setPaymentMethod', paymentMethod, SELECTOR_MAP.PAYMENT_METHODS);
    //console.log(store.getState(SELECTOR_MAP.PAYMENT_METHODS));
  }
  setCategorydummyData() {
    const expenditureCategoryDummyData = [
      {
        id: 1,
        name: '생활',
        color: '#4A6CC3',
      },
      {
        id: 2,
        name: '식비',
        color: '#4CA1DE',
      },
      {
        id: 3,
        name: '교통',
        color: '#94D3CC',
      },
      {
        id: 4,
        name: '소핑/뷰티',
        color: '#6ED5EB',
      },
      {
        id: 5,
        name: '의료/건강',
        color: '#4CB8B8',
      },
      {
        id: 6,
        name: '문화/여가',
        color: '#D092E2',
      },
      {
        id: 7,
        name: '미분류',
        color: '#817DCE',
      },
    ];
    const incomeCategoryDummyData = [
      {
        id: 11,
        name: '발급',
        color: '#B9D58C',
      },
      {
        id: 12,
        name: '용돈',
        color: '#E6D267',
      },
      {
        id: 13,
        name: '기타수입',
        color: '#E2B765',
      },
    ];
    store.dispatch(
      'setCategory',
      { expenditureCategoryDummyData, incomeCategoryDummyData },
      SELECTOR_MAP.CATEGORY,
    );
    //console.log(store.getState(SELECTOR_MAP.CATEGORY));
  }
  onChangeFormData(nextState) {
    this.$target.$accountForm.reFatchFormData(nextState);
  }
  render() {}
}

export default App;
