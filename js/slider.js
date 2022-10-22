
const MIN_RANGE = 0;
const MAX_RANGE = 100000;

const START_RANGE = 1000;

const sliderElement = document.querySelector('.ad-form__slider');
const valueElement = document.querySelector('#price');

noUiSlider.create(sliderElement, {
  range: {
    min: MIN_RANGE,
    max: MAX_RANGE,
  },
  start: START_RANGE,
  step: 1,
  connect: 'upper',
  format: {
    to: (value) => Number(value.toFixed(0)),
    from: (value) => parseFloat(value),
  },
});

const onSliderChange = () => {
  valueElement.value = sliderElement.noUiSlider.get();
};

const initSlider = () => {
  sliderElement.noUiSlider.on('update', onSliderChange);
};

export { initSlider };
