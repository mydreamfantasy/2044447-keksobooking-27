import { resetMap } from './map.js';
import { isEscapeKey } from './util.js';

const errorMessage = document.querySelector('#error')
  .content
  .querySelector('.error');

const successMessage = document.querySelector('#success')
  .content
  .querySelector('.success');

const onSendError = () => {
  const errorPopup = errorMessage.cloneNode(true);
  const resetBtn = errorPopup.querySelector('.error__button');
  document.body.append(errorPopup);
  resetBtn.addEventListener('click', () => {
    errorPopup.remove();
  });
};

const onSendSuccess = () => {
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

  document.querySelector('.ad-form').reset();
  resetMap();

  function closeUserModal() {
    successPopup.remove();
    document.removeEventListener('keydown', onPopupEscKeydown);
    document.addEventListener('click', onPopupCloseClick);
  }

  document.addEventListener('keydown', onPopupEscKeydown);
  document.addEventListener('click', onPopupCloseClick);
};

export { onSendError, onSendSuccess };
