import {
  attPitillos,
  attBolsaArroz,
  attBarraJabon,
  attBarraChocolate,
  attRefrescos,
  barraJabonModelsSrc,
  barraChocolateModelsSrc,
  bolsaArrozModelsSrc,
  pitillosModelsSrc,
  refrescosModelsSrc,
} from "../constants/index";
import { attributesMap } from "../helpers/index";

// // Elige el atributo para cada modelo
export const refrescoModels = (atributos) => {
  let url = "";
  let lengthAttributes = attributesMap(atributos).length;

  let ishasAttribute = (selectedAtt) =>
    attributesMap(atributos).includes(selectedAtt);

  let isText = ishasAttribute(attRefrescos.TextosIlegibles);
  let isTag = ishasAttribute(attRefrescos.EtiquetaSuelta);
  let isDirtyBottle = ishasAttribute(attRefrescos.EnvaseSucio);
  let isLooseCap = ishasAttribute(attRefrescos.TapaFloja);

  if (lengthAttributes === 1) {
    if (isText) {
      console.log("tiene texto ilegible");
      return (url = refrescosModelsSrc.Refresco_texto_ilegible);
    }

    if (isTag) {
      console.log("tiene etiqueta suelta");
      return (url = refrescosModelsSrc.Refresco_etiqueta_suelta);
    }
    if (isDirtyBottle) {
      console.log("tiene texto envase sucio");
      return (url = refrescosModelsSrc.Refresco_envase_sucio);
    }

    if (isLooseCap) {
      console.log("tiene tapafloja");
      return (url = refrescosModelsSrc.Refresco_tapa_floja);
    }
  }

  if (lengthAttributes === 2) {
    if (isTag && isDirtyBottle) {
      console.log("tiene etiqueta suelta y envase sucio");
      return (url = refrescosModelsSrc.Refresco_etiqueta_suelta_envase_sucio);
    }
    if (isDirtyBottle && isLooseCap) {
      console.log("tiene envase sucio y tapa floja");
      return (url = refrescosModelsSrc.Refresco_tapa_floja_envase_sucio);
    }
    if (isDirtyBottle && isText) {
      console.log("tiene envase sucio y texto ilegible");
      return (url = refrescosModelsSrc.Refresco_envase_sucio_texto_ilegible);
    }
    if (isTag && isLooseCap) {
      console.log("tiene etiqueta suelta y tapa floja");
      return (url = refrescosModelsSrc.Refresco_etiqueta_suelta_tapa_floja);
    }
    if (isTag && isText) {
      console.log("tiene etiqueta suelta y texto ilegible");
      return (url = refrescosModelsSrc.Refresco_etiqueta_suelta_texto_ilegible);
    }
    if (isText && isLooseCap) {
      console.log("tiene texto ilegible y tapa floja");
      return (url = refrescosModelsSrc.Refresco_tapa_floja_texto_ilegible);
    }
  }

  if (lengthAttributes === 3) {
    if (isTag && isDirtyBottle && isLooseCap) {
      console.log("tiene etiqueta suelta, envase sucio y tapa floja");
      return (url =
        refrescosModelsSrc.Refresco_etiqueta_suelta_envase_sucio_tapa_floja);
    }
    if (isDirtyBottle && isText && isLooseCap) {
      console.log("tiene envase sucio, texto ilegible y tapa floja");
      return (url =
        refrescosModelsSrc.Refresco_etiqueta_suelta_envase_sucio_texto_ilegible);
    }
    if (isTag && isDirtyBottle && isText) {
      console.log("tiene etiqueta suelta, envase sucio y texto ilegible");
      return (url =
        refrescosModelsSrc.Refresco_etiqueta_suelta_envase_sucio_texto_ilegible);
    }
    if (isTag && isText && isLooseCap) {
      console.log("tiene etiqueta suelta, texto ilegible y tapa floja");
      return (url =
        refrescosModelsSrc.Refresco_etiqueta_suelta_texto_ilegible_tapa_floja);
    }
  }

  if (lengthAttributes === 4) {
    if (isTag && isDirtyBottle && isLooseCap && isText) {
      console.log("Esta defectuoso");
      return (url = refrescosModelsSrc.Refresco_defectuoso);
    }
  }
};

export const bolsaArrozModels = (atributos) => {
  let url = "";
  let lengthAttributes = attributesMap(atributos).length;
  let ishasAttribute = (selectedAtt) =>
    attributesMap(atributos).includes(selectedAtt);

  let isColorVariation = ishasAttribute(attBolsaArroz.VariacionColor);
  let isRippedBag = ishasAttribute(attBolsaArroz.BolsaRota);
  let isTextIncomplete = ishasAttribute(attBolsaArroz.TextoIncompleto);
  let isDirty = ishasAttribute(attBolsaArroz.Suciedades);

  if (lengthAttributes === 1) {
    if (isRippedBag) {
      console.log("tiene empaque roto");
      return (url = bolsaArrozModelsSrc.Bolsa_arroz_bolsa_rota);
    }
    if (isTextIncomplete) {
      console.log("tiene textos incompletos");
      return (url = bolsaArrozModelsSrc.Bolsa_arroz_textos_incompletos);
    }
    if (isColorVariation) {
      console.log("tiene variacion de color");
      return (url = bolsaArrozModelsSrc.Bolsa_arroz_variacion_color);
    }
    if (isDirty) {
      console.log("tiene suciedades");
      return (url = bolsaArrozModelsSrc.Bolsa_arroz_con_suciedad);
    }
  }

  if (lengthAttributes === 2) {
    if (isRippedBag && isDirty) {
      console.log("tiene empaque roto y suciedades");
      return (url = bolsaArrozModelsSrc.Bolsa_arroz_bolsa_rota_suciedad);
    }
    if (isRippedBag && isTextIncomplete) {
      console.log("tiene empaque roto y textos incompletos");
      return (url =
        bolsaArrozModelsSrc.Bolsa_arroz_bolsa_rota_textos_incompletos);
    }
    if (isRippedBag && isColorVariation) {
      console.log("tiene empaque roto y variacion de color");
      return (url = bolsaArrozModelsSrc.Bolsa_arroz_bolsa_rota_variacion_color);
    }
    if (isTextIncomplete && isDirty) {
      console.log("tiene texto incompleto y suciedades");
      return (url =
        bolsaArrozModelsSrc.Bolsa_arroz_textos_incompletos_suciedad);
    }
    if (isColorVariation && isDirty) {
      console.log("tiene variacion de color y suciedades");
      return (url = bolsaArrozModelsSrc.Bolsa_arroz_variacion_color_suciedad);
    }
    if (isColorVariation && isTextIncomplete) {
      console.log("tiene variacion de color y texto incompleto");
      return (url =
        bolsaArrozModelsSrc.Bolsa_arroz_variacion_color_textos_incompletos);
    }
  }

  if (lengthAttributes === 3) {
    if (isRippedBag && isTextIncomplete && isDirty) {
      console.log("tiene empaque roto, textos incompletos y suciedades");
      return (url =
        bolsaArrozModelsSrc.Bolsa_arroz_bolsa_rota_textos_incompletos_suciedad);
    }
    if (isRippedBag && isColorVariation && isDirty) {
      console.log("tiene empaque roto, variacion de color y suciedades");
      return (url =
        bolsaArrozModelsSrc.Bolsa_arroz_bolsa_rota_variacion_color_suciedad);
    }
    if (isRippedBag && isColorVariation && isTextIncomplete) {
      console.log("tiene empaque roto, variacion de color y texto incompleto");
      return (url =
        bolsaArrozModelsSrc.Bolsa_arroz_bolsa_rota_variacion_color_textos_incompletos);
    }
    if (isColorVariation && isTextIncomplete && isDirty) {
      console.log("tiene variacion de color, texto incompleto y suciedades");
      return (url =
        bolsaArrozModelsSrc.Bolsa_arroz_variacion_color_textos_incompletos_suciedad);
    }
  }

  if (lengthAttributes === 4) {
    if (isRippedBag && isTextIncomplete && isDirty && isColorVariation) {
      console.log("Esta defectuoso");
      return (url = bolsaArrozModelsSrc.Bolsa_arroz_defectuosa);
    }
  }
};

export const pitillosModels = (atributos) => {
  let url = "";
  let lengthAttributes = attributesMap(atributos).length;
  let ishasAttribute = (selectedAtt) =>
    attributesMap(atributos).includes(selectedAtt);

  let isBent = ishasAttribute(attPitillos.Doblados);
  let isDirty = ishasAttribute(attPitillos.Suciedades);
  let isVariationColor = ishasAttribute(attPitillos.VariacionColor);

  if (lengthAttributes === 1) {
    if (isBent) {
      console.log("esta doblado");
      return (url = pitillosModelsSrc.Pitillo_doblado);
    }
    if (isVariationColor) {
      console.log("tiene variacion de color");
      return (url = pitillosModelsSrc.Pitillo_variacion_color);
    }
    if (isDirty) {
      console.log("esta sucio");
      return (url = pitillosModelsSrc.Pitillo_con_suciedad);
    }
  }

  if (lengthAttributes === 2) {
    if (isBent && isDirty) {
      console.log("esta doblado y sucio");
      return (url = pitillosModelsSrc.Pitillo_doblado_suciedad);
    }
    if (isBent && isVariationColor) {
      console.log("esta doblado y con variacion de color");
      return (url = pitillosModelsSrc.Pitillo_doblado_variacion_color);
    }
    if (isDirty && isVariationColor) {
      console.log("esta sucio y con variacion de color");
      return (url = pitillosModelsSrc.Pitillo_con_suciedad_variacion_color);
    }
  }

  if (lengthAttributes === 3) {
    if (isBent && isDirty && isVariationColor) {
      console.log("esta defectuoso");
      return (url = pitillosModelsSrc.Pitillo_defectuoso);
    }
  }
};

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

export const barraJabonModels = (atributos) => {
  let url = "";
  let lengthAttributes = attributesMap(atributos).length;
  let ishasAttribute = (selectedAtt) =>
    attributesMap(atributos).includes(selectedAtt);

  let isBarVariationColor = ishasAttribute(attBarraJabon.VariacionColorBarra);
  let isBoxVariationColor = ishasAttribute(attBarraJabon.VariacionColorEmpaque);
  let isBothVariationColor = ishasAttribute(attBarraJabon.VariacionColor);
  let isRippedBox = ishasAttribute(attBarraJabon.EmpaqueRoto);
  let isIllegibleTexts = ishasAttribute(attBarraJabon.TextosIlegibles);
  let isDeformed = ishasAttribute(attBarraJabon.Deforme);

  if (lengthAttributes === 1) {
    if (isRippedBox) {
      console.log("tiene empaque roto");
      return (url = barraJabonModelsSrc.Barra_jabon_empaque_roto);
    }
    if (isIllegibleTexts) {
      console.log("tiene textos ilegibles");
      return (url = barraJabonModelsSrc.Barra_jabon_texto_ilegible);
    }
    if (isBarVariationColor) {
      console.log("tiene variacion de color en la barra");
      return (url = barraJabonModelsSrc.Barra_jabon_variacion_color);
    }
    if (isBoxVariationColor) {
      console.log("tiene variacion de color en el empaque");
      return (url = barraJabonModelsSrc.Barra_jabon_empaque_variacion_color);
    }
    if (isBothVariationColor) {
      console.log("tiene variacion de color en la barra y el empaque");
      return (url =
        barraJabonModelsSrc.Barra_jabon_variacion_color_empaque_variacion_color);
    }
    if (isDeformed) {
      console.log("esta deforme");
      return (url = barraJabonModelsSrc.Barra_jabon_barra_deforme);
    }
  }

  if (lengthAttributes === 2) {
    if (isDeformed && isRippedBox) {
      console.log("esta deforme y tiene empaque roto");
      return (url = barraJabonModelsSrc.Barra_jabon_barra_deforme_empaque_roto);
    }
    if (isDeformed && isBoxVariationColor) {
      console.log("esta deforme y tiene empaque con variacion de color");
      return (url =
        barraJabonModelsSrc.Barra_jabon_barra_deforme_empaque_variacion_color);
    }
    if (isDeformed && isIllegibleTexts) {
      console.log("esta deforme y tiene textos ilegibles");
      return (url =
        barraJabonModelsSrc.Barra_jabon_barra_deforme_texto_ilegible);
    }
    if (isRippedBox && isIllegibleTexts) {
      console.log("tiene empaque roto y textos ilegibles");
      return (url =
        barraJabonModelsSrc.Barra_jabon_empaque_roto_texto_ilegible);
    }
    if (isRippedBox && isBoxVariationColor) {
      console.log("tiene empaque roto y variacion de color en el empaque");
      return (url =
        barraJabonModelsSrc.Barra_jabon_empaque_variacion_color_empaque_roto);
    }
    if (isIllegibleTexts && isBoxVariationColor) {
      console.log("tiene textos ilegibles y variacion de color en el empaque");
      return (url =
        barraJabonModelsSrc.Barra_jabon_empaque_variacion_color_texto_ilegible);
    }
    if (isDeformed && isBarVariationColor) {
      console.log("esta deforme y tiene variacion de color en la barra");
      return (url = barraJabonModelsSrc.Barra_jabon_variacion_color_deforme);
    }
    if (isDeformed && isBothVariationColor) {
      console.log("esta deforme y tiene variacion de color");
      return (url =
        barraJabonModelsSrc.Barra_jabon_variacion_color_deforme_empaque_variacion_color);
    }
    if (isRippedBox && isBarVariationColor) {
      console.log("tiene empaque roto y variacion de color en la barra");
      return (url =
        barraJabonModelsSrc.Barra_jabon_variacion_color_empaque_roto);
    }
    if (isRippedBox && isBothVariationColor) {
      console.log("tiene empaque roto y variacion de color");
      return (url =
        barraJabonModelsSrc.Barra_jabon_variacion_color_empaque_variacion_color_empaque_roto);
    }
    if (isIllegibleTexts && isBothVariationColor) {
      console.log("tiene textos ilegibles y variacion de color");
      return (url =
        barraJabonModelsSrc.Barra_jabon_variacion_color_empaque_variacion_color_texto_ilegible);
    }
    if (isIllegibleTexts && isBarVariationColor) {
      console.log("tiene textos ilegibles y variacion de color en la barra");
      return (url =
        barraJabonModelsSrc.Barra_jabon_variacion_color_texto_ilegible);
    }
  }

  if (lengthAttributes === 3) {
    if (isDeformed && isRippedBox && isIllegibleTexts) {
      console.log("esta deforme, tiene empaque roto y textos ilegibles");
      return (url =
        barraJabonModelsSrc.Barra_jabon_deforme_empaque_roto_texto_ilegible);
    }
    if (isDeformed && isBoxVariationColor && isRippedBox) {
      console.log(
        "esta deforme, tiene empaque con variacion de color y empaque roto"
      );
      return (url =
        barraJabonModelsSrc.Barra_jabon_deforme_empaque_variacion_color_empaque_roto);
    }
    if (isDeformed && isBoxVariationColor && isIllegibleTexts) {
      console.log(
        "esta deforme, tiene variacion de color en el empaque y textos ilegibles"
      );
      return (url =
        barraJabonModelsSrc.Barra_jabon_deforme_empaque_variacion_color_texto_ilegible);
    }
    if (isBoxVariationColor && isRippedBox && isIllegibleTexts) {
      console.log(
        "tiene empaque con variacion de color, empaque roto y textos ilegibles"
      );
      return (url =
        barraJabonModelsSrc.Barra_jabon_empaque_variacion_color_empaque_roto_texto_ilegible);
    }
    if (isDeformed && isBarVariationColor && isRippedBox) {
      console.log(
        "esta deforme, tiene variacion de color en la barra y empaque roto"
      );
      return (url =
        barraJabonModelsSrc.Barra_jabon_variacion_color_deforme_empaque_roto);
    }
    if (isDeformed && isBothVariationColor && isRippedBox) {
      console.log("esta deforme, tiene variacion de color y empaque roto");
      return (url =
        barraJabonModelsSrc.Barra_jabon_variacion_color_deforme_empaque_variacion_color_empaque_roto);
    }
    if (isDeformed && isBothVariationColor && isIllegibleTexts) {
      console.log("esta deforme, tiene variacion de color y textos ilegibles");
      return (url =
        barraJabonModelsSrc.Barra_jabon_variacion_color_deforme_empaque_variacion_color_texto_ilegible);
    }
    if (isIllegibleTexts && isBarVariationColor && isDeformed) {
      console.log(
        "tiene textos ilegibles, variacion de color en la barra y esta deforme"
      );
      return (url =
        barraJabonModelsSrc.Barra_jabon_variacion_color_deforme_texto_ilegible);
    }
    if (isIllegibleTexts && isBarVariationColor && isRippedBox) {
      console.log(
        "tiene textos ilegibles, variacion de color en la barra y empaque roto"
      );
      return (url =
        barraJabonModelsSrc.Barra_jabon_variacion_color_empaque_roto_texto_ilegible);
    }
  }

  if (lengthAttributes === 4) {
    if (isDeformed && isRippedBox && isIllegibleTexts && isBoxVariationColor) {
      console.log(
        "esta deforme, tiene empaque roto, textos ilegibles y variacion de color en el empaque"
      );
      return (url =
        barraJabonModelsSrc.Barra_jabon_deforme_empaque_variacion_color_empaque_roto_texto_ilegible);
    }
    if (isDeformed && isRippedBox && isIllegibleTexts && isBarVariationColor) {
      console.log(
        "esta deforme, tiene empaque roto, textos ilegibles y variacion de color en la barra"
      );
      return (url =
        barraJabonModelsSrc.Barra_jabon_variacion_color_deforme_empaque_roto_texto_ilegible);
    }
    if (isDeformed && isRippedBox && isIllegibleTexts && isBothVariationColor) {
      console.log(
        "esta deforme, tiene empaque roto, textos ilegibles y variacion de color"
      );
      return (url =
        barraJabonModelsSrc.Barra_jabon_variacion_color_deforme_empaque_variacion_color_empaque_roto_texto_ilegible);
    }
  }
};
