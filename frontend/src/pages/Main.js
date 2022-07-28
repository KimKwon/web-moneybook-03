import AccountForm from '@/components/AccountForm/index';
import AccountHistory from '@/components/AccountHistory/index';
import Header from '@/components/Header/index';
import { SELECTOR_MAP } from '@/constants/selector-map';
import store from '@/store/index';

function Main($root) {
  const $header = $root.querySelector('header');
  const $main = document.createElement('main');
  $root.querySelector('main').replaceWith($main);

  store.cleanupListener(SELECTOR_MAP.ACCOUNT_HISTORY);
  store.cleanupListener(SELECTOR_MAP.IS_LOADING);

  new Header($header);
  const $accountForm = new AccountForm($main);

  const onChangeFormData = (nextState) => {
    $accountForm.refetchFormData(nextState);
  };

  new AccountHistory($main, {}, onChangeFormData);
}

export default Main;
