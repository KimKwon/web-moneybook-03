import Component from '@/lib/component';
import Router from '@/lib/router';
import './app.scss';
import store from '@/store/index';
import { SELECTOR_MAP } from '@/constants/selector-map';
import {
  getAccountHistory,
  patchAccountHistory,
  putAccountHistory,
} from '@/lib/api/accountHistory';
import { getStartAndEndDate } from '@/utils/date';
import { getCategories, patchCategory } from '@/lib/api/category';
import { deletePaymentMethod, getPaymentMethod, putPaymentMethod } from '@/lib/api/paymentMethod';
class App extends Component {
  constructor($target, initialState) {
    super($target, initialState);
  }

  async init() {
    await this.initCategorydummyData();
    await this.initAccountHistory();
    await this.initPaymentMethodDummyData();
    await this.test();
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
    const expenditure = await getCategories('income');
    const income = await getCategories('expenditure');

    store.dispatch('setCategory', { expenditure, income }, SELECTOR_MAP.CATEGORY);
  }
  async test() {
    // const test1 = await putAccountHistory({
    //   userId: 'star',
    //   categoryId: 1,
    //   paymentMethodId: 1,
    //   date: '2022-06-21',
    //   content: '먹자',
    //   amount: 3000,
    //   isProfit: false,
    // });
    // const test2 = await patchAccountHistory(22, {
    //   content: 'patch api',
    //   amount: 5000,
    //   isProfit: false,
    // });
    // const test3 = await putPaymentMethod({
    //   userId: 'star',
    //   name: '현대 카드',
    //   isDelete: false,
    // });
    // console.log(test3);
    // const id = test3.id;
    // const test4 = await deletePaymentMethod(id);
    // console.log(test4);
    // const test5 = await patchCategory(5, {
    //   color: '#888888',
    // });
    // console.log(test5);
  }
  render() {}
}

export default App;
