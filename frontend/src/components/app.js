import Component from '@/lib/component';
import Router from '@/lib/router';
import './app.scss';
import store from '@/store/index';
import { SELECTOR_MAP } from '@/constants/selector-map';
import { getAccountHistory } from '@/lib/api/accountHistory';
import { getStartAndEndDate } from '@/utils/date';
import { getCategories } from '@/lib/api/category';
import { getPaymentMethod } from '@/lib/api/paymentMethod';
class App extends Component {
  constructor($target, initialState) {
    super($target, initialState);
  }

  async init() {
    await this.initCategorydummyData();
    await this.initAccountHistory();
    await this.initPaymentMethodDummyData();
    new Router(this.$target);
  }

  async initAccountHistory() {
    const accountHistory = await getAccountHistory({
      ...getStartAndEndDate(new Date()),
    });
    store.dispatch('setAccountHistory', accountHistory, SELECTOR_MAP.ACCOUNT_HISTORY);
  }
  async initPaymentMethodDummyData() {
    const paymentMethod = await getPaymentMethod();
    store.dispatch('setPaymentMethod', paymentMethod, SELECTOR_MAP.PAYMENT_METHODS);
  }
  async initCategorydummyData() {
    const income = await getCategories('income');
    const expenditure = await getCategories('expenditure');

    store.dispatch('setCategory', { expenditure, income }, SELECTOR_MAP.CATEGORY);
  }
  render() {}
}

export default App;
