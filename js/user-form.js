
const addAttr = (formField) => {
  formField.forEach((field) => {
    field.setAttribute('disabled', 'disabled');
  });
};

const deActivatePage = (nonActive) => {
  if (nonActive) {
    const form = document.querySelector('.ad-form');
    const formHeaders = form.querySelectorAll('.ad-form-header');
    const formFieldsets = form.querySelectorAll('.ad-form__element');
    const mapForm = document.querySelector('.map__filters');
    const mapFormSelects = mapForm.querySelectorAll('.map__filter');
    const mapFieldsets = mapForm.querySelectorAll('.map__features');

    addAttr(formFieldsets);
    addAttr(mapFormSelects);
    addAttr(mapFieldsets);
    addAttr(formHeaders);
    form.classList.add('ad-form--disabled');
    mapForm.classList.add('map__filters--disabled');
  }
};

const activatePage = (loading) => {
  if (loading) {
    return deActivatePage(false);
  } else {
    return deActivatePage(true);
  }
};

export { activatePage };
