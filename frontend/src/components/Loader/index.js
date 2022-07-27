import './index.scss';

import { SELECTOR_MAP } from '@/constants/selector-map';
import store from '@/store/index';

class Loader {
  constructor($target) {
    this.$target = $target;
    this.$loader = this.createLoaderTemplate();
  }

  createLoaderTemplate() {
    const loaderRef = document.createElement('div');
    loaderRef.innerHTML = '로딩중...';
    loaderRef.className = 'loader';

    return loaderRef;
  }

  render() {
    const currentLoadingState = store.getState(SELECTOR_MAP.IS_LOADING);
    if (currentLoadingState) this.$target.appendChild(this.$loader);
    else {
      this.$loader.remove();
    }
  }
}

export default Loader;
