import { SELECTOR_MAP } from '@/constants/selector-map';
import Component from '@/lib/component';
import store from '@/store/index';

class DonutChart extends Component {
  constructor($target, initialState) {
    super($target, initialState);
  }

  init() {
    this.categories = store.getState(SELECTOR_MAP.CATEGORY).expenditure;
    this.radius = 80;
    this.diameter = 2 * Math.PI * this.radius;
  }

  getSVGCircles() {
    const { totalAmount, groupedByCategory } = this.state;
    const accumulativeAmount = Object.values(groupedByCategory).reduce(
      (acc, { amount }) => [...acc, acc[acc.length - 1] + amount],
      [0],
    );

    return Object.entries(groupedByCategory)
      .map(([categoryId, { amount }], index) => {
        const partialRatio = amount / totalAmount;
        const fillSpace = this.diameter * partialRatio;
        const emptySpace = this.diameter - fillSpace;
        const offset = (accumulativeAmount[index] / totalAmount) * this.diameter;
        const result = this.categories.find(({ id }) => id === +categoryId);
        return /*html*/ `
        <circle cx="100" cy="100" r="${this.radius}" fill="transparent" stroke="${
          result?.color || '#000'
        }" stroke-width="40" stroke-dashoffset="${-offset}" stroke-dasharray="${fillSpace} ${emptySpace}"></circle>
      `;
      })
      .join('');
  }

  template() {
    return /*html*/ `
      <svg width="350" height="350" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        ${this.getSVGCircles()}
      </svg>
    `;
  }

  render() {
    this.$target.innerHTML = this.template();
  }
}

export default DonutChart;
