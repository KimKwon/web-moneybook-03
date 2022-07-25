import Component from '@/lib/component';
import Router from '@/lib/router';
import './app.scss';
import store from '@/store/index';
import { SELECTOR_MAP } from '@/constants/selector-map';
import { getAccountHistory } from '@/lib/api/accountHistory';
import { getStartAndEndDate } from '@/utils/date';
class App extends Component {
  constructor($target, initialState) {
    super($target, initialState);
  }

  init() {
    this.initCategorydummyData();
    this.initPaymentMethodDummyData();
    this.initAccountHistory();
    new Router(this.$target);
  }

  async initAccountHistory() {
    const accountHistory = await getAccountHistory({
      ...getStartAndEndDate(new Date()),
    });
    store.dispatch('setAccountHistory', accountHistory, SELECTOR_MAP.ACCOUNT_HISTORY);
  }
  initPaymentMethodDummyData() {
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
  }
  initCategorydummyData() {
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
  }
  render() {}
}

export default App;
