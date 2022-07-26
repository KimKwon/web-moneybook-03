import './index.scss';
import Component from '@/lib/component';
import BarChart from '../BarChart/index';

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
          <button>3개월</button>
          <button>6개월</button>
          <button>1년</button>
        </div>
      </div>
      <div class="bar-chart"></div>
    </div>  
    `;
  }

  render() {
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

    const chartData = data1.reduce(
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
