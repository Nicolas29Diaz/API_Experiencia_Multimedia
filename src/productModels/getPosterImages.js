import {
  barraChocolateModelsSrc,
  refrescosModelsSrc,
  bolsaArrozModelsSrc,
  barraJabonModelsSrc,
  pitillosModelsSrc,
  REFRESCOS,
  BOLSA_ARROZ,
  BARRA_CHOCOLATE,
  BARRA_JABON,
  PITILLOS,
} from "../constants/index";

export function getPosterImages(poster) {
  const nameProducts = {
    [REFRESCOS]: refrescosModelsSrc.poster_refresco,
    [BOLSA_ARROZ]: bolsaArrozModelsSrc.poster_arroz,
    [BARRA_CHOCOLATE]: barraChocolateModelsSrc.poster_chocolate,
    [BARRA_JABON]: barraJabonModelsSrc.poster_jabon,
    [PITILLOS]: pitillosModelsSrc.poster_pitillo,
  };

  return nameProducts[poster];
}
