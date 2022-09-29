//Функция возврата целого числа, взято из MDN

function getWholeNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getWholeNumber(78, 99);

// функция возврата положительного числа с плаваующей точкой
let fractionalNumber;

function getNumber(min, max, round) {
  if(min >= 0 && max >= 0) {
    if(min > max) {
      fractionalNumber = ((Math.random() * (min - max + 1)) + max).toFixed(round);
      return Number(fractionalNumber);
    }
    fractionalNumber = ((Math.random() * (max - min + 1)) + min).toFixed(round);
    return Number(fractionalNumber);
  }
  return NaN;
}

(getNumber(5555, 669.8, 6));
