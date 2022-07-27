import AccountForm from '@/components/AccountForm/index';
import AccountHistory from '@/components/AccountHistory/index';
import Header from '@/components/Header/index';

function Main($root) {
  const $header = $root.querySelector('header');
  const $main = $root.querySelector('main');
  $main.innerHTML = '';

  new Header($header);
  const $accountForm = new AccountForm($main);

  const onChangeFormData = (nextState) => {
    $accountForm.refetchFormData(nextState);
  };

  new AccountHistory($main, {}, onChangeFormData);
}

export default Main;
