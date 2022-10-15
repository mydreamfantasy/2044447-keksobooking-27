
const addAttr = (formField) => {
  formField.forEach((field) => {
    field.setAttribute('disabled', 'disabled');
  });
};

const removeAttr = (formField) => {
  formField.forEach((field) => {
    field.removeAttribute('disabled');
  });
};

const activatePage = (active) => {
  const form = document.querySelector('.ad-form');
  const formHeaders = form.querySelectorAll('.ad-form-header');
  const formFieldsets = form.querySelectorAll('.ad-form__element');
  const mapForm = document.querySelector('.map__filters');
  const mapFormSelects = mapForm.querySelectorAll('.map__filter');
  const mapFieldsets = mapForm.querySelectorAll('.map__features');

  if (active) {
    removeAttr(formFieldsets);
    removeAttr(mapFormSelects);
    removeAttr(mapFieldsets);
    removeAttr(formHeaders);
    form.classList.remove('ad-form--disabled');
    mapForm.classList.remove('map__filters--disabled');
  } else {
    addAttr(formFieldsets);
    addAttr(mapFormSelects);
    addAttr(mapFieldsets);
    addAttr(formHeaders);
    form.classList.add('ad-form--disabled');
    mapForm.classList.add('map__filters--disabled');
    }
};

export { activatePage };
