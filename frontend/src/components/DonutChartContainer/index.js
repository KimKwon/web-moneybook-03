import './index.scss';
import Component from '@/lib/component';
import DonutChartDetail from '../DonutChartDetail/index';
import store from '@/store/index';
import { SELECTOR_MAP } from '@/constants/selector-map';
import DonutChart from '../DonutChart/index';

class DonutChartContainer extends Component {
  constructor($target, initialState, onCategoryClick) {
    super($target, initialState);
    this.onCategoryClick = onCategoryClick;
  }

  init() {
    this.accountHistory = store.getState(SELECTOR_MAP.ACCOUNT_HISTORY);
    store.subscribe(SELECTOR_MAP.ACCOUNT_HISTORY, this.render.bind(this));
  }

  getGroupedData() {
    let totalAmount = 0;
    const groupedByCategory = this.accountHistory
      .filter(({ isProfit }) => !isProfit)
      .reduce((acc, cur) => {
        const { amount, categoryId, categoryName } = cur;
        totalAmount += amount;
        return {
          ...acc,
          [categoryId]: acc[categoryId]
            ? {
                ...acc[categoryId],
                amount: acc[categoryId].amount + amount,
              }
            : { amount, categoryName },
        };
      }, {});

    return { totalAmount, groupedByCategory };
  }

  template() {
    return /* html */ `
      <div class='donut-chart-container'>
        <div class="donut-chart"></div>
        <div class="donut-chart-detail"></div>
      </div>  
    `;
  }

  didMount() {
    this.$target.addEventListener('click', this.handelCategoryClickEvent.bind(this));
  }

  handelCategoryClickEvent(e) {
    const $categoryItem = e.target.closest('.donut-chart-detail__item');
    const $category = $categoryItem?.querySelector('.category');
    if (!$category) return;
    this.onCategoryClick({
      categoryId: $category.dataset['id'],
      categoryName: $category.innerText,
    });
  }

  async render() {
    const { totalAmount, groupedByCategory } = this.getGroupedData();
    this.$target.innerHTML = this.template();
    const $donutChartDetail = this.$target.querySelector('.donut-chart-detail');
    const $donutChart = this.$target.querySelector('.donut-chart');
    new DonutChartDetail($donutChartDetail, { totalAmount, groupedByCategory });
    new DonutChart($donutChart, { totalAmount, groupedByCategory });
  }
}

export default DonutChartContainer;
