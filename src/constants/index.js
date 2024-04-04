export const REFRESCOS = "Refrescos";
export const BOLSA_ARROZ = "Bolsa de arroz";
export const BARRA_CHOCOLATE = "Barra de chocolate";
export const BARRA_JABON = "Barra de jabon";
export const PITILLOS = "Pitillos";
export const CONSTANTE = "constante";
export const ALEATORIO = "aleatorio";
export const VARIABLE = "variable";
export const ATRIBUTO = "atributo";

const urlsrcModelJabon = process.env.URL_BARRA_JABON;
const urlsrcModelChocolate = process.env.URL_BARRA_CHOCOLATE;
const urlsrcModelArroz = process.env.URL_BOLSA_ARROZ;
const urlsrcModelPitillo = process.env.URL_PITILLO;
const urlsrcModelRefresco = process.env.URL_REFRESCO;

export const CANTIDAD_GAS = 15;
export const RIQUEZA_GRASA = 39;

export const VARIABLE_SECUNDARIA = {
  [REFRESCOS]: { name: "cant. gas", value: `${CANTIDAD_GAS}%` },
  [BARRA_JABON]: { name: "riqueza en grasa", value: `${RIQUEZA_GRASA}%` },
};

export const PRODUCT_UNITS = {
  [REFRESCOS]: "ml",
  [BOLSA_ARROZ]: "grs",
  [BARRA_CHOCOLATE]: "grs",
  [BARRA_JABON]: "grs",
  [PITILLOS]: "mm",
};

export const VARIABLE_PRIMARIA = (product) =>
  product == [PITILLOS] ? "Longitud" : "Cont"; //SE MODIFICA ESTO, antes  === en vez de ==

export const attRefrescos = {
  TextosIlegibles: "Textos ilegibles",
  EtiquetaSuelta: "Etiqueta suelta",
  EnvaseSucio: "Envase sucio",
  TapaFloja: "Tapa floja",
  Ninguno: "Ninguno",
};

export const attBolsaArroz = {
  VariacionColor: "Variacion de color",
  BolsaRota: "Bolsa rota",
  TextoIncompleto: "Textos incompletos",
  Suciedades: "Suciedades",
  Ninguno: "Ninguno",
};

export const attPitillos = {
  Doblados: "Doblado",
  Suciedades: "Suciedades",
  VariacionColor: "Variacion de color",
  Ninguno: "Ninguno",
};

export const attBarraChocolate = {
  BarraPartida: "Barra partida",
  VariacionColor: "Variacion de color",
  TextoIncompleto: "Textos incompletos",
  SellosIrregulares: "Sellos irregulares",
  Ninguno: "Ninguno",
};

export const attBarraJabon = {
  VariacionColor: "Variacion de color",
  VariacionColorBarra: "Variacion de color barra",
  VariacionColorEmpaque: "Variacion de color empaque",
  EmpaqueRoto: "Empaque roto",
  TextosIlegibles: "Textos ilegibles",
  Deforme: "Deforme",
  Ninguno: "Ninguno",
};

export const ATRIBUTOS_CODE = {
  "Variacion de color": 1,
  "Empaque roto": 2,
  "Textos ilegibles": 3,
  Deforme: 4,
  "Bolsa rota": 5,
  "Textos incompletos": 6,
  Suciedades: 7,
  "Barra partida": 8,
  "Sellos irregulares": 9,
  Doblado: 10,
  "Etiqueta suelta": 11,
  "Envase sucio": 12,
  "Tapa floja": 13,
  Ninguno: 14,
  "Variacion de color barra": 15,
  "Variacion de color empaque": 16,
};

export const GRAFICOS_CODE = {
  Media: 1,
  Rango: 2,
  "Desviación estandar": 3,
  "P con n constante": 4,
  "P con n variable": 5,
  NP: 6,
  C: 7,
  "U con n constante": 8,
  "U con n variable": 9,
};

export const METHODS_CODE = {
  1: "K",
  2: "M",
  3: "Rango",
};

export const selectedGraphic = {
  1: "variable",
  2: "variable",
  3: "variable",
  4: "constante",
  5: "aleatorio",
  6: "constante",
  7: "constante",
  8: "constante",
  9: "aleatorio",
};

// Rutas de los modelos
export const barraJabonModelsSrc = {
  poster_jabon: `${urlsrcModelJabon}/poster_jabon.png`,
  Barra_jabon_barra_deforme: `${urlsrcModelJabon}/Barra_jabon_barra_deforme.glb`,
  Barra_jabon_barra_deforme_empaque_roto: `${urlsrcModelJabon}/Barra_jabon_barra_deforme_empaque_roto.glb`,
  Barra_jabon_barra_deforme_empaque_variacion_color: `${urlsrcModelJabon}/Barra_jabon_barra_deforme_empaque_variacion_color.glb`,
  Barra_jabon_barra_deforme_texto_ilegible: `${urlsrcModelJabon}/Barra_jabon_barra_deforme_texto_ilegible.glb`,
  Barra_jabon_buena: `${urlsrcModelJabon}/Barra_jabon_buena.glb`,
  Barra_jabon_deforme_empaque_roto_texto_ilegible: `${urlsrcModelJabon}/Barra_jabon_deforme_empaque_roto_texto_ilegible.glb`,
  Barra_jabon_deforme_empaque_variacion_color_empaque_roto: `${urlsrcModelJabon}/Barra_jabon_deforme_empaque_variacion_color_empaque_roto.glb`,
  Barra_jabon_deforme_empaque_variacion_color_empaque_roto_texto_ilegible: `${urlsrcModelJabon}/Barra_jabon_deforme_empaque_variacion_color_empaque_roto_texto_ilegible.glb`,
  Barra_jabon_deforme_empaque_variacion_color_texto_ilegible: `${urlsrcModelJabon}/Barra_jabon_deforme_empaque_variacion_color_texto_ilegible.glb`,
  Barra_jabon_empaque_roto: `${urlsrcModelJabon}/Barra_jabon_empaque_roto.glb`,
  Barra_jabon_empaque_roto_texto_ilegible: `${urlsrcModelJabon}/Barra_jabon_empaque_roto_texto_ilegible.glb`,
  Barra_jabon_empaque_variacion_color: `${urlsrcModelJabon}/Barra_jabon_empaque_variacion_color.glb`,
  Barra_jabon_empaque_variacion_color_empaque_roto: `${urlsrcModelJabon}/Barra_jabon_empaque_variacion_color_empaque_roto.glb`,
  Barra_jabon_empaque_variacion_color_empaque_roto_texto_ilegible: `${urlsrcModelJabon}/Barra_jabon_empaque_variacion_color_empaque_roto_texto_ilegible.glb`,
  Barra_jabon_empaque_variacion_color_texto_ilegible: `${urlsrcModelJabon}/Barra_jabon_empaque_variacion_color_texto_ilegible.glb`,
  Barra_jabon_texto_ilegible: `${urlsrcModelJabon}/Barra_jabon_texto_ilegible.glb`,
  Barra_jabon_variacion_color: `${urlsrcModelJabon}/Barra_jabon_variacion_color.glb`,
  Barra_jabon_variacion_color_deforme: `${urlsrcModelJabon}/Barra_jabon_variacion_color_deforme.glb`,
  Barra_jabon_variacion_color_deforme_empaque_roto_texto_ilegible: `${urlsrcModelJabon}/Barra_jabon_variacion_color_deforme_empaque_roto_texto_ilegible.glb`,
  Barra_jabon_variacion_color_deforme_empaque_variacion_color: `${urlsrcModelJabon}/Barra_jabon_variacion_color_deforme_empaque_variacion_color.glb`,
  Barra_jabon_variacion_color_deforme_empaque_variacion_color_empaque_roto: `${urlsrcModelJabon}/Barra_jabon_variacion_color_deforme_empaque_variacion_color_empaque_roto.glb`,
  Barra_jabon_variacion_color_deforme_empaque_roto: `${urlsrcModelJabon}/Barra_jabon_variacion_color_deforme_empaque_roto.glb`,
  Barra_jabon_variacion_color_deforme_empaque_variacion_color_texto_ilegible: `${urlsrcModelJabon}/Barra_jabon_variacion_color_deforme_empaque_variacion_color_texto_ilegible.glb`,
  Barra_jabon_variacion_color_deforme_empaque_variacion_color_empaque_roto_texto_ilegible: `${urlsrcModelJabon}/Barra_jabon_variacion_color_deforme_empaque_variacion_color_empaque_roto_texto_ilegible.glb`,
  Barra_jabon_variacion_color_deforme_texto_ilegible: `${urlsrcModelJabon}/Barra_jabon_variacion_color_deforme_texto_ilegible.glb`,
  Barra_jabon_variacion_color_empaque_roto: `${urlsrcModelJabon}/Barra_jabon_variacion_color_empaque_roto.glb`,
  Barra_jabon_variacion_color_empaque_roto_texto_ilegible: `${urlsrcModelJabon}/Barra_jabon_variacion_color_empaque_roto_texto_ilegible.glb`,
  Barra_jabon_variacion_color_empaque_variacion_color: `${urlsrcModelJabon}/Barra_jabon_variacion_color_empaque_variacion_color.glb`,
  Barra_jabon_variacion_color_empaque_variacion_color_empaque_roto: `${urlsrcModelJabon}/Barra_jabon_variacion_color_empaque_variacion_color_empaque_roto.glb`,
  Barra_jabon_variacion_color_empaque_variacion_color_empaque_roto_texto_ilegible: `${urlsrcModelJabon}/Barra_jabon_variacion_color_empaque_variacion_color_empaque_roto_texto_ilegible.glb`,
  Barra_jabon_variacion_color_empaque_variacion_color_texto_ilegible: `${urlsrcModelJabon}/Barra_jabon_variacion_color_empaque_variacion_color_texto_ilegible.glb`,
  Barra_jabon_variacion_color_texto_ilegible: `${urlsrcModelJabon}/Barra_jabon_variacion_color_texto_ilegible.glb`,
};

export const barraChocolateModelsSrc = {
  poster_chocolate: `${urlsrcModelChocolate}/poster_chocolate.png`,
  Barra_chocolate: `${urlsrcModelChocolate}/Barra_chocolate.glb`,
  Barra_chocolate_defectuosa: `${urlsrcModelChocolate}/Barra_chocolate_defectuosa.glb`,
  Barra_chocolate_partida: `${urlsrcModelChocolate}/Barra_chocolate_partida.glb`,
  Barra_chocolate_partida_sellos_irregulares: `${urlsrcModelChocolate}/Barra_chocolate_partida_sellos_irregulares.glb`,
  Barra_chocolate_partida_textos_incompletos: `${urlsrcModelChocolate}/Barra_chocolate_partida_textos_incompletos.glb`,
  Barra_chocolate_partida_textos_incompletos_sellos_irregulares: `${urlsrcModelChocolate}/Barra_chocolate_partida_textos_incompletos_sellos_irregulares.glb`,
  Barra_chocolate_partida_variacion_color: `${urlsrcModelChocolate}/Barra_chocolate_partida_variacion_color.glb`,
  Barra_chocolate_partida_variacion_color_sellos_irregulares: `${urlsrcModelChocolate}/Barra_chocolate_partida_variacion_color_sellos_irregulares.glb`,
  Barra_chocolate_partida_variacion_color_textos_incompletos: `${urlsrcModelChocolate}/Barra_chocolate_partida_variacion_color_textos_incompletos.glb`,
  Barra_chocolate_sellos_irregulares: `${urlsrcModelChocolate}/Barra_chocolate_sellos_irregulares.glb`,
  Barra_chocolate_texto_incompleto: `${urlsrcModelChocolate}/Barra_chocolate_texto_incompleto.glb`,
  Barra_chocolate_textos_incompletos_sellos_irregulares: `${urlsrcModelChocolate}/Barra_chocolate_textos_incompletos_sellos_irregulares.glb`,
  Barra_chocolate_variacion_color: `${urlsrcModelChocolate}/Barra_chocolate_variacion_color.glb`,
  Barra_chocolate_variacion_color_sellos_irregulares: `${urlsrcModelChocolate}/Barra_chocolate_variacion_color_sellos_irregulares.glb`,
  Barra_chocolate_variacion_color_textos_incompletos: `${urlsrcModelChocolate}/Barra_chocolate_variacion_color_textos_incompletos.glb`,
  Barra_chocolate_variacion_color_textos_incompletos_sellos_irregulares: `${urlsrcModelChocolate}/Barra_chocolate_variacion_color_textos_incompletos_sellos_irregulares.glb`,
};

export const bolsaArrozModelsSrc = {
  poster_arroz: `${urlsrcModelArroz}/poster_arroz.png`,
  Bolsa_arroz: `${urlsrcModelArroz}/Bolsa_arroz.glb`,
  Bolsa_arroz_bolsa_rota: `${urlsrcModelArroz}/Bolsa_arroz_bolsa_rota.glb`,
  Bolsa_arroz_bolsa_rota_suciedad: `${urlsrcModelArroz}/Bolsa_arroz_bolsa_rota_suciedad.glb`,
  Bolsa_arroz_bolsa_rota_textos_incompletos: `${urlsrcModelArroz}/Bolsa_arroz_bolsa_rota_textos_incompletos.glb`,
  Bolsa_arroz_bolsa_rota_textos_incompletos_suciedad: `${urlsrcModelArroz}/Bolsa_arroz_bolsa_rota_textos_incompletos_suciedad.glb`,
  Bolsa_arroz_bolsa_rota_variacion_color: `${urlsrcModelArroz}/Bolsa_arroz_bolsa_rota_variacion_color.glb`,
  Bolsa_arroz_bolsa_rota_variacion_color_suciedad: `${urlsrcModelArroz}/Bolsa_arroz_bolsa_rota_variacion_color_suciedad.glb`,
  Bolsa_arroz_bolsa_rota_variacion_color_textos_incompletos: `${urlsrcModelArroz}/Bolsa_arroz_bolsa_rota_variacion_color_textos_incompletos.glb`,
  Bolsa_arroz_con_suciedad: `${urlsrcModelArroz}/Bolsa_arroz_con_suciedad.glb`,
  Bolsa_arroz_defectuosa: `${urlsrcModelArroz}/Bolsa_arroz_defectuosa.glb`,
  Bolsa_arroz_textos_incompletos: `${urlsrcModelArroz}/Bolsa_arroz_textos_incompletos.glb`,
  Bolsa_arroz_textos_incompletos_suciedad: `${urlsrcModelArroz}/Bolsa_arroz_textos_incompletos_suciedad.glb`,
  Bolsa_arroz_variacion_color: `${urlsrcModelArroz}/Bolsa_arroz_variacion_color.glb`,
  Bolsa_arroz_variacion_color_suciedad: `${urlsrcModelArroz}/Bolsa_arroz_variacion_color_suciedad.glb`,
  Bolsa_arroz_variacion_color_textos_incompletos: `${urlsrcModelArroz}/Bolsa_arroz_variacion_color_textos_incompletos.glb`,
  Bolsa_arroz_variacion_color_textos_incompletos_suciedad: `${urlsrcModelArroz}/Bolsa_arroz_variacion_color_textos_incompletos_suciedad.glb`,
};

export const pitillosModelsSrc = {
  poster_pitillo: `${urlsrcModelPitillo}/poster_pitillo.png`,
  Pitillo: `${urlsrcModelPitillo}/Pitillo.glb`,
  Pitillo_con_suciedad: `${urlsrcModelPitillo}/Pitillo_con_suciedad.glb`,
  Pitillo_con_suciedad_variacion_color: `${urlsrcModelPitillo}/Pitillo_con_suciedad_variacion_color.glb`,
  Pitillo_defectuoso: `${urlsrcModelPitillo}/Pitillo_defectuoso.glb`,
  Pitillo_doblado: `${urlsrcModelPitillo}/Pitillo_doblado.glb`,
  Pitillo_doblado_suciedad: `${urlsrcModelPitillo}/Pitillo_doblado_suciedad.glb`,
  Pitillo_doblado_variacion_color: `${urlsrcModelPitillo}/Pitillo_doblado_variacion_color.glb`,
  Pitillo_variacion_color: `${urlsrcModelPitillo}/Pitillo_variacion_color.glb`,
};

export const refrescosModelsSrc = {
  poster_refresco: `${urlsrcModelRefresco}/poster.png`,
  Refresco: `${urlsrcModelRefresco}/Refresco.glb`,
  Refresco_defectuoso: `${urlsrcModelRefresco}/Refresco_defectuoso.glb`,
  Refresco_envase_sucio: `${urlsrcModelRefresco}/Refresco_envase_sucio.glb`,
  Refresco_envase_sucio_texto_ilegible: `${urlsrcModelRefresco}/Refresco_envase_sucio_texto_ilegible.glb`,
  Refresco_etiqueta_suelta: `${urlsrcModelRefresco}/Refresco_etiqueta_suelta.glb`,
  Refresco_etiqueta_suelta_envase_sucio: `${urlsrcModelRefresco}/Refresco_etiqueta_suelta_envase_sucio.glb`,
  Refresco_etiqueta_suelta_envase_sucio_tapa_floja: `${urlsrcModelRefresco}/Refresco_etiqueta_suelta_envase_sucio_tapa_floja.glb`,
  Refresco_etiqueta_suelta_envase_sucio_texto_ilegible: `${urlsrcModelRefresco}/Refresco_etiqueta_suelta_envase_sucio_texto_ilegible.glb`,
  Refresco_etiqueta_suelta_tapa_floja: `${urlsrcModelRefresco}/Refresco_etiqueta_suelta_tapa_floja.glb`,
  Refresco_etiqueta_suelta_texto_ilegible: `${urlsrcModelRefresco}/Refresco_etiqueta_suelta_texto_ilegible.glb`,
  Refresco_etiqueta_suelta_texto_ilegible_tapa_floja: `${urlsrcModelRefresco}/Refresco_etiqueta_suelta_texto_ilegible_tapa_floja.glb`,
  Refresco_tapa_floja: `${urlsrcModelRefresco}/Refresco_tapa_floja.glb`,
  Refresco_tapa_floja_envase_sucio: `${urlsrcModelRefresco}/Refresco_tapa_floja_envase_sucio.glb`,
  Refresco_tapa_floja_envase_sucio_texto_ilegible: `${urlsrcModelRefresco}/Refresco_tapa_floja_envase_sucio_texto_ilegible.glb`,
  Refresco_tapa_floja_texto_ilegible: `${urlsrcModelRefresco}/Refresco_tapa_floja_texto_ilegible.glb`,
  Refresco_texto_ilegible: `${urlsrcModelRefresco}/Refresco_texto_ilegible.glb`,
};
