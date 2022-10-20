import { changePageState, changeFilterState } from './user-form.js';
import { setupValidation } from './validation.js';
import { makeMap } from './map.js';
import './slider.js';

changePageState(true);
changeFilterState(false);
makeMap();
setupValidation();

