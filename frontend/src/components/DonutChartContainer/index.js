import './index.scss';
import Component from '@/lib/component';
import DonutChartDetail from '../DonutChartDetail/index';

class DonutChartContainer extends Component {
  constructor($target, initialState, onCategoryClick) {
    super($target, initialState);
    this.onCategoryClick = onCategoryClick;
  }

  template() {
    return /* html */ `
      <div class='chart-container'>
        <div class="donut-chart"></div>
        <div class="donut-chart-detail"></div>
      </div>  
    `;
  }

  didMount() {
    this.$target.addEventListener('click', this.handelCategoryClickEvent.bind(this));
  }

  handelCategoryClickEvent(e) {
    const $category = e.target.closest('.category');
    if (!$category) return;
    this.onCategoryClick($category.dataset['id']);
  }

  async render() {
    this.$target.innerHTML = this.template();
    const $donutChartDetail = this.$target.querySelector('.donut-chart-detail');
    new DonutChartDetail($donutChartDetail, {});
  }
}

export default DonutChartContainer;
