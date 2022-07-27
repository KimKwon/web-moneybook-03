import BarChartContainer from '@/components/BarChartContainer/index';
import Header from '@/components/Header/index';

function Statistic($root) {
  const $header = $root.querySelector('header');
  const $main = $root.querySelector('main');
  new Header($header);
  const initialState = { month: 7, year: 2022, categoryId: 1, period: 6 };
  new BarChartContainer($main, initialState);
}

export default Statistic;
