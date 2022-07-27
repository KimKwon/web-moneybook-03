import './index.scss';

import { SELECTOR_MAP } from '@/constants/selector-map';
import store from '@/store/index';

class Loader {
  constructor($target) {
    this.$target = $target;
    this.$loader = this.createLoaderTemplate();
  }

  createLoaderTemplate() {
    const $loaderBox = document.createElement('div');
    const $loaderText = document.createElement('span');
    $loaderText.innerText = 'LOADING . . .';
    $loaderBox.appendChild($loaderText);
    $loaderBox.className = 'loader';

    return $loaderBox;
  }

  render() {
    const currentLoadingState = store.getState(SELECTOR_MAP.IS_LOADING);
    if (currentLoadingState) {
      this.$target.innerHTML = '';
      this.$target.appendChild(this.$loader);
    } else {
      this.$loader.remove();
    }
  }
}

export default Loader;
