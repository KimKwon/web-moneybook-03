import './index.scss';
import Component from '@/lib/component';
import BarChart from '../BarChart/index';
import { getStatistic } from '@/lib/api/statistic';
import store from '@/store/index';
import { SELECTOR_MAP } from '@/constants/selector-map';

class BarChartContainer extends Component {
  constructor($target, initialState) {
    super($target, initialState);
  }

  template() {
    return /* html */ `
    <div class='chart-container'>
      <div class="chart-container__header">
        <h2 class="chart-container__title">생활 카테고리 소비 추이</h2>
        <div class="chart-container__button">
          <button class="chart_button" data-period="3">3개월</button>
          <button class="chart_button" data-period="6">6개월</button>
          <button class="chart_button" data-period="12">1년</button>
        </div>
      </div>
      <div class="bar-chart"></div>
    </div>  
    `;
  }
  attachEvent() {
    this.$target.addEventListener('click', this.handleClickEvent.bind(this));
  }

  didMount() {
    this.attachEvent();
  }
  async handleClickEvent(e) {
    const $chartButton = e.target.closest('button');
    if (!$chartButton) return;
    const period = $chartButton.dataset['period'];
    this.render(period);
  }

  async getChartData(period) {
    const { month, year, categoryId } = this.state;
    console.log(period ? period : 3);
    this.chartData = await getStatistic({
      month: 7,
      year: 2022,
      period: period ? period : 3,
      categoryId: 1,
    });
  }

  async render(period) {
    await this.getChartData(period);
    this.$target.innerHTML = this.template();
    const $barChart = this.$target.querySelector('.bar-chart');
    const chartData = this.chartData.reduce(
      (acc, { date, sum }) => {
        acc.data.push(sum);
        acc.labels.push(date.split('-')[1]);
        return acc;
      },
      { data: [], labels: [] },
    );

    const barChartState = {
      data: chartData.data,
      labels: chartData.labels,
      width: 800,
      height: 500,
      row: 8,
      split: 3,
    };
    new BarChart($barChart, barChartState);
  }
}

export default BarChartContainer;
