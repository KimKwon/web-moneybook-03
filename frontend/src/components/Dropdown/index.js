import xIcon from '@/assets/icon/x.svg';
import { SELECTOR_MAP } from '@/constants/selector-map';
import Modal from '../Modal/index';

import './index.scss';

const ADD_MODAL_INFO = {
  title: '추가하실 결제수단을 적어주세요.',
  confirmText: '등록',
};

const DELETE_MODAL_INFO = {
  title: '해당 결제수단을 삭제하시겠습니까?',
  confirmText: '삭제',
};

class DropDown {
  constructor($target, dropdownData, handleClick, handleAdd, handleDelete, isMethodDropdown) {
    this.$target = $target;
    this.dropdownData = dropdownData;
    this.handleClick = handleClick;
    this.handleAdd = handleAdd;
    this.handleDelete = handleDelete;
    this.isMethodDropdown = isMethodDropdown;

    this.$modal = isMethodDropdown && new Modal();
    this.$dropdownItems = document.createElement('ul');
    this.$dropdownItems.className = 'dropdown hide';

    this.init();
    this.render();
  }

  refetchDropdownData(newDropdownData) {
    this.dropdownData = newDropdownData;
    this.$dropdownItems.innerHTML = this.template();
  }

  handleOutsideClick = ({ target }) => {
    if (!this.$target.contains(target)) this.toggle(true);
  };

  init() {
    this.$dropdownItems.addEventListener('click', (e) => {
      e.stopPropagation();
      const xButton = e.target.closest('.dropdown__remove-button');
      const listItem = e.target.closest('.dropdown__item');
      const { name, id } = listItem.dataset;

      this.toggle(true);
      if (!xButton && !listItem) return;

      if (xButton) {
        this.handleDeleteWithModal(name, id);
        return;
      }

      if (listItem) {
        if (listItem.classList.contains('add')) {
          this.handleAddWithModal(name);
          return;
        }
        this.handleClick(name, id);
      }
    });
  }

  handleDeleteWithModal(targetName, id) {
    this.$modal.open({
      ...DELETE_MODAL_INFO,
      target: targetName,
      onConfirm: () => this.handleDelete(id),
      isDeleteModal: true,
    });
  }

  handleAddWithModal() {
    this.$modal.open({
      ...ADD_MODAL_INFO,
      onConfirm: (targetName) => this.handleAdd(targetName),
      isDeleteModal: false,
      target: '',
    });
  }

  toggle(forceState) {
    this.$dropdownItems.classList.toggle('hide', forceState);

    if (this.$dropdownItems.classList.contains('hide')) {
      document.removeEventListener('click', this.handleOutsideClick);
    } else {
      document.addEventListener('click', this.handleOutsideClick);
    }
  }

  template() {
    return `
      ${this.dropdownData
        .map(
          ({ name, id }, index) => /* html */ `
        <li class="dropdown__item" data-id="${id}" data-name="${name}">
          <span>${name}</span>
          ${
            this.isMethodDropdown
              ? `<button class="dropdown__remove-button" type="button">${xIcon}</button>`
              : ''
          }
        </li>
        ${index < this.dropdownData.length - 1 ? `<div class="dropdown__delimiter"></div>` : ''}
      `,
        )
        .join('')}
        ${
          this.isMethodDropdown
            ? `
              <div class="dropdown__delimiter"></div>
              <li class="dropdown__item add">추가하기</li>
            `
            : ''
        }
    `;
  }

  render() {
    this.$dropdownItems.innerHTML = this.template();
    this.$target.appendChild(this.$dropdownItems);
  }
}

export default DropDown;
