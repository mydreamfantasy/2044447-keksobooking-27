import { getDeclension } from './util.js';

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

const renderPopup = ( {offer, author} ) => {
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
    types} = offer;

  const titlePopup = adPopup.querySelector('.popup__title');
  const addressPopup = adPopup.querySelector('.popup__text--address');
  const pricePopup = adPopup.querySelector('.popup__text--price');
  const capacityPopup = adPopup.querySelector('.popup__text--capacity');
  const timePopup = adPopup.querySelector('.popup__text--time');
  const descriptionPopup = adPopup.querySelector('.popup__description');
  const featurePopup = adPopup.querySelector('.popup__features');
  const featureArray = adPopup.querySelectorAll('.popup__feature');
  const typePopup = adPopup.querySelector('.popup__type');
  const photoPopup = adPopup.querySelector('.popup__photos');
  const photoTemplate = adPopup.querySelector('.popup__photo');
  const avatar = adPopup.querySelector('.popup__avatar');


  const fillData = (selector, selectorData) => {
    if(selectorData) {
      selector.textContent = selectorData;
    } else {
      selector.remove();
    }
  };

  const fillFeatures = (featureList, feature) => {
    featureList.forEach((featureListItem) => {
      const isNecessary = feature.some(
        (featureMod) => featureListItem.classList.contains(`popup__feature--${ featureMod}`),
      );

      if (!isNecessary) {
        featureListItem.remove();
      }
    });
  };

  const fillPhotos = () => {
    photoPopup.innerHTML = '';
    photos.forEach((userPhoto) => {
      const photoListItem = photoTemplate.cloneNode(true);
      photoListItem.src = userPhoto;

      photoPopup.append(photoListItem);
    });
  };


  fillData(titlePopup, title);
  fillData(addressPopup, address);
  fillData(descriptionPopup, description);
  fillFeatures(featureArray, features);
  fillPhotos();

  if(features.length <= 0) {
    featurePopup.remove();
  }

  if(photos.length <= 0) {
    photoPopup.remove();
  }


  if(price) {
    pricePopup.textContent = `${ price } ₽/ночь`;
  } else {
    pricePopup.remove();
  }

  if(rooms && guests) {
    capacityPopup.textContent = `${ rooms } ${ getDeclension(rooms, 'комната', 'комнаты', 'комнат') } для ${ guests } ${ getDeclension(guests, 'гостя', 'гостей', 'гостей') }.`;
  } else {
    capacityPopup.remove();
  }


  if(checkin && checkout) {
    timePopup.textContent = `Заезд после ${ checkin }, выезд до ${ checkout }`;
  } else {
    timePopup.remove();
  }

  if(types) {
    typePopup.textContent = offerTypeDictionary[types];
  } else {
    typePopup.remove();
  }

  if(author.avatar) {
    avatar.src = author.avatar;
  } else {
    avatar.remove();
  }

  return adPopup;
};

export { renderPopup };
