import BarChart from '@/components/BarChart/index';
import Header from '@/components/Header/index';
import MonthController from '@/components/Header/monthController';

function Statistic($root) {
  const $header = $root.querySelector('header');
  const $main = $root.querySelector('main');
  new Header($header);
  const data1 = [
    {
      baseDate: '2022-06',
      sum: '850000원',
    },
    {
      baseDate: '2022-07',
      sum: '516515944',
    },
  ];
  const data = ['850000', '5167183', '600000'];
  const labels = ['2022-06', '2022-07', '2022-08'];
  const barChartState = { data, labels, width: 800, height: 500, row: 8, split: 3 };
  new BarChart($main, barChartState);
}

export default Statistic;
