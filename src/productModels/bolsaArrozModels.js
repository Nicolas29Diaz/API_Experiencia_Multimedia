import { attBolsaArroz, bolsaArrozModelsSrc } from "../constants/index";
import { attributesMap } from "../helpers/index";
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
