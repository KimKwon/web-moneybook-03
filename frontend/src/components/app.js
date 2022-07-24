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
    new Router();
    const $header = this.$target.querySelector('header');
    new Header($header);
    const $main = this.$target.querySelector('main');
    this.$target.$accountForm = new AccountForm($main);
    new AccountHitory($main, {}, this.onChangeFormData.bind(this));
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
        id: 1,
        name: '발급',
        color: '#B9D58C',
      },
      {
        id: 2,
        name: '용돈',
        color: '#E6D267',
      },
      {
        id: 3,
        name: '기타수입',
        color: '#E2B765',
      },
    ];
    store.dispatch(
      'addCategory',
      { expenditureCategoryDummyData, incomeCategoryDummyData },
      SELECTOR_MAP.CATEGORY,
    );
  }
  onChangeFormData(nextState) {
    this.$target.$accountForm.reFatchFormData(nextState);
  }
  render() {}
}

export default App;
