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
    this.categories = store.getState(SELECTOR_MAP.CATEGORY).expenditure;
    console.log(this.categories, this.state.groupedByCategory);
  }

  roundToTwo(num) {
    return +(Math.floor(num + 'e+1') + 'e-1');
  }

  calcPercentage(total, partial) {
    if (!partial) return 0;
    return this.roundToTwo((partial / total) * 100);
  }

  template() {
    const { totalAmount, groupedByCategory } = this.state;
    return /* html */ `
      <div class="donut-chart-detail__total-amount">
        이번 달 지출 금액 ${totalAmount?.toLocaleString()}
      </div>
      <ul class="donut-chart-detail__list">
        ${this.categories
          .map(
            ({ id }) => /*html*/ `
          <li class="donut-chart-detail__item">
            <div class="donut-chart-detail__category-box"></div>
            <div class="donut-chart-detail__percentage">
              <span>${this.calcPercentage(totalAmount, groupedByCategory[id]?.amount)}%</span>
              <span>${groupedByCategory[id]?.amount.toLocaleString() || 0}</span>
            </div>
          </li>
        `,
          )
          .join('')}
      </ul>
    `;
  }

  render() {
    this.$target.innerHTML = this.template();
    this.afterRender();
  }

  afterRender() {
    const $categoryBoxes = this.$target.querySelectorAll('.donut-chart-detail__category-box');
    $categoryBoxes.forEach(($box, index) => {
      const { id, name } = this.categories[index];
      new Category($box, { id, name });
    });
  }
}

export default DonutChartDetail;
