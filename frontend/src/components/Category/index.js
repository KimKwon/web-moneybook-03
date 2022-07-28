import './index.scss';
import Component from '@/lib/component';
import store from '@/store/index';
import { SELECTOR_MAP } from '@/constants/selector-map';

class Category extends Component {
  constructor($target, initialState) {
    super($target, initialState);
  }

  init() {
    this.$element = document.createElement('div');
    this.$element.className = 'category';
    this.$element.dataset['id'] = this.state.id;
  }

  didMount() {
    store.subscribe(SELECTOR_MAP.CATEGORY, this.paintCategory.bind(this));
  }

  paintCategory() {
    let categories = store.getState(SELECTOR_MAP.CATEGORY);
    categories = [...categories.expenditure, ...categories.income];
    const category = categories.find((category) => {
      return category.id == this.state.id;
    });
    this.$element.style.backgroundColor = category.color;
  }

  render() {
    this.$element.innerHTML = this.state.name;
    this.paintCategory();
    this.$target.appendChild(this.$element);
  }
}

export default Category;
