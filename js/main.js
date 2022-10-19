import { createAds } from './data.js';
import { renderPopup } from './popup.js';
import { changePageState, changeFilterState } from './user-form.js';
import { setupValidation } from './validation.js';

const map = document.querySelector('.map__canvas');

const ads = createAds();
const popup = renderPopup(ads[0]);

map.append(popup);
changePageState(true);
changeFilterState(false);
setupValidation();
