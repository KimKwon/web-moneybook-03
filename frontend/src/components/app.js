import Component from '@/lib/component';
import Router from '@/lib/router';
import './app.scss';
import store from '@/store/index';
import { SELECTOR_MAP } from '@/constants/selector-map';
import { getAccountHistory } from '@/lib/api/accountHistory';
import { getStartAndEndDate } from '@/utils/date';
import { getCategories } from '@/lib/api/category';
class App extends Component {
  constructor($target, initialState) {
    super($target, initialState);
  }

  async init() {
    await this.initCategorydummyData();
    await this.initAccountHistory();
    this.initPaymentMethodDummyData();
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
  async initCategorydummyData() {
    const expenditure = await getCategories('income');
    const income = await getCategories('expenditure');

    store.dispatch('setCategory', { expenditure, income }, SELECTOR_MAP.CATEGORY);
  }
  render() {}
}

export default App;
