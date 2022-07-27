import './index.scss';
import Component from '@/lib/component';
import Category from '../Category/index';
import store from '@/store/index';
import { SELECTOR_MAP } from '@/constants/selector-map';

class DonutChartDetail extends Component {
  constructor($target, initialState) {
    super($target, initialState);
  }
  init() {
    this.categories = store.getState(SELECTOR_MAP.CATEGORY);
  }

  async render() {
    this.categories['expenditure'].forEach((category) => {
      const id = category.id;
      const name = category.name;
      new Category(this.$target, { id, name });
    });
  }
}

export default DonutChartDetail;
