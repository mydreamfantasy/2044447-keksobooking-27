import { makeMap } from './map.js';
const getData = () => {
  fetch('https://27.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((ads) => {
      makeMap(ads);
    });
};


const sendData = (onSuccess, onError, body) => {
  fetch(
    'https://27.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
        resetMap();
        evt.target.reset();
      } else {
        onError();
      }})
    .catch(() => {
      onError();
    });
};
export { getData, sendData };

