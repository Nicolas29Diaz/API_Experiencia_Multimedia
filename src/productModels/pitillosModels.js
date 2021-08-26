import { attPitillos, pitillosModelsSrc } from "../constants/index";
export const pitillosModels = (atributos) => {
  let lengthAttributes = atributos.length;
  let ishasAttribute = (selectedAtt) => atributos.includes(selectedAtt);

  let isBent = ishasAttribute(attPitillos.Doblados);
  let isDirty = ishasAttribute(attPitillos.Suciedades);
  let isVariationColor = ishasAttribute(attPitillos.VariacionColor);
  let isNothing = ishasAttribute(attPitillos.Ninguno);

  if (isNothing) {
    return pitillosModelsSrc.Pitillo;
  }

  if (lengthAttributes === 1) {
    if (isBent) {
      console.log("esta doblado");
      return pitillosModelsSrc.Pitillo_doblado;
    }
    if (isVariationColor) {
      console.log("tiene variacion de color");
      return pitillosModelsSrc.Pitillo_variacion_color;
    }
    if (isDirty) {
      console.log("esta sucio");
      return pitillosModelsSrc.Pitillo_con_suciedad;
    }
  }

  if (lengthAttributes === 2) {
    if (isBent && isDirty) {
      console.log("esta doblado y sucio");
      return pitillosModelsSrc.Pitillo_doblado_suciedad;
    }
    if (isBent && isVariationColor) {
      console.log("esta doblado y con variacion de color");
      return pitillosModelsSrc.Pitillo_doblado_variacion_color;
    }
    if (isDirty && isVariationColor) {
      console.log("esta sucio y con variacion de color");
      return pitillosModelsSrc.Pitillo_con_suciedad_variacion_color;
    }
  }

  if (lengthAttributes === 3) {
    if (isBent && isDirty && isVariationColor) {
      console.log("esta defectuoso");
      return pitillosModelsSrc.Pitillo_defectuoso;
    }
  }
};
