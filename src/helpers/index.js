export function getRandomMinMax(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const attributesMap = (atributos) =>
  atributos.map((att) => att.atributo);
