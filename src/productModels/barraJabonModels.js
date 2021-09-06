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
      console.log("tiene empaque roto");
      return barraJabonModelsSrc.Barra_jabon_empaque_roto;
    }
    if (isIllegibleTexts) {
      console.log("tiene textos ilegibles");
      return barraJabonModelsSrc.Barra_jabon_texto_ilegible;
    }
    if (isBarVariationColor) {
      console.log("tiene variacion de color en la barra");
      return barraJabonModelsSrc.Barra_jabon_variacion_color;
    }
    if (isBoxVariationColor) {
      console.log("tiene variacion de color en el empaque");
      return barraJabonModelsSrc.Barra_jabon_empaque_variacion_color;
    }
    if (isDeformed) {
      console.log("esta deforme");
      return barraJabonModelsSrc.Barra_jabon_barra_deforme;
    }
  }

  if (lengthAttributes === 2) {
    if (isDeformed && isRippedBox) {
      console.log("esta deforme y tiene empaque roto");
      return barraJabonModelsSrc.Barra_jabon_barra_deforme_empaque_roto;
    }
    if (isDeformed && isBoxVariationColor) {
      console.log("esta deforme y tiene empaque con variacion de color");
      return barraJabonModelsSrc.Barra_jabon_barra_deforme_empaque_variacion_color;
    }
    if (isDeformed && isIllegibleTexts) {
      console.log("esta deforme y tiene textos ilegibles");
      return barraJabonModelsSrc.Barra_jabon_barra_deforme_texto_ilegible;
    }
    if (isRippedBox && isIllegibleTexts) {
      console.log("tiene empaque roto y textos ilegibles");
      return barraJabonModelsSrc.Barra_jabon_empaque_roto_texto_ilegible;
    }
    if (isRippedBox && isBoxVariationColor) {
      console.log("tiene empaque roto y variacion de color en el empaque");
      return barraJabonModelsSrc.Barra_jabon_empaque_variacion_color_empaque_roto;
    }
    if (isIllegibleTexts && isBoxVariationColor) {
      console.log("tiene textos ilegibles y variacion de color en el empaque");
      return barraJabonModelsSrc.Barra_jabon_empaque_variacion_color_texto_ilegible;
    }
    if (isDeformed && isBarVariationColor) {
      console.log("esta deforme y tiene variacion de color en la barra");
      return barraJabonModelsSrc.Barra_jabon_variacion_color_deforme;
    }
    if (isRippedBox && isBarVariationColor) {
      console.log("tiene empaque roto y variacion de color en la barra");
      return barraJabonModelsSrc.Barra_jabon_variacion_color_empaque_roto;
    }
    if (isIllegibleTexts && isBarVariationColor) {
      console.log("tiene textos ilegibles y variacion de color en la barra");
      return barraJabonModelsSrc.Barra_jabon_variacion_color_texto_ilegible;
    }
    if (isBarVariationColor && isBoxVariationColor) {
      console.log("tiene variacion de color en la barra y en el empaque");
      return barraJabonModelsSrc.Barra_jabon_variacion_color_empaque_variacion_color;
    }
  }

  if (lengthAttributes === 3) {
    if (isDeformed && isRippedBox && isIllegibleTexts) {
      console.log("esta deforme, tiene empaque roto y textos ilegibles");
      return barraJabonModelsSrc.Barra_jabon_deforme_empaque_roto_texto_ilegible;
    }
    if (isDeformed && isBoxVariationColor && isRippedBox) {
      console.log(
        "esta deforme, tiene empaque con variacion de color y empaque roto"
      );
      return barraJabonModelsSrc.Barra_jabon_deforme_empaque_variacion_color_empaque_roto;
    }
    if (isDeformed && isBoxVariationColor && isIllegibleTexts) {
      console.log(
        "esta deforme, tiene variacion de color en el empaque y textos ilegibles"
      );
      return barraJabonModelsSrc.Barra_jabon_deforme_empaque_variacion_color_texto_ilegible;
    }
    if (isBoxVariationColor && isRippedBox && isIllegibleTexts) {
      console.log(
        "tiene empaque con variacion de color, empaque roto y textos ilegibles"
      );
      return barraJabonModelsSrc.Barra_jabon_empaque_variacion_color_empaque_roto_texto_ilegible;
    }
    if (isDeformed && isBarVariationColor && isRippedBox) {
      console.log(
        "esta deforme, tiene variacion de color en la barra y empaque roto"
      );
      return barraJabonModelsSrc.Barra_jabon_variacion_color_deforme_empaque_roto;
    }
    if (isBarVariationColor && isBoxVariationColor && isDeformed) {
      console.log("tiene variacion de color en ambos y es deforme");
      return barraJabonModelsSrc.Barra_jabon_variacion_color_deforme_empaque_variacion_color;
    }
    if (isBarVariationColor && isBoxVariationColor && isIllegibleTexts) {
      console.log("tiene variacion de color en ambos y es deforme");
      return barraJabonModelsSrc.Barra_jabon_variacion_color_empaque_variacion_color_texto_ilegible;
    }
    if (isBarVariationColor && isBoxVariationColor && isRippedBox) {
      console.log("tiene variacion de color en ambos y el empaque roto");
      return barraJabonModelsSrc.Barra_jabon_variacion_color_empaque_variacion_color_empaque_roto;
    }
    if (isIllegibleTexts && isBarVariationColor && isDeformed) {
      console.log(
        "tiene textos ilegibles, variacion de color en la barra y esta deforme"
      );
      return barraJabonModelsSrc.Barra_jabon_variacion_color_deforme_texto_ilegible;
    }
    if (isIllegibleTexts && isBarVariationColor && isRippedBox) {
      console.log(
        "tiene textos ilegibles, variacion de color en la barra y empaque roto"
      );
      return barraJabonModelsSrc.Barra_jabon_variacion_color_empaque_roto_texto_ilegible;
    }
  }

  if (lengthAttributes === 4) {
    if (isDeformed && isRippedBox && isIllegibleTexts && isBoxVariationColor) {
      console.log(
        "esta deforme, tiene empaque roto, textos ilegibles y variacion de color en el empaque"
      );
      return barraJabonModelsSrc.Barra_jabon_deforme_empaque_variacion_color_empaque_roto_texto_ilegible;
    }
    if (isDeformed && isRippedBox && isIllegibleTexts && isBarVariationColor) {
      console.log(
        "esta deforme, tiene empaque roto, textos ilegibles y variacion de color en la barra"
      );
      return barraJabonModelsSrc.Barra_jabon_variacion_color_deforme_empaque_roto_texto_ilegible;
    }
    if (
      isDeformed &&
      isRippedBox &&
      isBoxVariationColor &&
      isBarVariationColor
    ) {
      console.log(
        "esta deforme, tiene empaque roto, variacion de color en el empaque y variacion de color en la barra"
      );
      return barraJabonModelsSrc.Barra_jabon_variacion_color_deforme_empaque_variacion_color_empaque_roto;
    }
    if (
      isDeformed &&
      isBoxVariationColor &&
      isIllegibleTexts &&
      isBarVariationColor
    ) {
      console.log(
        "esta deforme, tiene variacion de color en el empaque, textos ilegibles y variacion de color en la barra"
      );
      return barraJabonModelsSrc.Barra_jabon_variacion_color_deforme_empaque_variacion_color_texto_ilegible;
    }
    if (
      isBoxVariationColor &&
      isRippedBox &&
      isIllegibleTexts &&
      isBarVariationColor
    ) {
      console.log(
        "tiene variacion de color en el empaque, empaque roto, textos ilegibles y variacion de color en la barra"
      );
      return barraJabonModelsSrc.Barra_jabon_variacion_color_empaque_variacion_color_empaque_roto_texto_ilegible;
    }
  }
};
