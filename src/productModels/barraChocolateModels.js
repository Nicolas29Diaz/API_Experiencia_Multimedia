import { attBarraChocolate, barraChocolateModelsSrc } from "../constants/index";
import { attributesMap } from "../helpers/index";
export const barraChocolateModels = (atributos) => {
  let url = "";
  let lengthAttributes = attributesMap(atributos).length;
  let ishasAttribute = (selectedAtt) =>
    attributesMap(atributos).includes(selectedAtt);

  let isSplitBar = ishasAttribute(attBarraChocolate.BarraPartida);
  let isTextIncomplete = ishasAttribute(attBarraChocolate.TextoIncompleto);
  let isVariationColor = ishasAttribute(attBarraChocolate.VariacionColor);
  let isSealIrregular = ishasAttribute(attBarraChocolate.SellosIrregulares);

  if (lengthAttributes === 1) {
    if (isSplitBar) {
      console.log("tiene barra partida");
      return (url = barraChocolateModelsSrc.Barra_chocolate_partida);
    }
    if (isTextIncomplete) {
      console.log("tiene textos incompletos");
      return (url = barraChocolateModelsSrc.Barra_chocolate_texto_incompleto);
    }
    if (isVariationColor) {
      console.log("tiene variacion de color");
      return (url = barraChocolateModelsSrc.Barra_chocolate_variacion_color);
    }
    if (isSealIrregular) {
      console.log("tiene sellos irregulares");
      return (url = barraChocolateModelsSrc.Barra_chocolate_sellos_irregulares);
    }
  }

  if (lengthAttributes === 2) {
    if (isSplitBar && isSealIrregular) {
      console.log("tiene barra partida y sellos irregulares");
      return (url =
        barraChocolateModelsSrc.Barra_chocolate_partida_sellos_irregulares);
    }
    if (isSplitBar && isTextIncomplete) {
      console.log("tiene barra partida y textos incompletos");
      return (url =
        barraChocolateModelsSrc.Barra_chocolate_partida_textos_incompletos);
    }
    if (isSplitBar && isVariationColor) {
      console.log("tiene barra partida y variacion de color");
      return (url =
        barraChocolateModelsSrc.Barra_chocolate_partida_variacion_color);
    }
    if (isTextIncomplete && isSealIrregular) {
      console.log("tiene textos incompletos y sellos irregulares");
      return (url =
        barraChocolateModelsSrc.Barra_chocolate_textos_incompletos_sellos_irregulares);
    }
    if (isVariationColor && isSealIrregular) {
      console.log("tiene variacion de color y sellos irregulares");
      return (url =
        barraChocolateModelsSrc.Barra_chocolate_variacion_color_sellos_irregulares);
    }
    if (isVariationColor && isTextIncomplete) {
      console.log("tiene variacion de color y textos incompletos");
      return (url =
        barraChocolateModelsSrc.Barra_chocolate_variacion_color_textos_incompletos);
    }
  }

  if (lengthAttributes === 3) {
    if (isSplitBar && isTextIncomplete && isSealIrregular) {
      console.log(
        "tiene barra partida, textos incompletos y sellos irregulares"
      );
      return (url =
        barraChocolateModelsSrc.Barra_chocolate_partida_textos_incompletos_sellos_irregulares);
    }
    if (isSplitBar && isVariationColor && isTextIncomplete) {
      console.log(
        "tiene barra partida, variacion de color y textos incompletos"
      );
      return (url =
        barraChocolateModelsSrc.Barra_chocolate_partida_variacion_color_textos_incompletos);
    }
    if (isSplitBar && isVariationColor && isSealIrregular) {
      console.log(
        "tiene barra partida, variacion de color y sellos irregulares"
      );
      return (url =
        barraChocolateModelsSrc.Barra_chocolate_partida_variacion_color_sellos_irregulares);
    }
    if (isVariationColor && isTextIncomplete && isSealIrregular) {
      console.log(
        "tiene variacion de color, textos incompletos y sellos irregulares"
      );
      return (url =
        barraChocolateModelsSrc.Barra_chocolate_variacion_color_textos_incompletos_sellos_irregulares);
    }
  }

  if (lengthAttributes === 4) {
    if (isSplitBar && isTextIncomplete && isSealIrregular && isVariationColor) {
      console.log("esta defectuosa");
      return (url = barraChocolateModelsSrc.Barra_chocolate_defectuosa);
    }
  }
};
