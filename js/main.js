import { createAds } from './data.js';
import {renderPopup} from './popup.js';

const map = document.querySelector('.map__canvas');

const ads = createAds();
const popup = renderPopup(ads[0]);

map.append(popup);
