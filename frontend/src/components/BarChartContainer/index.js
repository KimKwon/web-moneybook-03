import './index.scss';
import Component from '@/lib/component';
import BarChart from '../BarChart/index';
import { getStatistic } from '@/lib/api/statistic';
import { monthToString } from '@/utils/date';

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

  didMount() {
    this.$target.addEventListener('click', this.handleClickEvent.bind(this));
  }
  async handleClickEvent(e) {
    const $chartButton = e.target.closest('button');
    if (!$chartButton) return;
    const period = $chartButton.dataset['period'];
    this.setState({ period });
  }

  async getChartData() {
    const { month, year, categoryId, period } = this.state;
    this.chartData = await getStatistic({
      month,
      year,
      period,
      categoryId,
    });
    const filledChartData = this.fillEmptyMonth(this.chartData, month, year, period);
    this.chartData = filledChartData;
  }

  fillEmptyMonth(targetData, month, year, period) {
    const baseDates = [];
    for (let i = 0; i < period; i++) {
      if (month - i < 1) {
        year--;
        month = 12 + i;
      }
      baseDates.push(`${year}-${monthToString(month - i)}`);
    }
    baseDates.sort(function (a, b) {
      return new Date(a) - new Date(b);
    });

    const filledData = baseDates.map((baseDate) => {
      const data = targetData.find((item) => item.baseDate === baseDate);
      return data ? data : { baseDate, sum: 0 };
    });

    return filledData;
  }

  async render() {
    await this.getChartData();
    this.$target.innerHTML = this.template();
    const $barChart = this.$target.querySelector('.bar-chart');
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
      split: 2,
    };
    new BarChart($barChart, barChartState);
  }
}

export default BarChartContainer;
