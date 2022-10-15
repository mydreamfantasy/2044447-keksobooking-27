
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

  if (active) {
    removeAttr(formFieldsets);
    removeAttr(formHeaders);
    form.classList.remove('ad-form--disabled');

  } else {
    addAttr(formFieldsets);
    addAttr(formHeaders);
    form.classList.add('ad-form--disabled');
  }
};

const activateFilter = (mapLoad) => {
  const mapForm = document.querySelector('.map__filters');
  const mapFormSelects = mapForm.querySelectorAll('.map__filter');
  const mapFieldsets = mapForm.querySelectorAll('.map__features');

  if (mapLoad) {
    removeAttr(mapFormSelects);
    removeAttr(mapFieldsets);
    mapForm.classList.remove('map__filters--disabled');
  } else {
    mapForm.classList.add('map__filters--disabled');
    addAttr(mapFormSelects);
    addAttr(mapFieldsets);
  }
};

export { activatePage, activateFilter };
