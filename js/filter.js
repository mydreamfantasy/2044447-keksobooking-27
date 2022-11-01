import { ADS_COUNT, rerenderMarkers } from './map.js';

const DEFAULT_VALUE = 'any';

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

  const priceFilterOptions = {
    'any': offer.price,
    'low': offer.price < 10000,
    'middle': offer.price > 10000 && offer.price < 50000,
    'high': offer.price > 50000
  };

  return priceFilterOptions[housingPriceFilter.value];
};

const checkHousingFeature = ({ offer }) => {
  const featureschecked = housingFeaturesFilter.querySelectorAll('input:checked');
  const checkedList = [];

  featureschecked.forEach((input) => checkedList.push(input.value));

  if (checkedList.length === 0) {
    return true;
  }

  if (Object.keys(offer).includes('features')) {
    const offerFeatures = offer.features;
    return checkedList.every((feature) => offerFeatures.includes(feature));
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
  mapFilters.addEventListener('change', () => onFormFilterChange(data));
};

export { setFilterListener };
