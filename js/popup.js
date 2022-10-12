import {createAds} from './data.js';

const similarListElement = document.querySelector('.map__canvas');
const similarAdsTemplate = document.querySelector('#card').content.querySelector('.popup');

const similarAds = createAds();


similarAds.forEach(({author, offer}) => {
  const adsElement = similarAdsTemplate.cloneNode(true);

  if(offer.title === false) {
    adsElement.querySelector('.popup__title').remove();
  }
  adsElement.querySelector('.popup__title').textContent = offer.title;

  if(offer.address === false) {
    adsElement.querySelector('.popup__text--address').remove();
  }
  adsElement.querySelector('.popup__text--address').textContent = offer.address;

  if(offer.price === false) {
    adsElement.querySelector('.popup__text--price').remove();
  }
  adsElement.querySelector('.popup__text--price').textContent = `${offer.price } ₽/ночь`;

  if((offer.rooms === false) || (offer.guests === false)) {
    adsElement.querySelector('.popup__text--capacity').remove();
  }
  adsElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms } комнаты для ${ offer.guests } гостей.`;

  if((offer.checkin === false) || (offer.checkout === false)) {
    adsElement.querySelector('.popup__text--time').remove();
  }
  adsElement.querySelector('.popup__text--time').textContent = `Заезд после ${ offer.checkin }, выезд до ${ offer.checkout}`;

  if(offer.description === false) {
    adsElement.querySelector('.popup__description').remove();
  }
  adsElement.querySelector('.popup__description').textContent = offer.description;

  const featureContainer = adsElement.querySelector('.popup__features');
  const featureList = featureContainer.querySelectorAll('.popup__feature');
  const featureAd = offer.features;

  if(offer.features === false) {
    adsElement.querySelector('.popup__features').remove();
  }

  featureList.forEach((featureListItem) => {
    const isNecessary = featureAd.some(
      (feature) => featureListItem.classList.contains(`popup__feature--${ feature}`),
    );

    if (!isNecessary) {
      featureListItem.remove();
    }
  });

  if(offer.types === false) {
    adsElement.querySelector('.popup__type').remove();
  }

  const getType = (type) => {
    switch (type) {
      case 'palace':
        return 'Дворец';
      case 'flat':
        return 'Квартира';
      case 'house':
        return 'Дом';
      case 'bungalow':
        return 'Бунгало';
      case 'hotel':
        return 'Отель';
    }
  };
  adsElement.querySelector('.popup__type').textContent = getType(offer.types);

  if(offer.photos === false) {
    adsElement.querySelector('.popup__photos').remove();
  }
  const photoContainer = adsElement.querySelector('.popup__photos');
  const newPhoto = photoContainer.querySelector('.popup__photo');
  photoContainer.innerHTML = '';
  offer.photos.forEach((userPhoto) => {
    const photoListItem = newPhoto.cloneNode(true);
    photoListItem.src = userPhoto;

    photoContainer.append(photoListItem);
  });

  if(author.avatar === false) {
    adsElement.querySelector('.popup__avatar').remove();
  }
  adsElement.querySelector('.popup__avatar').src = author.avatar;
  similarListElement.append(adsElement);
});
