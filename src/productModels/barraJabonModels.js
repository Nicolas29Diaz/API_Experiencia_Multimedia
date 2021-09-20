import { attBarraJabon, barraJabonModelsSrc } from "../constants/index";

export const barraJabonModels = (atributos) => {
  let lengthAttributes = atributos.length;

  let ishasAttribute = (selectedAtt) => atributos.includes(selectedAtt);

  let isBarVariationColor = ishasAttribute(attBarraJabon.VariacionColorBarra);
  let isBoxVariationColor = ishasAttribute(attBarraJabon.VariacionColorEmpaque);
  let isRippedBox = ishasAttribute(attBarraJabon.EmpaqueRoto);
  let isIllegibleTexts = ishasAttribute(attBarraJabon.TextosIlegibles);
  let isDeformed = ishasAttribute(attBarraJabon.Deforme);
  let isNothing = ishasAttribute(attBarraJabon.Ninguno);

  if (isNothing) {
    return barraJabonModelsSrc.Barra_jabon_buena;
  }

  if (lengthAttributes === 1) {
    if (isRippedBox) {
      return barraJabonModelsSrc.Barra_jabon_empaque_roto;
    }
    if (isIllegibleTexts) {
      return barraJabonModelsSrc.Barra_jabon_texto_ilegible;
    }
    if (isBarVariationColor) {
      return barraJabonModelsSrc.Barra_jabon_variacion_color;
    }
    if (isBoxVariationColor) {
      return barraJabonModelsSrc.Barra_jabon_empaque_variacion_color;
    }
    if (isDeformed) {
      return barraJabonModelsSrc.Barra_jabon_barra_deforme;
    }
  }

  if (lengthAttributes === 2) {
    if (isDeformed && isRippedBox) {
      return barraJabonModelsSrc.Barra_jabon_barra_deforme_empaque_roto;
    }
    if (isDeformed && isBoxVariationColor) {
      return barraJabonModelsSrc.Barra_jabon_barra_deforme_empaque_variacion_color;
    }
    if (isDeformed && isIllegibleTexts) {
      return barraJabonModelsSrc.Barra_jabon_barra_deforme_texto_ilegible;
    }
    if (isRippedBox && isIllegibleTexts) {
      return barraJabonModelsSrc.Barra_jabon_empaque_roto_texto_ilegible;
    }
    if (isRippedBox && isBoxVariationColor) {
      return barraJabonModelsSrc.Barra_jabon_empaque_variacion_color_empaque_roto;
    }
    if (isIllegibleTexts && isBoxVariationColor) {
      return barraJabonModelsSrc.Barra_jabon_empaque_variacion_color_texto_ilegible;
    }
    if (isDeformed && isBarVariationColor) {
      return barraJabonModelsSrc.Barra_jabon_variacion_color_deforme;
    }
    if (isRippedBox && isBarVariationColor) {
      return barraJabonModelsSrc.Barra_jabon_variacion_color_empaque_roto;
    }
    if (isIllegibleTexts && isBarVariationColor) {
      return barraJabonModelsSrc.Barra_jabon_variacion_color_texto_ilegible;
    }
    if (isBarVariationColor && isBoxVariationColor) {
      return barraJabonModelsSrc.Barra_jabon_variacion_color_empaque_variacion_color;
    }
  }

  if (lengthAttributes === 3) {
    if (isDeformed && isRippedBox && isIllegibleTexts) {
      return barraJabonModelsSrc.Barra_jabon_deforme_empaque_roto_texto_ilegible;
    }
    if (isDeformed && isBoxVariationColor && isRippedBox) {
      return barraJabonModelsSrc.Barra_jabon_deforme_empaque_variacion_color_empaque_roto;
    }
    if (isDeformed && isBoxVariationColor && isIllegibleTexts) {
      return barraJabonModelsSrc.Barra_jabon_deforme_empaque_variacion_color_texto_ilegible;
    }
    if (isBoxVariationColor && isRippedBox && isIllegibleTexts) {
      return barraJabonModelsSrc.Barra_jabon_empaque_variacion_color_empaque_roto_texto_ilegible;
    }
    if (isDeformed && isBarVariationColor && isRippedBox) {
      return barraJabonModelsSrc.Barra_jabon_variacion_color_deforme_empaque_roto;
    }
    if (isBarVariationColor && isBoxVariationColor && isDeformed) {
      return barraJabonModelsSrc.Barra_jabon_variacion_color_deforme_empaque_variacion_color;
    }
    if (isBarVariationColor && isBoxVariationColor && isIllegibleTexts) {
      return barraJabonModelsSrc.Barra_jabon_variacion_color_empaque_variacion_color_texto_ilegible;
    }
    if (isBarVariationColor && isBoxVariationColor && isRippedBox) {
      return barraJabonModelsSrc.Barra_jabon_variacion_color_empaque_variacion_color_empaque_roto;
    }
    if (isIllegibleTexts && isBarVariationColor && isDeformed) {
      return barraJabonModelsSrc.Barra_jabon_variacion_color_deforme_texto_ilegible;
    }
    if (isIllegibleTexts && isBarVariationColor && isRippedBox) {
      return barraJabonModelsSrc.Barra_jabon_variacion_color_empaque_roto_texto_ilegible;
    }
  }

  if (lengthAttributes === 4) {
    if (isDeformed && isRippedBox && isIllegibleTexts && isBoxVariationColor) {
      return barraJabonModelsSrc.Barra_jabon_deforme_empaque_variacion_color_empaque_roto_texto_ilegible;
    }
    if (isDeformed && isRippedBox && isIllegibleTexts && isBarVariationColor) {
      return barraJabonModelsSrc.Barra_jabon_variacion_color_deforme_empaque_roto_texto_ilegible;
    }
    if (
      isDeformed &&
      isRippedBox &&
      isBoxVariationColor &&
      isBarVariationColor
    ) {
      return barraJabonModelsSrc.Barra_jabon_variacion_color_deforme_empaque_variacion_color_empaque_roto;
    }
    if (
      isDeformed &&
      isBoxVariationColor &&
      isIllegibleTexts &&
      isBarVariationColor
    ) {
      return barraJabonModelsSrc.Barra_jabon_variacion_color_deforme_empaque_variacion_color_texto_ilegible;
    }
    if (
      isBoxVariationColor &&
      isRippedBox &&
      isIllegibleTexts &&
      isBarVariationColor
    ) {
      return barraJabonModelsSrc.Barra_jabon_variacion_color_empaque_variacion_color_empaque_roto_texto_ilegible;
    }
  }
};
