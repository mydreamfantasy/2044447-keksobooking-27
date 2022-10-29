
import { isEscapeKey } from './util.js';

const errorMessage = document.querySelector('#error')
  .content
  .querySelector('.error');

const successMessage = document.querySelector('#success')
  .content
  .querySelector('.success');


const showErrorMessage = () => {
  const errorPopup = errorMessage.cloneNode(true);
  document.body.append(errorPopup);

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
    errorPopup.remove();
    document.removeEventListener('keydown', onPopupEscKeydown);
    document.removeEventListener('click', onPopupCloseClick);
  }

  document.addEventListener('keydown', onPopupEscKeydown);
  document.addEventListener('click', onPopupCloseClick);
};

const showSuccessMessage = () => {
  const successPopup = successMessage.cloneNode(true);
  document.body.append(successPopup);

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
    successPopup.remove();
    document.removeEventListener('keydown', onPopupEscKeydown);
    document.removeEventListener('click', onPopupCloseClick);
  }

  document.addEventListener('keydown', onPopupEscKeydown);
  document.addEventListener('click', onPopupCloseClick);
};

export { showErrorMessage, showSuccessMessage };
