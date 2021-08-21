import { attBolsaArroz, bolsaArrozModelsSrc } from "../constants/index";
export const bolsaArrozModels = (atributos) => {
  let lengthAttributes = atributos.length;

  let ishasAttribute = (selectedAtt) => atributos.includes(selectedAtt);

  let isColorVariation = ishasAttribute(attBolsaArroz.VariacionColor);
  let isRippedBag = ishasAttribute(attBolsaArroz.BolsaRota);
  let isTextIncomplete = ishasAttribute(attBolsaArroz.TextoIncompleto);
  let isDirty = ishasAttribute(attBolsaArroz.Suciedades);
  let isNothing = ishasAttribute(attBolsaArroz.Ninguno);

  if (isNothing) {
    return attBolsaArroz.Bolsa_arroz;
  }

  if (lengthAttributes === 1) {
    if (isRippedBag) {
      console.log("tiene empaque roto");
      return bolsaArrozModelsSrc.Bolsa_arroz_bolsa_rota;
    }
    if (isTextIncomplete) {
      console.log("tiene textos incompletos");
      return bolsaArrozModelsSrc.Bolsa_arroz_textos_incompletos;
    }
    if (isColorVariation) {
      console.log("tiene variacion de color");
      return bolsaArrozModelsSrc.Bolsa_arroz_variacion_color;
    }
    if (isDirty) {
      console.log("tiene suciedades");
      return bolsaArrozModelsSrc.Bolsa_arroz_con_suciedad;
    }
  }

  if (lengthAttributes === 2) {
    if (isRippedBag && isDirty) {
      console.log("tiene empaque roto y suciedades");
      return bolsaArrozModelsSrc.Bolsa_arroz_bolsa_rota_suciedad;
    }
    if (isRippedBag && isTextIncomplete) {
      console.log("tiene empaque roto y textos incompletos");
      return bolsaArrozModelsSrc.Bolsa_arroz_bolsa_rota_textos_incompletos;
    }
    if (isRippedBag && isColorVariation) {
      console.log("tiene empaque roto y variacion de color");
      return bolsaArrozModelsSrc.Bolsa_arroz_bolsa_rota_variacion_color;
    }
    if (isTextIncomplete && isDirty) {
      console.log("tiene texto incompleto y suciedades");
      return bolsaArrozModelsSrc.Bolsa_arroz_textos_incompletos_suciedad;
    }
    if (isColorVariation && isDirty) {
      console.log("tiene variacion de color y suciedades");
      return bolsaArrozModelsSrc.Bolsa_arroz_variacion_color_suciedad;
    }
    if (isColorVariation && isTextIncomplete) {
      console.log("tiene variacion de color y texto incompleto");
      return bolsaArrozModelsSrc.Bolsa_arroz_variacion_color_textos_incompletos;
    }
  }

  if (lengthAttributes === 3) {
    if (isRippedBag && isTextIncomplete && isDirty) {
      console.log("tiene empaque roto, textos incompletos y suciedades");
      return bolsaArrozModelsSrc.Bolsa_arroz_bolsa_rota_textos_incompletos_suciedad;
    }
    if (isRippedBag && isColorVariation && isDirty) {
      console.log("tiene empaque roto, variacion de color y suciedades");
      return bolsaArrozModelsSrc.Bolsa_arroz_bolsa_rota_variacion_color_suciedad;
    }
    if (isRippedBag && isColorVariation && isTextIncomplete) {
      console.log("tiene empaque roto, variacion de color y texto incompleto");
      return bolsaArrozModelsSrc.Bolsa_arroz_bolsa_rota_variacion_color_textos_incompletos;
    }
    if (isColorVariation && isTextIncomplete && isDirty) {
      console.log("tiene variacion de color, texto incompleto y suciedades");
      return bolsaArrozModelsSrc.Bolsa_arroz_variacion_color_textos_incompletos_suciedad;
    }
  }

  if (lengthAttributes === 4) {
    if (isRippedBag && isTextIncomplete && isDirty && isColorVariation) {
      console.log("Esta defectuoso");
      return bolsaArrozModelsSrc.Bolsa_arroz_defectuosa;
    }
  }
};
