import { createAds } from './data.js';
import { renderPopup } from './popup.js';
import { activatePage, activateFilter } from './user-form.js';

const map = document.querySelector('.map__canvas');

const ads = createAds();
const popup = renderPopup(ads[0]);

map.append(popup);
activatePage(true);
activateFilter(false);

