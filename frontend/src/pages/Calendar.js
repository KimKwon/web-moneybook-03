import Calendar from '@/components/Calendar/index';
import Header from '@/components/Header/index';

function CalendarPage($root) {
  const $header = $root.querySelector('header');
  const $main = $root.querySelector('main');
  new Header($header);
  new Calendar($main);
}

export default CalendarPage;
