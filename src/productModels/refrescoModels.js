import { attRefrescos, refrescosModelsSrc } from "../constants/index";
import { attributesMap } from "../helpers/index";

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
