import bcrypsjs from "bcryptjs";

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

export async function hashedPassword(password) {
  const salt = await bcrypsjs.genSalt(10);
  return await bcrypsjs.hash(password, salt);
}

export async function comparePassword(passwordRecieved, passwordDB) {
  return await bcrypsjs.compareSync(passwordRecieved, passwordDB);
}

export function extractNameProductFromArray(newArray) {
  // Se obtiene el nombre del producto del primer elemento
  let [actualProduct] = newArray.map((a) => a.nombreProducto);

  // se elemina la propiedad nombreProducto del newArray
  newArray.map((a) => delete a.nombreProducto);
  return {
    actualProduct,
    newArray,
  };
}

export function formatDate(date) {
  const actualDate = new Date(date);
  const formattedDate = new Intl.DateTimeFormat("en-US").format(actualDate);
  return formattedDate;
}

export function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
