import { activateForm, activateFilter } from './user-form.js';
import { renderPopup } from './popup.js';
import { getData } from './api.js';
import { showAlert } from './util.js';
import { setFilterListener } from './filter.js';

const ZOOM = 12;
const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const TILE = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const ADS_COUNT = 10;

const StartCoordinates = {
  LAT: 35.68249,
  LNG: 139.75271,
};

const mapCanvas = document.querySelector('#map-canvas');
const addressField = document.querySelector('#address');

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

const map = L.map(mapCanvas).setView({lat: StartCoordinates.LAT, lng: StartCoordinates.LNG,}, ZOOM);

L.tileLayer(
  TILE,
  {
    attribution: ATTRIBUTION,
  },
).addTo(map);

const mainPinMarker = L.marker(
  {
    lat: StartCoordinates.LAT,
    lng: StartCoordinates.LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const setDefaultAddress = () => {
  addressField.value = `${StartCoordinates.LAT}, ${StartCoordinates.LNG}`;
};

const onMarkerMove = (evt) => {
  const addressValue = `${((evt.target.getLatLng()).lat).toFixed(5) }, ${ ((evt.target.getLatLng()).lng).toFixed(5)}`;
  addressField.value = addressValue;
};

const markerGroup = L.layerGroup().addTo(map);

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
    .addTo(markerGroup)
    .bindPopup(renderPopup(item));
};

const renderMarkers = (offers) => offers.forEach(createMarker);

const clearMap = () => {
  markerGroup.clearLayers();
};

const resetMap = () => {
  mainPinMarker.setLatLng({
    lat: StartCoordinates.LAT,
    lng: StartCoordinates.LNG,
  });

  map.setView({
    lat: StartCoordinates.LAT,
    lng: StartCoordinates.LNG,
  }, ZOOM);

  setDefaultAddress();
  clearMap();
};

const rerenderMarkers = (ads) => {
  clearMap();
  renderMarkers(ads);
};

const onDataLoad = (ads) => {
  renderMarkers(ads.slice(0, ADS_COUNT));
  activateFilter();
  setFilterListener(ads);
};

const onDataFailed = () => {
  showAlert('О, нет! Что-то сломалось. Попробуйте ещё раз');
};

const makeMap = () => {
  map.whenReady( () => {
    activateForm();
    getData(onDataLoad, onDataFailed);
  });

  setDefaultAddress();
  mainPinMarker.addTo(map);
  mainPinMarker.on('move', onMarkerMove);
};

export { makeMap, resetMap, rerenderMarkers, ADS_COUNT };
