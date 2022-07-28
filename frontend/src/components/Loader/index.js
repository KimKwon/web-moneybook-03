import './index.scss';

import { SELECTOR_MAP } from '@/constants/selector-map';
import store from '@/store/index';

class Loader {
  static currentLoader = this.createLoaderTemplate();

  static createLoaderTemplate() {
    const $loaderBox = document.createElement('div');
    const $loaderText = document.createElement('span');
    $loaderText.innerText = 'LOADING . . .';
    $loaderBox.appendChild($loaderText);
    $loaderBox.className = 'loader';

    return $loaderBox;
  }

  static showLoader($target) {
    const currentLoadingState = store.getState(SELECTOR_MAP.IS_LOADING);
    if (currentLoadingState) {
      $target.innerHTML = '';
      $target.appendChild(this.currentLoader);
    } else {
      this.currentLoader.remove();
    }
  }
}

export default Loader;
