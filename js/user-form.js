const getActivePage = (active) => {

  if (active === false) {
    const form = document.querySelector('.ad-form');
    const formAvatar = form.querySelector('.ad-form-header__input');
    const formFieldset = form.querySelector('.ad-form__element');
    const mapForm = document.querySelector('.map__filters');
    const mapFormFieldset = mapForm.querySelector('.map__filter');

    const addAttribute = (input) => {
      input.setAttribute('disabled', 'disabled');
    };

    form.classList.add('ad-form--disabled');
    mapForm.classList.add('map__filters--disabled');

    addAttribute(formAvatar);
    addAttribute(formFieldset);
    addAttribute(mapFormFieldset);
  }
};


export { getActivePage };
