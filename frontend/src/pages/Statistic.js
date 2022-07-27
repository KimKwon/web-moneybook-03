import BarChartContainer from '@/components/BarChartContainer/index';
import Header from '@/components/Header/index';

function Statistic($root) {
  const $header = $root.querySelector('header');
  const $main = $root.querySelector('main');
  new Header($header);
  const initialState = { month: 7, year: 2022, categoryId: 1, period: 12 };
  const $barChart = new BarChartContainer($main, initialState);

  const $testButton = document.createElement('button');
  $testButton.innerHTML = 'testButton';
  $testButton.addEventListener('click', () => {
    $barChart.setState({ month: 6, year: 2022, categoryId: 1, period: 3 });
  });
  $root.appendChild($testButton);
}

export default Statistic;
