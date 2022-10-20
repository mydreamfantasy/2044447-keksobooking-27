import { changeFilterState } from './user-form.js';
import { createAds } from './data.js';
import { renderPopup } from './popup.js';

const START_LAT = 35.68249;
const START_LNG = 139.75271;

const mapCanvas = document.querySelector('#map-canvas');
const resetButton = document.querySelector('.ad-form__reset');
const addressField = document.querySelector('#address');

const ads = createAds();

const map = L.map(mapCanvas).setView({lat: START_LAT, lng: START_LNG,}, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);


const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: START_LAT,
    lng: START_LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  addressField.placeholder = evt.target.getLatLng();});

resetButton.addEventListener('click', () => {
  mainPinMarker.setLatLng({
    lat: START_LAT,
    lng: START_LNG,
  });

  map.setView({
    lat: START_LAT,
    lng: START_LNG,
  }, 12);
});

const createMarker = (item) => {
  const lat = item.location.lat;
  const lng = item.location.lng;
  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  );

  marker
    .addTo(map)
    .bindPopup(renderPopup(item));
};

ads.forEach((item) => {
  createMarker(item);
});


const makeMap = () => {
  map.on('load', () => changeFilterState(true));
};

export { makeMap };
