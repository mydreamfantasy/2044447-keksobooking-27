
const form = document.querySelector('.ad-form');
const formFieldsets = form.querySelectorAll('fieldset');
const mapForm = document.querySelector('.map__filters');
const mapFieldsets = mapForm.querySelectorAll('fieldset, select');

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'text-help'
}, false);


function validateTitle (value) {
  return value.length >= 30 && value.length <= 100;
}

pristine.addValidator(
  form.querySelector('#title'),
  validateTitle,
  'От 30 до 100 символов'
);

const priceField = form.querySelector('#price');
const minPrice = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

function validatePrice (value) {
  const unit = form.querySelector('#room_number').querySelector('option[selected="selected"]');
  return value.length && parseInt(value, 10) <= minPrice[unit.value];
}

function getPriceErrorMessage () {
  const unit = form.querySelector('#room_number').querySelector('option[selected="selected"]');
  return `Не меньше ${minPrice[unit.value]} рублей`;
}

pristine.addValidator(priceField, validatePrice, getPriceErrorMessage);

function onUnitChange () {
  priceField.placeholder = minPrice[this.value];
  pristine.validate(priceField);
}

form.querySelectorAll('[name="unit"]').forEach((item) => item.addEventListener('change', onUnitChange));

const roomField = form.querySelector('[name="room_number"]');
const guestField = form.querySelector('[name="capacity"]');
const roomOption = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0'],
};

function validateRooms () {
  return roomOption[roomField.value].includes(guestField.value);
}

function getRoomErrorMessage () {
  return `
    ${roomField.value}
    ${guestField.value}
    ${roomField.value === '100 комнат' ? 'выберете не для гостей' : 'невозможен'}
  `;
}

pristine.addValidator(roomField, validateRooms, getRoomErrorMessage);
pristine.addValidator(guestField, validateRooms, getRoomErrorMessage);


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
