import { getDeclension } from './util.js';

const GUEST_WORDS = ['гостя', 'гостей', 'гостей'];
const ROOM_WORDS = ['комната', 'комнаты', 'комнат'];


const similarAdsTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const offerTypeDictionary = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

const fillData = (selector, selectorData) => {
  if (selectorData) {
    selector.textContent = selectorData;
  } else {
    selector.remove();
  }
};

const fillFeatures = (featureList, features) => {
  features.forEach((feature) => {
    const li = document.createElement('li');
    li.classList.add('popup__feature', `popup__feature--${feature}`);
    featureList.append(li);
  });
};

const fillPhotos = (block, photos, template) => {
  photos.forEach((userPhoto) => {
    const photoListItem = template.cloneNode(true);
    photoListItem.src = userPhoto;

    block.append(photoListItem);
  });
};

const renderPopup = ({ offer, author }) => {
  const adPopup = similarAdsTemplate.cloneNode(true);
  const {
    title,
    address,
    price,
    rooms,
    guests,
    checkin,
    checkout,
    photos,
    description,
    features,
    type
  } = offer;

  const titlePopup = adPopup.querySelector('.popup__title');
  const addressPopup = adPopup.querySelector('.popup__text--address');
  const pricePopup = adPopup.querySelector('.popup__text--price');
  const capacityPopup = adPopup.querySelector('.popup__text--capacity');
  const timePopup = adPopup.querySelector('.popup__text--time');
  const descriptionPopup = adPopup.querySelector('.popup__description');
  const featurePopup = adPopup.querySelector('.popup__features');
  const typePopup = adPopup.querySelector('.popup__type');
  const photoPopup = adPopup.querySelector('.popup__photos');
  const photoTemplate = adPopup.querySelector('.popup__photo');
  const avatar = adPopup.querySelector('.popup__avatar');

  fillData(titlePopup, title);
  fillData(addressPopup, address);
  fillData(descriptionPopup, description);
  fillData(typePopup, offerTypeDictionary[type]);

  if(features.length > 0) {
    featurePopup.innerHTML = '';
    fillFeatures(featurePopup, features);
  } else {
    featurePopup.remove();
  }

  if(photos.length > 0) {
    photoPopup.innerHTML = '';
    fillPhotos(photoPopup, photos, photoTemplate);
  } else {
    photoPopup.remove();
  }
  //
  if(price) {
    pricePopup.innerHTML = `${price} <span>₽/ночь</span>`;
  } else {
    pricePopup.remove();
  }

  if(rooms && guests) {
    capacityPopup.textContent = `${rooms} ${getDeclension(rooms, ROOM_WORDS)} для ${guests} ${getDeclension(guests, GUEST_WORDS)}.`;
  } else {
    capacityPopup.remove();
  }

  if(checkin && checkout) {
    timePopup.textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  } else {
    timePopup.remove();
  }

  if(author.avatar) {
    avatar.src = author.avatar;
  } else {
    avatar.remove();
  }

  return adPopup;
};

export { renderPopup };
