import Header from '@/components/Header/index';

function Statistic($root) {
  const $header = $root.querySelector('header');
  new Header($header);

  const $main = $root.querySelector('main');
  $main.innerHTML = `<h1>통계페이지</h1>`;
}

export default Statistic;
