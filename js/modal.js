
import { isEscapeKey } from './util.js';

const errorMessage = document.querySelector('#error')
  .content
  .querySelector('.error');

const successMessage = document.querySelector('#success')
  .content
  .querySelector('.success');

const renderMessage = (node) => {
  document.body.append(node);

  const onPopupEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeUserModal();
    }
  };

  const onPopupCloseClick = () => {
    closeUserModal();
  };

  function closeUserModal() {
    node.remove();
    document.removeEventListener('keydown', onPopupEscKeydown);
  }

  document.addEventListener('keydown', onPopupEscKeydown);
  node.addEventListener('click', onPopupCloseClick);
};

const showErrorMessage = () => {
  const errorPopup = errorMessage.cloneNode(true);
  renderMessage(errorPopup);
};

const showSuccessMessage = () => {
  const successPopup = successMessage.cloneNode(true);
  renderMessage(successPopup);
};

export { showErrorMessage, showSuccessMessage };
