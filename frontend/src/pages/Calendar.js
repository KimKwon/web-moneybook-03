import Header from '@/components/Header/index';

function Calendar($root) {
  const $header = $root.querySelector('header');
  new Header($header);

  const $main = $root.querySelector('main');
  $main.innerHTML = `<h1>달력 페이지</h1>`;
}

export default Calendar;
