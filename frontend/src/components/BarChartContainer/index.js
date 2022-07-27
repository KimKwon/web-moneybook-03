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
    this.$target.addEventListener('click', getCharData);
  }

  didMount() {
    this.attachEvent();
  }
  async handleClickEvent(e) {
    const $chartButton = e.target.closest('.chart_button');
    if (!$chartButton) return;
    const period = $chartButton.dateset['period'];
    await this.getChartData(period);
    this.render();
  }

  async getChartData(period) {
    const { month, year, categoryId } = this.state;
    this.chartData = await getStatistic({ month, year, period, categoryId });
  }

  render() {
    this.getChartData();
    this.$target.innerHTML = this.template();
    const $barChart = this.$target.querySelector('.bar-chart');
    const data1 = [
      {
        baseDate: '2022-06',
        sum: '850000',
      },
      {
        baseDate: '2022-07',
        sum: '516515944',
      },
    ];

    const chartData = this.chartData.reduce(
      (acc, { baseDate, sum }) => {
        acc.data.push(sum);
        acc.labels.push(baseDate.split('-')[1]);
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
