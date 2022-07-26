import BarChart from '@/components/BarChart/index';
import Header from '@/components/Header/index';
import MonthController from '@/components/Header/monthController';

function Statistic($root) {
  const $header = $root.querySelector('header');
  const $main = $root.querySelector('main');
  new Header($header);

  const $barChart = new BarChart([100000, 233000, 160000, 140000, 70000, 150400], 50);
  $main.innerHTML += $barChart.template();
}

export default Statistic;
