import { refrescoModels } from "../productModels/refrescoModels";
import { bolsaArrozModels } from "../productModels/bolsaArrozModels";
import { barraChocolateModels } from "../productModels/barraChocolateModels";
import { barraJabonModels } from "../productModels/barraJabonModels";
import { pitillosModels } from "../productModels/pitillosModels";
import {
  REFRESCOS,
  BOLSA_ARROZ,
  BARRA_CHOCOLATE,
  BARRA_JABON,
  PITILLOS,
} from "../constants/index";

export function getModels(productName, atributos) {
  console.log("productName");
  console.log(productName);
  console.log("atributos");
  console.log(atributos);

  const nameProducts = {
    [REFRESCOS]: refrescoModels(atributos),
    [BOLSA_ARROZ]: bolsaArrozModels(atributos),
    [BARRA_CHOCOLATE]: barraChocolateModels(atributos),
    [BARRA_JABON]: barraJabonModels(atributos),
    [PITILLOS]: pitillosModels(atributos),
  };
  console.log(nameProducts[productName]);
  return nameProducts[productName];
}
