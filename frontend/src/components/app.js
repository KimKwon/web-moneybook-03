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
    new Header($header);
    const $main = this.$target.querySelector('main');
    this.$target.$accountForm = new AccountForm($main);
    new AccountHitory($main, {}, this.onChangeFormData.bind(this));
  }

  onChangeFormData(nextState) {
    this.$target.$accountForm.reFatchFormData(nextState);
  }
  render() {}
}

export default App;
