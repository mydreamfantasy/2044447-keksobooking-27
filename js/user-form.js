
const form = document.querySelector('.ad-form');
const formFieldsets = form.querySelectorAll('fieldset');
const mapForm = document.querySelector('.map__filters');
const mapFieldsets = mapForm.querySelectorAll('fieldset, select');
const roomField = form.querySelector('[name="rooms"]');
const guestField = form.querySelector('[name="capacity"]');
const priceField = form.querySelector('#price');

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'text-help'
}, false);

const validateTitle = (value) => value.length >= 30 && value.length <= 100;

pristine.addValidator(
  form.querySelector('#title'),
  validateTitle,
  'От 30 до 100 символов'
);

const minPrice = {
  'bungalow': '0',
  'flat': '1000',
  'hotel': '3000',
  'house': '5000',
  'palace': '10000'
};

const validatePrice = (value) => {
  const unit = form.querySelector('[name="type"]');
  return value.length && parseInt(value, 10) >= minPrice[unit.value];
};

const getPriceErrorMessage = () => {
  const unit = form.querySelector('[name="type"]');
  return (`Не меньше ${minPrice[unit.value]} рублей`);
};

pristine.addValidator(priceField, validatePrice, getPriceErrorMessage);

const onUnitChange = () => {
  priceField.placeholder = minPrice[this.value];
  pristine.validate(priceField);
};

form.querySelectorAll('[name="type"]').forEach((item) => item.addEventListener('change', onUnitChange));

const roomOption = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0'],
};

const validateRooms = () => roomOption[roomField.value].includes(guestField.value);

const getRoomErrorMessage = () => `${roomField.value === '100' ? 'Выберете "100 комнат"' : 'Выберете другое количество комнат'}`;

const getGuestErrorMessage = () => `${roomField.value === '100' ? 'Выберете "не для гостей"' : 'Выберете другое количество гостей'}`;

pristine.addValidator(roomField, validateRooms, getGuestErrorMessage);
pristine.addValidator(guestField, validateRooms, getRoomErrorMessage);

const onCheckChange = (e) => {
  form.timein.value = e.target.value;
  form.timeout.value = e.target.value;
};

pristine.addValidator(form.addEventListener('change', onCheckChange));

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

const toggleAttr = (formFields) => {
  formFields.forEach((field) => {

    if(field.disabled) {
      field.disabled = true;
    } else {
      field.disabled = false;
    }
  });
};

const activatePage = (active) => {
  toggleAttr(formFieldsets);

  if (active) {
    form.classList.remove('ad-form--disabled');
  } else {
    form.classList.add('ad-form--disabled');
  }
};

const activateFilter = (mapLoad) => {
  toggleAttr(mapFieldsets);

  if (mapLoad) {
    mapForm.classList.remove('map__filters--disabled');
  } else {
    mapForm.classList.add('map__filters--disabled');
  }
};

export { activatePage, activateFilter };
