// функция возврата целого числа, взято из MDN

const getRandomInteger = (min, max) => {
  if (min >= 0 && max >= 0 && min < max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return NaN;
};

getRandomInteger(33, 45);

// функция возврата положительного числа с плавающей точкой
const getRandomFloat = (min, max, round) => {
  if (min < 0 || max < 0 || max < min) {

    return NaN;
  }
  const floatNumber = ((Math.random() * (max - min + 1)) + min).toFixed(round);

  return Number(floatNumber);
};

getRandomFloat(555, 669.8, 2);
