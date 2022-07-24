import Component from '@/lib/component';
import Router from '@/lib/router';
import AccountForm from './AccountForm/index';
import Header from './Header/index';
import './app.scss';
import AccountHitory from './AccountHistory/index';
class App extends Component {
  constructor($target, initialState) {
    super($target, initialState);
  }

  init() {
    new Router();
    const $header = this.$target.querySelector('header');
    new Header($header, { month: 4, year: 2022 });
    const $main = this.$target.querySelector('main');
    new AccountForm($main);
    new AccountHitory($main);
  }

  render() {}
}

export default App;
