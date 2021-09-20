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
    return bolsaArrozModelsSrc.Bolsa_arroz;
  }

  if (lengthAttributes === 1) {
    if (isRippedBag) {
      return bolsaArrozModelsSrc.Bolsa_arroz_bolsa_rota;
    }
    if (isTextIncomplete) {
      return bolsaArrozModelsSrc.Bolsa_arroz_textos_incompletos;
    }
    if (isColorVariation) {
      return bolsaArrozModelsSrc.Bolsa_arroz_variacion_color;
    }
    if (isDirty) {
      return bolsaArrozModelsSrc.Bolsa_arroz_con_suciedad;
    }
  }

  if (lengthAttributes === 2) {
    if (isRippedBag && isDirty) {
      return bolsaArrozModelsSrc.Bolsa_arroz_bolsa_rota_suciedad;
    }
    if (isRippedBag && isTextIncomplete) {
      return bolsaArrozModelsSrc.Bolsa_arroz_bolsa_rota_textos_incompletos;
    }
    if (isRippedBag && isColorVariation) {
      return bolsaArrozModelsSrc.Bolsa_arroz_bolsa_rota_variacion_color;
    }
    if (isTextIncomplete && isDirty) {
      return bolsaArrozModelsSrc.Bolsa_arroz_textos_incompletos_suciedad;
    }
    if (isColorVariation && isDirty) {
      return bolsaArrozModelsSrc.Bolsa_arroz_variacion_color_suciedad;
    }
    if (isColorVariation && isTextIncomplete) {
      return bolsaArrozModelsSrc.Bolsa_arroz_variacion_color_textos_incompletos;
    }
  }

  if (lengthAttributes === 3) {
    if (isRippedBag && isTextIncomplete && isDirty) {
      return bolsaArrozModelsSrc.Bolsa_arroz_bolsa_rota_textos_incompletos_suciedad;
    }
    if (isRippedBag && isColorVariation && isDirty) {
      return bolsaArrozModelsSrc.Bolsa_arroz_bolsa_rota_variacion_color_suciedad;
    }
    if (isRippedBag && isColorVariation && isTextIncomplete) {
      return bolsaArrozModelsSrc.Bolsa_arroz_bolsa_rota_variacion_color_textos_incompletos;
    }
    if (isColorVariation && isTextIncomplete && isDirty) {
      return bolsaArrozModelsSrc.Bolsa_arroz_variacion_color_textos_incompletos_suciedad;
    }
  }

  if (lengthAttributes === 4) {
    if (isRippedBag && isTextIncomplete && isDirty && isColorVariation) {
      return bolsaArrozModelsSrc.Bolsa_arroz_defectuosa;
    }
  }
};
