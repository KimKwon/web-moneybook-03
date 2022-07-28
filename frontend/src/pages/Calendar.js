import Calendar from '@/components/Calendar/index';
import Header from '@/components/Header/index';
import { SELECTOR_MAP } from '@/constants/selector-map';
import store from '@/store/index';

function CalendarPage($root) {
  const $header = $root.querySelector('header');
  const $main = $root.querySelector('main');

  store.cleanupListener(SELECTOR_MAP.ACCOUNT_HISTORY);

  new Header($header);
  new Calendar($main);
}

export default CalendarPage;
