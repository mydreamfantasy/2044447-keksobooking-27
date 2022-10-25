import { activateForm } from './user-form.js';
import { renderPopup } from './popup.js';

const START_LAT = 35.68249;
const START_LNG = 139.75271;
const ZOOM = 12;
const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const TILE = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

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

const map = L.map(mapCanvas).setView({lat: START_LAT, lng: START_LNG,}, ZOOM);

L.tileLayer(
  TILE,
  {
    attribution: ATTRIBUTION,
  },
).addTo(map);


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

addressField.value = `${START_LAT}, ${START_LNG}`;

const onMarkerMove = (evt) => {
  const addressValue = `${((evt.target.getLatLng()).lat).toFixed(5) } ,${ ((evt.target.getLatLng()).lng).toFixed(5)}`;
  addressField.value = addressValue;
};

const resetMap = () => {
  mainPinMarker.setLatLng({
    lat: START_LAT,
    lng: START_LNG,
  });

  map.setView({
    lat: START_LAT,
    lng: START_LNG,
  }, ZOOM);
};

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

const renderMarkers = (offers) => {
  offers.forEach(createMarker);
};

const makeMap = (ads) => {
  map.whenReady( () => {
    activateForm();
    renderMarkers(ads);
  });
  mainPinMarker.addTo(map);
  mainPinMarker.on('move', onMarkerMove);
};

export { makeMap, resetMap };
