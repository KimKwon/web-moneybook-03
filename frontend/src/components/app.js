import Component from '@/lib/component';
import Router from '@/lib/router';
import AccountForm from './AccountForm/index';
import Header from './Header/index';

class App extends Component {
  constructor($target, initialState) {
    super($target, initialState);
  }

  init() {
    new Router();
    new Header(this.$target, { month: 4, year: 2022 });
    new AccountForm(this.$target);
  }

  render() {}
}

export default App;
