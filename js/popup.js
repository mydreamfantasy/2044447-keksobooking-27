import {createAds} from './data.js';

const similarListElement = document.querySelector('.map__canvas');
const similarAdsTemplate = document.querySelector('#card').content.querySelector('.popup');

const similarAds = createAds();


similarAds.forEach(({avatar, offer}) => {
  const adsElement = similarAdsTemplate.cloneNode(true);
  adsElement.querySelector('.popup__title').textContent = offer.title;
  adsElement.querySelector('.popup__text--address').textContent = offer.address;
  adsElement.querySelector('.popup__text--price').textContent = offer.price + ' ₽/ночь';
  adsElement.querySelector('.popup__text--capacity').textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей.';
  adsElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
  adsElement.querySelector('.popup__description').textContent = offer.description;

  const featureContainer = adsElement.querySelector('.popup__features');
  const featureList = featureContainer.querySelectorAll('.popup__feature');
  const featureAd = offer.features;

  featureList.forEach((featureListItem) => {
    const isNecessary = featureAd.some(
      (featureAd) => featureListItem.classList.contains('popup__feature--' + featureListItem),
    );

    if (!isNecessary) {
      featureListItem.remove();
    }
  });
  adsElement.querySelector('.popup__type').textContent = offer.types;
  // adsElement.querySelector('.popup__avatar').innerHTML =
  similarListElement.append(adsElement);
});

// В блок .popup__photos выведите все фотографии из списка offer.photos. Каждая из строк массива photos должна записываться как атрибут src соответствующего изображения.
// Замените значение атрибута src у аватарки пользователя .popup__avatar на значение поля author.avatar.
