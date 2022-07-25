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
  }
  didMount() {
    store.subscribe(SELECTOR_MAP.CATEGORY, this.paintCategory.bind(this));
  }

  paintCategory() {
    /* category 배열이 아닌 객체리터럴이여도 좋을것 같네요 */
    let categories = store.getState(SELECTOR_MAP.CATEGORY);
    categories = [
      ...categories.expenditureCategoryDummyData,
      ...categories.incomeCategoryDummyData,
    ];
    const category = categories.filter((category) => {
      return category.id == this.state.id;
    });
    this.$element.style.backgroundColor = category[0].color;
  }

  render() {
    this.$element.innerHTML = `<span>${this.state.name}</span>`;
    this.paintCategory();
    this.$target.appendChild(this.$element);
  }
}

export default Category;
