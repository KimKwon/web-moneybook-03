import './index.scss';
import Component from '@/lib/component';
import store from '@/store/index';
import { SELECTOR_MAP } from '@/constants/selector-map';

class Category extends Component {
  constructor($target, initialState) {
    super($target, initialState);
    this.$element = document.createElement('div');
    this.$element.className = 'category-tag';
  }

  template() {
    return /*html*/ `
        <div class="category-tag">
            <span>태그 샘플 ${categoryId}</span>
        </div>
    `;
  }

  didMount() {
    store.subscribe(SELECTOR_MAP.CATEGORY, this.paintCategory.bind(this));
  }

  paintCategory() {
    /* category 배열이 아닌 객체리터럴이여도 좋을것 같네요 */
    const categories = store.getState(SELECTOR_MAP.CATEGORY);
    const category = categories.filter((category) => {
      return category.id == this.state.categoryId;
    });
    this.$element.style.backgroundColor = category.color;
  }

  render() {
    this.$element.innerHTML = this.state.name;
    this.paintCategory();
    this.$target.appendElement(this.$element);
  }
}

export default Category;
