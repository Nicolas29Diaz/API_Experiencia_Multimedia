export function getRandomMinMax(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getRandomAttributes(randomNumber, attArray) {
  let listAttributes = [];
  for (let i = 0; i < randomNumber; i++) {
    let attributeItem = attArray[Math.floor(Math.random() * attArray.length)];
    listAttributes.includes(attributeItem)
      ? randomNumber + 1
      : listAttributes.push(attributeItem);
  }

  return listAttributes;
}
