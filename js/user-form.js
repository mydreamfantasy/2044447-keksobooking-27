
const form = document.querySelector('.ad-form');
const formFieldsets = form.querySelectorAll('fieldset');
const mapForm = document.querySelector('.map__filters');
const mapFieldsets = mapForm.querySelectorAll('fieldset, select');


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
