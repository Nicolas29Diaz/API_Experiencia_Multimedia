import { attBarraChocolate, barraChocolateModelsSrc } from "../constants/index";
export const barraChocolateModels = (atributos) => {
  let lengthAttributes = atributos.length;

  let ishasAttribute = (selectedAtt) => atributos.includes(selectedAtt);

  let isSplitBar = ishasAttribute(attBarraChocolate.BarraPartida);
  let isTextIncomplete = ishasAttribute(attBarraChocolate.TextoIncompleto);
  let isVariationColor = ishasAttribute(attBarraChocolate.VariacionColor);
  let isSealIrregular = ishasAttribute(attBarraChocolate.SellosIrregulares);
  let isNothing = ishasAttribute(attBarraChocolate.Ninguno);

  if (isNothing) {
    return barraChocolateModelsSrc.Barra_chocolate;
  }

  if (lengthAttributes === 1) {
    if (isSplitBar) {
      return barraChocolateModelsSrc.Barra_chocolate_partida;
    }
    if (isTextIncomplete) {
      return barraChocolateModelsSrc.Barra_chocolate_texto_incompleto;
    }
    if (isVariationColor) {
      return barraChocolateModelsSrc.Barra_chocolate_variacion_color;
    }
    if (isSealIrregular) {
      return barraChocolateModelsSrc.Barra_chocolate_sellos_irregulares;
    }
  }

  if (lengthAttributes === 2) {
    if (isSplitBar && isSealIrregular) {
      return barraChocolateModelsSrc.Barra_chocolate_partida_sellos_irregulares;
    }
    if (isSplitBar && isTextIncomplete) {
      return barraChocolateModelsSrc.Barra_chocolate_partida_textos_incompletos;
    }
    if (isSplitBar && isVariationColor) {
      return barraChocolateModelsSrc.Barra_chocolate_partida_variacion_color;
    }
    if (isTextIncomplete && isSealIrregular) {
      return barraChocolateModelsSrc.Barra_chocolate_textos_incompletos_sellos_irregulares;
    }
    if (isVariationColor && isSealIrregular) {
      return barraChocolateModelsSrc.Barra_chocolate_variacion_color_sellos_irregulares;
    }
    if (isVariationColor && isTextIncomplete) {
      return barraChocolateModelsSrc.Barra_chocolate_variacion_color_textos_incompletos;
    }
  }

  if (lengthAttributes === 3) {
    if (isSplitBar && isTextIncomplete && isSealIrregular) {
      return barraChocolateModelsSrc.Barra_chocolate_partida_textos_incompletos_sellos_irregulares;
    }
    if (isSplitBar && isVariationColor && isTextIncomplete) {
      return barraChocolateModelsSrc.Barra_chocolate_partida_variacion_color_textos_incompletos;
    }
    if (isSplitBar && isVariationColor && isSealIrregular) {
      return barraChocolateModelsSrc.Barra_chocolate_partida_variacion_color_sellos_irregulares;
    }
    if (isVariationColor && isTextIncomplete && isSealIrregular) {
      return barraChocolateModelsSrc.Barra_chocolate_variacion_color_textos_incompletos_sellos_irregulares;
    }
  }

  if (lengthAttributes === 4) {
    if (isSplitBar && isTextIncomplete && isSealIrregular && isVariationColor) {
      return barraChocolateModelsSrc.Barra_chocolate_defectuosa;
    }
  }
};
