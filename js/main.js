
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

const getRandomPositiveInteger = (a, b) => {
  if (a < 0 || b < 0) {
    return NaN;
  }
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomPositiveFloat = (a, b, digits = 5) => {
  if (a < 0 || b < 0 || digits < 0) {
    return NaN;
  }
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);
  const result = Math.random() * (upper - lower) + lower;
  return Number(result.toFixed(digits));
};

const getArray = (array) => {
  const maxLength = array.length;
  const lengthOfArray = getRandomPositiveInteger(1, maxLength);
  const arrayRandom = [];

  while (arrayRandom.length < lengthOfArray) {
    const indexOfEl = getRandomPositiveInteger(0, maxLength - 1);
    const el = array[indexOfEl];

    if (!arrayRandom.includes(el)) {
      arrayRandom.push(el);
    }
  }
  return arrayRandom;
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const makeAvatarIndex = () => {
  let count = 0;

  return function() {
    count++;
    if (count < 10) {
      count = `0${count}`;
    }

    return count;
  };
};

const counter = makeAvatarIndex();


const getAdsNearby = () => {
  const randomLat = getRandomPositiveFloat (LAT_MIN, LAT_MAX);
  const randomLng = getRandomPositiveFloat (LNG_MIN, LNG_MAX);


  return {
    author: {
      avatar: `img/avatars/user${counter()}.png`,
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

const similarAds = Array.from({length: SIMILAR_ADS}, getAdsNearby); // eslint-disable-line no-unused-vars
