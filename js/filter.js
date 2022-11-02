import { ADS_COUNT, rerenderMarkers } from './map.js';
import { debounce } from './util.js';

const DEFAULT_VALUE = 'any';
const RERENDER_DELAY = 500;

const Price = {
  LOW: {
    min: '0',
    max: '10000'
  },
  MIDDLE: {
    min: '10000',
    max: '50000'
  },
  HIGH: {
    min: '50000',
    max: '100000'
  }
};

const housingTypeFilter = document.querySelector('#housing-type');
const housingPriceFilter = document.querySelector('#housing-price');
const housingRoomsFilter = document.querySelector('#housing-rooms');
const housingGuestsFilter = document.querySelector('#housing-guests');
const housingFeaturesFilter = document.querySelector('#housing-features');
const mapFilters = document.querySelector('.map__filters');


const checkHousingType = ({ offer }) => offer.type === housingTypeFilter.value || housingTypeFilter.value === DEFAULT_VALUE;
const checkRoomAmount = ({ offer }) => String(offer.rooms) === housingRoomsFilter.value || housingRoomsFilter.value === DEFAULT_VALUE;
const checkGuestsAmount = ({ offer }) => String(offer.guests) === housingGuestsFilter.value || housingGuestsFilter.value === DEFAULT_VALUE;
const checkPriceRange = ({ offer }) => {
  const currentPrice = (housingPriceFilter.value).toUpperCase();

  return currentPrice === DEFAULT_VALUE ||
    (offer.price > Price[currentPrice].min && offer.price < Price[currentPrice].max);
};

const checkHousingFeature = ({ offer }) => {
  const featuresChecked = housingFeaturesFilter.querySelectorAll('input:checked');

  if (featuresChecked.length === 0) {
    return true;
  }

  if (offer.features) {
    const offerFeatures = offer.features;
    return Array.from(featuresChecked).every((input) => offerFeatures.includes(input.value));
  }
};

const filterAds = (ads) => {
  const filteredAds = [];

  for (const ad of ads) {
    if (filteredAds.length >= ADS_COUNT) {
      break;
    }

    if (
      checkHousingType(ad)
      && checkRoomAmount(ad)
      && checkGuestsAmount(ad)
      && checkPriceRange(ad)
      && checkHousingFeature(ad)
    ) {
      filteredAds.push(ad);
    }
  }

  return filteredAds;
};

const onFormFilterChange = (data) => {
  const filteredAds = filterAds(data);
  rerenderMarkers(filteredAds);
};

const setFilterListener = (data) => {
  mapFilters.addEventListener('change', debounce(() => onFormFilterChange(data), RERENDER_DELAY));
  mapFilters.addEventListener('reset', debounce(() => onFormFilterChange(data), RERENDER_DELAY));
};

export { setFilterListener };
