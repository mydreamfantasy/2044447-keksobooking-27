
const form = document.querySelector('.ad-form');
const formFieldsets = form.querySelectorAll('fieldset');
const mapForm = document.querySelector('.map__filters');
const mapFieldsets = mapForm.querySelectorAll('fieldset, select');

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

export { deactivatePage, activateForm };
