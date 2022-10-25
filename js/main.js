import { deactivatePage } from './user-form.js';
import { setupValidation } from './validation.js';
import { initSlider } from './slider.js';
import { getData } from './api.js';


deactivatePage();
setupValidation();
initSlider();

getData();

