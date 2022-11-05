import { sendData } from './api.js';
import { showErrorMessage, showSuccessMessage } from './modal.js';
import { resetMap } from './map.js';
import { sliderElement } from './slider.js';
import { previewAvatar, previewPhoto } from './avatar.js';

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
const submitButton = form.querySelector('.ad-form__submit');
const adForm = document.querySelector('.ad-form');
const mapFilter = document.querySelector('.map__filters');

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

const validatePrice = (value) => parseInt(value, 10) >= minPrice[typeField.value];
const getPriceErrorMessage = () => (`Не меньше ${minPrice[typeField.value]} рублей`);
const onTypeChange = () => {
  priceField.placeholder = minPrice[typeField.value];
  pristine.validate(priceField);
};

const validateRooms = () => roomOption[roomField.value].includes(guestField.value);
const getRoomErrorMessage = () => `${roomField.value === MAX_ROOM ? 'Выберете "100 комнат"' : 'Выберете другое количество комнат'}`;
const getGuestErrorMessage = () => `${roomField.value === MAX_ROOM ? 'Выберете "не для гостей"' : 'Выберете другое количество гостей'}`;

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const onSendSuccess = () => {
  showSuccessMessage();
  adForm.reset();
  mapFilter.reset();
  resetMap();
  sliderElement.noUiSlider.reset();
  previewPhoto.innerHTML = '';
  previewAvatar.src = 'img/muffin-grey.svg';
  unblockSubmitButton();
};

const onSendError = () => {
  showErrorMessage();
  unblockSubmitButton();
};

const onFormSubmit = (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    blockSubmitButton();
    sendData(
      onSendSuccess,
      onSendError,
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
