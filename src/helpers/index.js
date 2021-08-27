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
