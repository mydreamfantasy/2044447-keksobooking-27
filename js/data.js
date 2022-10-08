import {getRandomArrayElement, getRandomPositiveInteger, getRandomPositiveFloat, getArray, makeCounterIndex} from './util.js';

const TITLES = [
  'Уютный дом',
  'Классная квартира с супер видом',
  'Милое бунгало',
  'Дворец для царей',
  'Отель хостел',
];

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const CHECKIN = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECKOUT = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const DESCRIPTION = [
  'Останавливайтесь здесь и не пожалеете',
  'Лучшее место, чтобы придаться блаженству',
  'Виды - это наш конек! ',
  'Вдали от шумных улиц и запахов еды',
  'Самое топовое место среди аутентичных улиц и кучи проводов',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const LAT_MIN = 35.65000;
const LAT_MAX = 35.70000;

const LNG_MIN = 139.70000;
const LNG_MAX = 139.80000;

const SIMILAR_ADS = 10;

const counter = makeCounterIndex();


const getAdsNearby = () => {
  const randomLat = getRandomPositiveFloat (LAT_MIN, LAT_MAX);
  const randomLng = getRandomPositiveFloat (LNG_MIN, LNG_MAX);


  return {
    author: {
      avatar: `img/avatars/user${counter().toString().padStart(2, '0')}.png`,
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${randomLat}, ${randomLng}`,
      price: getRandomPositiveInteger(0, 1000000),
      types: getRandomArrayElement(TYPES),
      rooms: getRandomPositiveInteger(0, 1000),
      guests: getRandomPositiveInteger(0, 1000),
      checkin: getRandomArrayElement(CHECKIN),
      checkout: getRandomArrayElement(CHECKOUT),
      features: getArray(FEATURES),
      description: getRandomArrayElement(DESCRIPTION),
      photos: getArray(PHOTOS),
    },
    location: {
      lat: randomLat,
      lng: randomLng,
    },
  };
};

const createAds = () => Array.from({length: SIMILAR_ADS}, getAdsNearby); // eslint-disable-line no-unused-vars

export {createAds};
