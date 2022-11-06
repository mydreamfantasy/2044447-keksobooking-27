import { resetPage } from './validation.js';

const form = document.querySelector('.ad-form');
const formFieldsets = form.querySelectorAll('fieldset');
const mapForm = document.querySelector('.map__filters');
const mapFieldsets = mapForm.querySelectorAll('fieldset, select');
const resetButton = document.querySelector('.ad-form__reset');

const toggleAttr = (formFields, state) => {
  formFields.forEach((field) => {
    field.disabled = state;
  });
};

const deactivatePage = () => {
  toggleAttr(formFieldsets);
  toggleAttr(mapFieldsets);
  form.classList.add('ad-form--disabled');
  mapForm.classList.add('map__filters--disabled');
};

const activateForm = () => {
  form.classList.remove('ad-form--disabled');
  toggleAttr(formFieldsets);
};

const activateFilter = () => {
  mapForm.classList.remove('map__filters--disabled');
  toggleAttr(mapFieldsets);
};

const resetBtnPage = (evt) => {
  evt.preventDefault();
  resetPage();
};

resetButton.addEventListener('click', resetBtnPage);

export { deactivatePage, activateForm, activateFilter };
