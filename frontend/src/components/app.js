import Component from '@/lib/component';
import Router from '@/lib/router';

class App extends Component {
  constructor($target, initialState) {
    super($target, initialState);
  }

  init() {
    new Router();
  }
}

export default App;
