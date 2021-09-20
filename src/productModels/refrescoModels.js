import { attRefrescos, refrescosModelsSrc } from "../constants/index";

export const refrescoModels = (atributos) => {
  let lengthAttributes = atributos.length;

  let ishasAttribute = (selectedAtt) => atributos.includes(selectedAtt);

  let isText = ishasAttribute(attRefrescos.TextosIlegibles);
  let isTag = ishasAttribute(attRefrescos.EtiquetaSuelta);
  let isDirtyBottle = ishasAttribute(attRefrescos.EnvaseSucio);
  let isLooseCap = ishasAttribute(attRefrescos.TapaFloja);
  let isNothing = ishasAttribute(attRefrescos.Ninguno);

  if (isNothing) {
    return refrescosModelsSrc.Refresco;
  }

  if (lengthAttributes === 1) {
    if (isText) {
      return refrescosModelsSrc.Refresco_texto_ilegible;
    }

    if (isTag) {
      return refrescosModelsSrc.Refresco_etiqueta_suelta;
    }
    if (isDirtyBottle) {
      return refrescosModelsSrc.Refresco_envase_sucio;
    }

    if (isLooseCap) {
      return refrescosModelsSrc.Refresco_tapa_floja;
    }
  }

  if (lengthAttributes === 2) {
    if (isTag && isDirtyBottle) {
      return refrescosModelsSrc.Refresco_etiqueta_suelta_envase_sucio;
    }
    if (isDirtyBottle && isLooseCap) {
      return refrescosModelsSrc.Refresco_tapa_floja_envase_sucio;
    }
    if (isDirtyBottle && isText) {
      return refrescosModelsSrc.Refresco_envase_sucio_texto_ilegible;
    }
    if (isTag && isLooseCap) {
      return refrescosModelsSrc.Refresco_etiqueta_suelta_tapa_floja;
    }
    if (isTag && isText) {
      return refrescosModelsSrc.Refresco_etiqueta_suelta_texto_ilegible;
    }
    if (isText && isLooseCap) {
      return refrescosModelsSrc.Refresco_tapa_floja_texto_ilegible;
    }
  }

  if (lengthAttributes === 3) {
    if (isTag && isDirtyBottle && isLooseCap) {
      return refrescosModelsSrc.Refresco_etiqueta_suelta_envase_sucio_tapa_floja;
    }
    if (isDirtyBottle && isText && isLooseCap) {
      return refrescosModelsSrc.Refresco_etiqueta_suelta_envase_sucio_texto_ilegible;
    }
    if (isTag && isDirtyBottle && isText) {
      return refrescosModelsSrc.Refresco_etiqueta_suelta_envase_sucio_texto_ilegible;
    }
    if (isTag && isText && isLooseCap) {
      return refrescosModelsSrc.Refresco_etiqueta_suelta_texto_ilegible_tapa_floja;
    }
  }

  if (lengthAttributes === 4) {
    if (isTag && isDirtyBottle && isLooseCap && isText) {
      return refrescosModelsSrc.Refresco_defectuoso;
    }
  }
};
