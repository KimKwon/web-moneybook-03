function NotFound($root) {
  const $main = document.createElement('main');
  const $header = document.querySelector('header');
  $header.innerHTML = '';
  $root.querySelector('main').replaceWith($main);

  $main.innerHTML = `
    <div class="not-found-page">
    <a is="my-anchor" href="/"></a>
      <div class="not-found-page__wrapper">
        <h1>404 낫 파운드</h1>
        
        <p>로고 눌러서 가계부 보러가요.</p>
      </div>
    </div>
  `;
}

export default NotFound;
