import './index.scss';

class Modal {
  constructor() {
    this.modalInfo = {
      isDeleteModal: false,
      title: '',
      target: '',
      confirmText: '',
      onConfirm: () => '',
    };

    this.init();
    this.render();
  }

  handleOutsideClick = ({ target }) => {
    if (!target.closest('.modal__content')) this.toggle(true);
  };

  open(modalInfo) {
    this.modalInfo = { ...this.modalInfo, ...modalInfo };

    const { onConfirm, isDeleteModal } = this.modalInfo;

    this.$modal.innerHTML = this.template();
    this.toggle(false);

    const confirmButton = this.$modal.querySelector('.modal__button-confirm');
    confirmButton.onclick = () => {
      onConfirm(isDeleteModal ? '' : this.modalInfo.target);
      this.close();
    };
  }

  close() {
    this.toggle(true);
  }

  toggle(forceState) {
    this.$modal.classList.toggle('hide', forceState);

    if (this.$modal.classList.contains('hide')) {
      document.removeEventListener('click', this.handleOutsideClick);
    } else {
      document.addEventListener('click', this.handleOutsideClick);
    }
  }

  init() {
    this.$modal = document.createElement('div');
    this.$modal.className = 'modal hide';

    this.attachEvent();
  }

  attachEvent() {
    this.$modal.addEventListener('click', ({ target }) => {
      const cancelButton = target.closest('.modal__button-cancel');
      if (!cancelButton) return;
      this.close();
    });

    this.$modal.addEventListener('input', ({ target }) => {
      const contentInput = target.closest('.modal__content-input');
      if (!contentInput) return;

      this.modalInfo.target = contentInput.value;
    });
  }

  template() {
    const { title, target, confirmText, isDeleteModal } = this.modalInfo;
    return /* html */ `
      <div class="modal__background">
        <div class="modal__content">
          <div class="modal__content-title">${title}</div>
          <input type="text" class="modal__content-input" ${
            isDeleteModal ? 'readonly' : ''
          } value="${target}" placeholder="입력하세요" >
          <div class="modal__footer">
            <button class="modal__button-cancel" type="button">취소</button>
            <button class="${`modal__button-confirm ${
              isDeleteModal ? 'remove' : 'add'
            }`}" type="button">${confirmText}</button>
          </div>
        </div>
      </div>
    `;
  }

  render() {
    document.body.appendChild(this.$modal);
  }
}

export default Modal;
