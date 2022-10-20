import {
  priceField,
  minPrice,
  typeField
} from './validation.js';

const MIN_RANGE = 0;
const MAX_RANGE = 100000;

const START_RANGE = 5000;

const sliderElement = document.querySelector('.ad-form__slider');
const valueElement = document.querySelector('#price');

valueElement.value = 80;

noUiSlider.create(sliderElement, {
  range: {
    min: MIN_RANGE,
    max: MAX_RANGE,
  },
  start: START_RANGE,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on('update', () => {
  valueElement.value = sliderElement.noUiSlider.get();

});

typeField.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: priceField.value = minPrice[typeField.value],
        max: MAX_RANGE,
      },
      step: 1,
      start: priceField.value = minPrice[typeField.value],
    });
  }
});
