import { sendData } from './api';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_ROOM = 100;

const form = document.querySelector('.ad-form');
const titleField = form.querySelector('#title');
const roomField = form.querySelector('#room_number');
const guestField = form.querySelector('#capacity');
const priceField = form.querySelector('#price');
const checkin = form.querySelector('#timein');
const checkout = form.querySelector('#timeout');
const typeField = form.querySelector('#type');

const minPrice = {
  bungalow: '0',
  flat: '1000',
  hotel: '3000',
  house: '5000',
  palace: '10000'
};

const roomOption = {
  1: ['1'],
  2: ['2', '1'],
  3: ['3', '2', '1'],
  100: ['0'],
};

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'text-help'
}, false);

const validateTitle = (value) => value.length >= MIN_TITLE_LENGTH && value.length <= MAX_TITLE_LENGTH;
const getTitleErrorMessage = () => `От ${MIN_TITLE_LENGTH} до ${MAX_TITLE_LENGTH} символов`;

const onCheckChange = ({ target }) => {
  checkin.value = target.value;
  checkout.value = target.value;
};

const validatePrice = (value) => value.length && parseInt(value, 10) >= minPrice[typeField.value];
const getPriceErrorMessage = () => (`Не меньше ${minPrice[typeField.value]} рублей`);
const onTypeChange = () => {
  priceField.placeholder = minPrice[typeField.value];
  pristine.validate(priceField);
};

const validateRooms = () => roomOption[roomField.value].includes(guestField.value);
const getRoomErrorMessage = () => `${roomField.value === MAX_ROOM ? 'Выберете "100 комнат"' : 'Выберете другое количество комнат'}`;
const getGuestErrorMessage = () => `${roomField.value === MAX_ROOM ? 'Выберете "не для гостей"' : 'Выберете другое количество гостей'}`;


const errorMessage = document.querySelector('#error')
  .content
  .querySelector('.error');

const successMessage = document.querySelector('#success')
  .content
  .querySelector('.success');

const onError = () => {
  const errorPopup = errorMessage.cloneNode(true);
  const resetBtn = errorPopup.querySelector('.error__button');

  document.body.append(errorPopup);
  resetBtn.addEventListener('click', () => {
    errorPopup.style.display = 'none';
  });
};

const onSuccess = () => {
  const successPopup = successMessage.cloneNode(true);
  document.body.append(successPopup);
  const isEscapeKey = (evt) => evt.key === 'Escape';

  const onPopupEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeUserModal();
    }
  };

  document.addEventListener('keydown', onPopupEscKeydown);

  const closeUserModal = () => {
    successPopup.style.display = 'none';
    document.removeEventListener('keydown', onPopupEscKeydown);
  };
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  if(pristine.validate()) {
    sendData(
      () => onSuccess(),
      () => onError(),
      new FormData(evt.target),
    );
  }
};

const setupValidation = () => {
  pristine.addValidator(titleField, validateTitle, getTitleErrorMessage);
  pristine.addValidator(priceField, validatePrice, getPriceErrorMessage);
  pristine.addValidator(roomField, validateRooms, getGuestErrorMessage);
  pristine.addValidator(guestField, validateRooms, getRoomErrorMessage);

  typeField.addEventListener('change', onTypeChange);
  checkin.addEventListener('change', onCheckChange);
  checkout.addEventListener('change', onCheckChange);

  form.addEventListener('submit', onFormSubmit);
};

export {
  setupValidation,
  priceField,
  minPrice,
  typeField
};
