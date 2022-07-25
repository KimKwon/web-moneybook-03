import xIcon from '@/assets/icon/x.svg';

import './index.scss';

class DropDown {
  constructor($target, list, handleClick, isRemovable) {
    this.$target = $target;
    this.list = list;
    this.handleClick = handleClick;
    this.isRemovable = isRemovable;

    this.init();
    this.render();
  }

  init() {
    this.$dropdownItems = document.createElement('ul');
    this.$dropdownItems.className = 'dropdown hide';

    this.$dropdownItems.addEventListener('click', (e) => {
      e.stopPropagation();
      const xButton = e.target.closest('.dropdown__remove-button');
      const listItem = e.target.closest('.dropdown__item');
      if (xButton) {
        // 삭제 API 요청
        this.toggle();
      } else if (listItem) {
        const { categoryName, id } = listItem.dataset;
        this.handleClick(categoryName, id);
        this.toggle();
      }
    });

    document.addEventListener('click', ({ target }) => {
      if (!this.$target.contains(target)) this.toggle(true);
    });
  }

  toggle(forceState) {
    this.$dropdownItems.classList.toggle('hide', forceState);
  }

  template() {
    console.log(this.list);
    return this.list
      .map(
        ({ name, id }, index) => /* html */ `
      <li class="dropdown__item" data-id="${id}" data-category-name="${name}">
        <span>${name}</span>
        ${
          this.isRemovable
            ? `<button class="dropdown__remove-button" type="button">${xIcon}</button>`
            : ''
        }
      </li>
      ${
        index < this.list.length - 1
          ? /*html */
            ` 
              <div class="dropdown__delimiter"></div>
            `
          : ''
      }
    `,
      )
      .join('');
  }

  render() {
    this.$dropdownItems.innerHTML = this.template();
    this.$target.appendChild(this.$dropdownItems);
  }
}

export default DropDown;
