import BarChartContainer from '@/components/BarChartContainer/index';
import Header from '@/components/Header/index';

function Statistic($root) {
  const $header = $root.querySelector('header');
  const $main = $root.querySelector('main');
  new Header($header);
  new BarChartContainer($main);
}

export default Statistic;
