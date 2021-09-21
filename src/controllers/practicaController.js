import { sequelize } from "../config/database";
import Grupo from "../models/Grupo";
import Practica from "../models/Practica";
import GrupoEstudiante from "../models/GrupoEstudiante";
import GraficoPractica from "../models/GraficoPractica";
import ProductoAtributo1 from "../models/ProductoAtributo1";
import ProductoAtributo2 from "../models/ProductoAtributo2";
import ProductoAtributo3 from "../models/ProductoAtributo3";
import ProductoCorte1 from "../models/ProductoCorte1";
import ProductoCorte2 from "../models/ProductoCorte2";
import ProductoCorte3 from "../models/ProductoCorte3";
import Subgrupo from "../models/Subgrupo";
import SubgrupoProducto from "../models/SubgrupoProducto";
import MetodoProducto from "../models/MetodoProducto";
import {
  ALEATORIO,
  CONSTANTE,
  VARIABLE,
  selectedGraphic,
  ATRIBUTOS_CODE,
  ATRIBUTO,
  BOLSA_ARROZ,
  REFRESCOS,
  BARRA_CHOCOLATE,
  BARRA_JABON,
  PITILLOS,
  PRODUCT_UNITS,
} from "../constants/index";

import {
  extractNameProductFromArray,
  formatDate,
  getRandomMinMax,
} from "../helpers";

/**
 * Función que permite crear una práctica del corte 1
 * @param {} req
 * @param {} res
 * @returns {idPractica}
 */
export async function createPractice1(req, res) {
  try {
    const {
      field: { nombrePractica, descripcion, modulo },
      groups,
      parseIntIdCurso,
    } = req.body;

    const idCorteP = modulo.value;

    const practica = await Practica.create(
      {
        nombrePractica,
        descripcionPractica: descripcion,
        idCorteP,
        idCursoP: parseIntIdCurso,
      },
      {
        fields: [
          "nombrePractica",
          "descripcionPractica",
          "idCorteP",
          "idCursoP",
        ],
      }
    );

    for (let i = 0; i < groups.length; i++) {
      const { producto, unidades, tolerancia, integrantes, cont, atributos } =
        groups[i];
      const nombreGrupo = `Grupo ${i + 1}`;

      const grupo = await Grupo.create(
        {
          nombreGrupo,
          idPracticaG: practica.dataValues.idPractica,
        },
        { fields: ["nombreGrupo", "idPracticaG"] }
      );

      for (let j = 0; j < integrantes.length; j++) {
        const grupoEstudiante = await GrupoEstudiante.create(
          {
            idGrupoGE: grupo.dataValues.idGrupo,
            idEstudianteGE: integrantes[j].idEstudiante,
            finalizado: 0,
          },
          { fields: ["idGrupoGE", "idEstudianteGE", "finalizado"] }
        );

        const referenceProduct = await ProductoCorte1.create(
          {
            nombrePC1: producto.label,
            variablePrincipalC1: cont.value,
            toleranciaPC1: tolerancia,
            unidadesPC1: unidades,
            idGrupoEstudiantePC1: grupoEstudiante.dataValues.idGrupoEstudiante,
          },
          {
            fields: [
              "nombrePC1",
              "variablePrincipalC1",
              "toleranciaPC1",
              "unidadesPC1",
              "idGrupoEstudiantePC1",
            ],
          }
        );

        for (let attribute = 0; attribute < atributos.length; attribute++) {
          await ProductoAtributo1.create(
            {
              idAtributoPA1: atributos[attribute].value,
              idProductoC1A: referenceProduct.dataValues.idProductoC1,
            },
            { fields: ["idAtributoPA1", "idProductoC1A"] }
          );
        }
      }
    }

    res.status(200).json({ idPractica: practica.dataValues.idPractica });
  } catch (error) {
    res.status(500).json("Hubo un error");
    console.log(error);
  }
}

/**
 * Función que permite crear una práctica del corte 2
 * @param {} req
 * @param {} res
 * @returns {idPractica}
 */
export async function createPractice2(req, res) {
  try {
    const {
      field: {
        nombrePractica,
        descripcion,
        modulo: { value },
        graficos,
      },
      groups,
      parseIntIdCurso,
    } = req.body;

    const getGraphics = graficos.map((grafico) => grafico.value);

    let countRandom = 1;
    let countConstant = 1;
    let countVariable = 1;

    const practica = await Practica.create(
      {
        nombrePractica,
        descripcionPractica: descripcion,
        idCorteP: value,
        idCursoP: parseIntIdCurso,
      },
      {
        fields: [
          "nombrePractica",
          "descripcionPractica",
          "idCorteP",
          "idCursoP",
        ],
      }
    );

    for (let graphic = 0; graphic < graficos.length; graphic++) {
      await GraficoPractica.create(
        {
          idPracticaGP: practica.dataValues.idPractica,
          idGraficoGP: graficos[graphic].value,
        },
        { fields: ["idPracticaGP", "idGraficoGP"] }
      );
    }

    for (let i = 0; i < groups.length; i++) {
      const {
        producto,
        subgrupo,
        tamanioSubgrupo,
        tolerancia,
        integrantes,
        cont,
        atributos,
      } = groups[i];
      const nombreGrupo = `Grupo ${i + 1}`;

      const grupo = await Grupo.create(
        {
          nombreGrupo,
          idPracticaG: practica.dataValues.idPractica,
        },
        { fields: ["nombreGrupo", "idPracticaG"] }
      );

      for (let j = 0; j < integrantes.length; j++) {
        const grupoEstudiante = await GrupoEstudiante.create(
          {
            idGrupoGE: grupo.dataValues.idGrupo,
            idEstudianteGE: integrantes[j].idEstudiante,
            finalizado: 0,
          },
          { fields: ["idGrupoGE", "idEstudianteGE", "finalizado"] }
        );

        const referenceProduct = await ProductoCorte2.create(
          {
            nombrePC2: producto.label,
            variablePrincipalC2: cont.value,
            toleranciaPC2: tolerancia,
            idGrupoEstudiantePC2: grupoEstudiante.dataValues.idGrupoEstudiante,
          },
          {
            fields: [
              "nombrePC2",
              "variablePrincipalC2",
              "toleranciaPC2",
              "idGrupoEstudiantePC2",
            ],
          }
        );

        for (let attribute = 0; attribute < atributos.length; attribute++) {
          await ProductoAtributo2.create(
            {
              idAtributoPA2: atributos[attribute].value,
              idProductoC2A: referenceProduct.dataValues.idProductoC2,
            },
            { fields: ["idAtributoPA2", "idProductoC2A"] }
          );
        }

        for (
          let indexGraphic = 0;
          indexGraphic < getGraphics.length;
          indexGraphic++
        ) {
          // Si el profesor elige un grafico de tipo aleatorio

          if (
            countRandom === 1 &&
            selectedGraphic[getGraphics[indexGraphic]] === ALEATORIO
          ) {
            for (let s = 0; s < subgrupo; s++) {
              const createSubgroup = await Subgrupo.create(
                {
                  nombreSubgrupo: `Subgrupo ${s + 1}`,
                  cantidadSubgrupo: getRandomMinMax(4, 8),
                  tipoSubgrupo: "aleatorio",
                },
                {
                  fields: [
                    "nombreSubgrupo",
                    "cantidadSubgrupo",
                    "tipoSubgrupo",
                  ],
                }
              );

              await SubgrupoProducto.create(
                {
                  idProductoC2SP: referenceProduct.dataValues.idProductoC2,
                  idSubgrupoSP: createSubgroup.dataValues.idSubgrupo,
                },
                { fields: ["idProductoC2SP", "idSubgrupoSP"] }
              );
            }
            countRandom--;
          }
          // Si el profesor elige un grafico de tipo constante

          if (
            countConstant === 1 &&
            selectedGraphic[getGraphics[indexGraphic]] === CONSTANTE
          ) {
            for (let s = 0; s < subgrupo; s++) {
              const createSubgroup = await Subgrupo.create(
                {
                  nombreSubgrupo: `Subgrupo ${s + 1}`,
                  cantidadSubgrupo: tamanioSubgrupo,
                  tipoSubgrupo: "constante",
                },
                {
                  fields: [
                    "nombreSubgrupo",
                    "cantidadSubgrupo",
                    "tipoSubgrupo",
                  ],
                }
              );

              await SubgrupoProducto.create(
                {
                  idProductoC2SP: referenceProduct.dataValues.idProductoC2,
                  idSubgrupoSP: createSubgroup.dataValues.idSubgrupo,
                },
                { fields: ["idProductoC2SP", "idSubgrupoSP"] }
              );
            }

            countConstant--;
          }
          // Si el profesor elige un grafico de tipo variable

          if (
            countVariable === 1 &&
            selectedGraphic[getGraphics[indexGraphic]] === VARIABLE
          ) {
            for (let s = 0; s < subgrupo; s++) {
              const createSubgroup = await Subgrupo.create(
                {
                  nombreSubgrupo: `Subgrupo ${s + 1}`,
                  cantidadSubgrupo: tamanioSubgrupo,
                  tipoSubgrupo: "variable",
                },
                {
                  fields: [
                    "nombreSubgrupo",
                    "cantidadSubgrupo",
                    "tipoSubgrupo",
                  ],
                }
              );

              await SubgrupoProducto.create(
                {
                  idProductoC2SP: referenceProduct.dataValues.idProductoC2,
                  idSubgrupoSP: createSubgroup.dataValues.idSubgrupo,
                },
                { fields: ["idProductoC2SP", "idSubgrupoSP"] }
              );
            }
            countVariable--;
          }
        }
      }
    }

    res.json({ idPractica: practica.dataValues.idPractica });
  } catch (error) {
    console.log(error);
  }
}

/**
 * Función que permite crear una práctica del corte 3
 * @param {} req
 * @param {} res
 * @returns {idPractica}
 */
export async function createPractice3(req, res) {
  try {
    const {
      field: {
        nombrePractica,
        descripcion,
        modulo: { value },
        tipoMuestreo,
      },
      groups,
      parseIntIdCurso,
    } = req.body;

    const practica = await Practica.create(
      {
        nombrePractica,
        descripcionPractica: descripcion,
        idCorteP: value,
        idCursoP: parseIntIdCurso,
      },
      {
        fields: [
          "nombrePractica",
          "descripcionPractica",
          "idCorteP",
          "idCursoP",
        ],
      }
    );

    for (let i = 0; i < groups.length; i++) {
      const {
        producto,
        tolerancia,
        cont,
        lote,
        aql,
        severidad,
        nivelInspeccion,
        integrantes,
        metodo,
        atributos,
      } = groups[i];
      const nombreGrupo = `Grupo ${i + 1}`;

      const getMethods = metodo && metodo.map((metodo) => metodo.value);

      const grupo = await Grupo.create(
        {
          nombreGrupo,
          idPracticaG: practica.dataValues.idPractica,
        },
        { fields: ["nombreGrupo", "idPracticaG"] }
      );

      for (let j = 0; j < integrantes.length; j++) {
        const grupoEstudiante = await GrupoEstudiante.create(
          {
            idGrupoGE: grupo.dataValues.idGrupo,
            idEstudianteGE: integrantes[j].idEstudiante,
            finalizado: 0,
          },
          { fields: ["idGrupoGE", "idEstudianteGE", "finalizado"] }
        );

        const referenceProduct = await ProductoCorte3.create(
          {
            nombrePC3: producto.label,
            ...(tipoMuestreo === VARIABLE && {
              variablePrincipalC3: cont.value,
            }),
            ...(tipoMuestreo === VARIABLE && { toleranciaPC3: tolerancia }),
            tamanioLote: lote,
            aql: aql.value,
            severidad: severidad.value,
            nivelInspeccion: nivelInspeccion.value,
            idGrupoEstudiantePC3: grupoEstudiante.dataValues.idGrupoEstudiante,
            tipoMuestreo,
          },
          {
            fields: [
              "nombrePC3",
              "tamanioLote",
              "aql",
              "severidad",
              "nivelInspeccion",
              "variablePrincipalC3",
              "toleranciaPC3",
              "idGrupoEstudiantePC3",
              "tipoMuestreo",
            ],
          }
        );

        if (tipoMuestreo === VARIABLE) {
          for (
            let indexMethod = 0;
            indexMethod < getMethods.length;
            indexMethod++
          ) {
            await MetodoProducto.create({
              idMetodoMP: getMethods[indexMethod],
              idProductoMP: referenceProduct.dataValues.idProductoC3,
            });
          }
          await ProductoAtributo3.create(
            {
              idAtributoPA3: ATRIBUTOS_CODE["Ninguno"],
              idProductoC3A: referenceProduct.dataValues.idProductoC3,
            },
            { fields: ["idAtributoPA3", "idProductoC3A"] }
          );
        }

        if (tipoMuestreo === ATRIBUTO && atributos?.length > 0) {
          console.log("tengo muchos atributos");
          for (let attribute = 0; attribute < atributos.length; attribute++) {
            await ProductoAtributo3.create(
              {
                idAtributoPA3: atributos[attribute].value,
                idProductoC3A: referenceProduct.dataValues.idProductoC3,
              },
              { fields: ["idAtributoPA3", "idProductoC3A"] }
            );
          }
          await MetodoProducto.create({
            idMetodoMP: 4,
            idProductoMP: referenceProduct.dataValues.idProductoC3,
          });
        }

        // if (getMethods?.length > 0) {
        //   for (
        //     let indexMethod = 0;
        //     indexMethod < getMethods.length;
        //     indexMethod++
        //   ) {
        //     await MetodoProducto.create({
        //       idMetodoMP: getMethods[indexMethod],
        //       idProductoMP: referenceProduct.dataValues.idProductoC3,
        //     });
        //   }
        // }
      }
    }

    res.json({ idPractica: practica.dataValues.idPractica });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
}

/**
 * Función que permite obtener todas las práticas creadas por un docente especifico para un curso
 * @param {} req
 * @param {} res
 * @returns {pratices}
 */

export async function getAllPractices(req, res) {
  try {
    const { idCurso } = req.params;
    const practices = await sequelize.query(
      `select pa.idPractica, pa.nombrePractica, pa.idCorteP 
      from practica pa, curso cu, profesor p 
      where p.idProfesor=cu.idProfesorC and cu.idCurso=pa.idCursoP
      and p.idProfesor=${req.user.id} and cu.idCurso=${idCurso};`,
      { type: sequelize.QueryTypes.SELECT }
    );
    res.json({ practices });
  } catch (error) {
    console.log(error);
  }
}

/** Función que permite traer la información de una practica del corte 1 para el docente
 * @param {} req
 * @param {} res
 * @returns {bannerInfo,grupos}
 */
export async function getPractice1InfoTeacher(req, res) {
  try {
    const { idPractica } = req.params;

    const bannerInfo = await sequelize.query(
      `   select cu.nombreCurso, co.nombreCorte,pa.idPractica, pa.nombrePractica, pa.descripcionPractica, pa.fechaHoraPublicacionPractica from grupo g, curso cu, corte co, practica pa where g.idPracticaG=pa.idPractica and pa.idCursoP=cu.idCurso and pa.idCorteP=co.idCorte and pa.idPractica=${idPractica} group by pa.idPractica;`,
      { type: sequelize.QueryTypes.SELECT }
    );

    const groupsInfo = await sequelize.query(
      `select g.idGrupo, p.nombrePC1, p.unidadesPC1, p.variablePrincipalC1,
              p.toleranciaPC1,group_concat(distinct " ",a.nombreAtributo) as atributos,
              group_concat( distinct concat(" ",e.nombreEstudiante, " ",e.apellidoEstudiante)separator ',')  as estudiantes
        from atributo a, producto_atributo_1 pa1, producto_corte_1 p, grupo_estudiante ge, estudiante e, 
		          grupo g, practica pa 
        where a.idAtributo=pa1.idAtributoPA1 and pa1.idProductoC1A=p.idProductoC1 and 
              p.idGrupoEstudiantePC1=ge.idGrupoEstudiante and e.idEstudiante=ge.idEstudianteGE and 
              ge.idGrupoGE=g.idGrupo and g.idPracticaG=pa.idPractica and pa.idPractica=${idPractica} group by g.idGrupo;
      `,
      { type: sequelize.QueryTypes.SELECT }
    );

    let getGroupStatus = [];
    let grupos = [];
    let arrozArray = [];
    let refrescosArray = [];
    let jabonArray = [];
    let chocolateArray = [];
    let pitillosArray = [];

    for (let i = 0; i < groupsInfo.length; i++) {
      const {
        idGrupo,
        nombrePC1,
        unidadesPC1,
        variablePrincipalC1,
        toleranciaPC1,
        atributos,
        estudiantes,
      } = groupsInfo[i];

      getGroupStatus = await sequelize.query(
        `select ge.finalizado from grupo_estudiante ge, grupo g, practica pa where pa.idPractica=g.idPracticaG and g.idGrupo=ge.idGrupoGE and g.idGrupo=${idGrupo} and pa.idPractica=${idPractica};`,
        { type: sequelize.QueryTypes.SELECT }
      );

      let isGroupsFinish = getGroupStatus.every(
        ({ finalizado }) => finalizado === 1
      );

      let grupo = {
        idGrupo,
        nombreProducto: nombrePC1,
        info: {
          unidades: unidadesPC1,
          variable: `${variablePrincipalC1} ${PRODUCT_UNITS[nombrePC1]}`,
          tolerancia: toleranciaPC1,
          atributos,
        },
        estudiantes,
        estado: isGroupsFinish ? "Realizado" : "Sin realizar",
      };

      if (nombrePC1 === BOLSA_ARROZ) {
        arrozArray.push(grupo);
      }
      if (nombrePC1 === REFRESCOS) {
        refrescosArray.push(grupo);
      }
      if (nombrePC1 === BARRA_JABON) {
        jabonArray.push(grupo);
      }
      if (nombrePC1 === PITILLOS) {
        pitillosArray.push(grupo);
      }
      if (nombrePC1 === BARRA_CHOCOLATE) {
        chocolateArray.push(grupo);
      }
    }

    // Añade el producto al arreglo de grupos
    const populateArrayGroups = (actualProduct, newArray) =>
      grupos.push({
        nombreProducto: actualProduct,
        productos: newArray,
      });

    if (Array.isArray(arrozArray) && arrozArray.length) {
      const { actualProduct, newArray } =
        extractNameProductFromArray(arrozArray);
      populateArrayGroups(actualProduct, newArray);
    }
    if (Array.isArray(refrescosArray) && refrescosArray.length) {
      const { actualProduct, newArray } =
        extractNameProductFromArray(refrescosArray);
      populateArrayGroups(actualProduct, newArray);
    }
    if (Array.isArray(jabonArray) && jabonArray.length) {
      const { actualProduct, newArray } =
        extractNameProductFromArray(jabonArray);
      populateArrayGroups(actualProduct, newArray);
    }
    if (Array.isArray(pitillosArray) && pitillosArray.length) {
      const { actualProduct, newArray } =
        extractNameProductFromArray(pitillosArray);
      populateArrayGroups(actualProduct, newArray);
    }
    if (Array.isArray(chocolateArray) && chocolateArray.length) {
      const { actualProduct, newArray } =
        extractNameProductFromArray(chocolateArray);
      populateArrayGroups(actualProduct, newArray);
    }

    res.json({ bannerInfo, grupos });
  } catch (error) {
    console.log(error);
  }
}

/** Función que permite traer la información de una practica del corte 2 para el docente
 * @param {} req
 * @param {} res
 * @returns {grupos}
 */
export async function getPractice2InfoTeacher(req, res) {
  try {
    const { idPractica } = req.params;

    const bannerInfo = await sequelize.query(
      `select cu.nombreCurso, co.nombreCorte,pa.idPractica, pa.nombrePractica, pa.descripcionPractica, pa.fechaHoraPublicacionPractica, group_concat(gr.nombreGrafico separator ', ') as graficos from curso cu, corte co, grafico_practica gp, grafico gr, practica pa where pa.idCursoP=cu.idCurso and pa.idCorteP=co.idCorte and pa.idPractica=gp.idPracticaGP and gp.idGraficoGP=gr.idGrafico and pa.idPractica=${idPractica} group by pa.idPractica;`,
      { type: sequelize.QueryTypes.SELECT }
    );

    const groupsInfo = await sequelize.query(
      `select g.idGrupo, count(distinct s.idSubgrupo) as subgrupos,s.cantidadSubgrupo, p.nombrePC2, p.variablePrincipalC2,
              p.toleranciaPC2,group_concat(distinct " ",a.nombreAtributo) as atributos,
              group_concat( distinct concat(" ",e.nombreEstudiante, " ",e.apellidoEstudiante)separator ',')  as estudiantes
      from atributo a, producto_atributo_2 pa2, producto_corte_2 p,subgrupo s, subgrupo_producto sp, 
            grupo_estudiante ge, estudiante e,grupo g, practica pa 
      where a.idAtributo=pa2.idAtributoPA2 and 
            pa2.idProductoC2A=p.idProductoC2 and 
            sp.idSubgrupoSP= s.idSubgrupo and p.idGrupoEstudiantePC2=ge.idGrupoEstudiante
            and e.idEstudiante=ge.idEstudianteGE and ge.idGrupoGE=g.idGrupo and 
            g.idPracticaG=pa.idPractica and pa.idPractica=${idPractica} group by g.idGrupo;`,
      { type: sequelize.QueryTypes.SELECT }
    );

    let getGroupStatus = [];
    let grupos = [];
    let arrozArray = [];
    let refrescosArray = [];
    let jabonArray = [];
    let chocolateArray = [];
    let pitillosArray = [];

    for (let i = 0; i < groupsInfo.length; i++) {
      const {
        idGrupo,
        subgrupos,
        cantidadSubgrupo,
        nombrePC2,
        variablePrincipalC2,
        toleranciaPC2,
        atributos,
        estudiantes,
      } = groupsInfo[i];

      getGroupStatus = await sequelize.query(
        `select ge.finalizado from grupo_estudiante ge, grupo g, practica pa where pa.idPractica=g.idPracticaG and g.idGrupo=ge.idGrupoGE and g.idGrupo=${idGrupo} and pa.idPractica=${idPractica};`,
        { type: sequelize.QueryTypes.SELECT }
      );

      let isGroupsFinish = getGroupStatus.every(
        ({ finalizado }) => finalizado === 1
      );

      let grupo = {
        idGrupo,
        nombreProducto: nombrePC2,
        infoSubgs: {
          subgrupos,
          cantidadSubgrupo,
        },
        info: {
          variable: `${variablePrincipalC2} ${PRODUCT_UNITS[nombrePC2]}`,
          tolerancia: toleranciaPC2,
          atributos,
        },
        estudiantes,
        estado: isGroupsFinish ? "Realizado" : "Sin realizar",
      };

      if (nombrePC2 === BOLSA_ARROZ) {
        arrozArray.push(grupo);
      }
      if (nombrePC2 === REFRESCOS) {
        refrescosArray.push(grupo);
      }
      if (nombrePC2 === BARRA_JABON) {
        jabonArray.push(grupo);
      }
      if (nombrePC2 === PITILLOS) {
        pitillosArray.push(grupo);
      }
      if (nombrePC2 === BARRA_CHOCOLATE) {
        chocolateArray.push(grupo);
      }
    }

    // Añade el producto al arreglo de grupos
    const populateArrayGroups = (actualProduct, newArray) =>
      grupos.push({ nombreProducto: actualProduct, productos: newArray });

    if (Array.isArray(arrozArray) && arrozArray.length) {
      const { actualProduct, newArray } =
        extractNameProductFromArray(arrozArray);
      populateArrayGroups(actualProduct, newArray);
    }
    if (Array.isArray(refrescosArray) && refrescosArray.length) {
      const { actualProduct, newArray } =
        extractNameProductFromArray(refrescosArray);
      populateArrayGroups(actualProduct, newArray);
    }
    if (Array.isArray(jabonArray) && jabonArray.length) {
      const { actualProduct, newArray } =
        extractNameProductFromArray(jabonArray);
      populateArrayGroups(actualProduct, newArray);
    }
    if (Array.isArray(pitillosArray) && pitillosArray.length) {
      const { actualProduct, newArray } =
        extractNameProductFromArray(pitillosArray);
      populateArrayGroups(actualProduct, newArray);
    }
    if (Array.isArray(chocolateArray) && chocolateArray.length) {
      const { actualProduct, newArray } =
        extractNameProductFromArray(chocolateArray);
      populateArrayGroups(actualProduct, newArray);
    }

    res.json({ bannerInfo, grupos });
  } catch (error) {
    console.log(error);
  }
}

/**
 * Función que permite traer la información de una practica del corte 3 para el docente
 * @param {*} req
 * @param {*} res
 * @returns {grupos}
 */
export async function getPractice3InfoTeacher(req, res) {
  try {
    const { idPractica } = req.params;

    const bannerInfo = await sequelize.query(
      `select cu.nombreCurso, co.nombreCorte,pa.idPractica, pa.nombrePractica, pa.descripcionPractica, pa.fechaHoraPublicacionPractica,group_concat(g.idGrupo separator ',') as grupos from grupo g, curso cu, corte co, practica pa where g.idPracticaG=pa.idPractica and pa.idCursoP=cu.idCurso and pa.idCorteP=co.idCorte and pa.idPractica=${idPractica} group by pa.idPractica;`,
      { type: sequelize.QueryTypes.SELECT }
    );
    const groupsInfo = await sequelize.query(
      `select g.idGrupo,p.nombrePC3, p.variablePrincipalC3, p.toleranciaPC3, p.tamanioLote, p.aql,p.severidad, p.nivelInspeccion,
       (case when p.tipoMuestreo='atributo' then group_concat(distinct a.nombreAtributo separator ', ')  else "ninguno" end) as atributos,
       (case when p.tipoMuestreo='variable' then group_concat(distinct m.nombreMetodo separator ',')  else "ninguno" end) as metodos,
       group_concat( distinct concat(" ",e.nombreEstudiante ," ",e.apellidoEstudiante)separator ',') as estudiantes 
       from metodo m, metodo_producto mp, atributo a, producto_atributo_3 pa3, producto_corte_3 p,grupo_estudiante ge,
       estudiante e,grupo g, practica pa where m.idMetodo=mp.idMetodoMP and mp.idProductoMP=p.idProductoC3 and a.idAtributo=pa3.idAtributoPA3 and pa3.idProductoC3A=p.idProductoC3 and 
       p.idGrupoEstudiantePC3=ge.idGrupoEstudiante and e.idEstudiante=ge.idEstudianteGE and ge.idGrupoGE=g.idGrupo and 
       g.idPracticaG=pa.idPractica and pa.idPractica=${idPractica};`,
      { type: sequelize.QueryTypes.SELECT }
    );

    let getGroupStatus = [];
    let grupos = [];
    let arrozArray = [];
    let refrescosArray = [];
    let jabonArray = [];
    let chocolateArray = [];
    let pitillosArray = [];

    for (let i = 0; i < groupsInfo.length; i++) {
      const {
        idGrupo,
        nombrePC3,
        variablePrincipalC3,
        toleranciaPC3,
        tamanioLote,
        aql,
        severidad,
        nivelInspeccion,
        atributos,
        metodos,
        estudiantes,
      } = groupsInfo[i];

      console.log(metodos);

      getGroupStatus = await sequelize.query(
        `select ge.finalizado from grupo_estudiante ge, grupo g, practica pa where pa.idPractica=g.idPracticaG and g.idGrupo=ge.idGrupoGE and g.idGrupo=${idGrupo} and pa.idPractica=${idPractica};`,
        { type: sequelize.QueryTypes.SELECT }
      );

      let isGroupsFinish = getGroupStatus.every(
        ({ finalizado }) => finalizado === 1
      );

      let grupo = {
        idGrupo,
        nombreProducto: nombrePC3,
        infoExtra: {
          tamanioLote,
          ...(metodos !== "ninguno" && { metodos }),
        },
        info: {
          ...(variablePrincipalC3 !== null && {
            variable: `${variablePrincipalC3} ${PRODUCT_UNITS[nombrePC3]}`,
          }),
          ...(toleranciaPC3 !== null && { tolerancia: toleranciaPC3 }),
          aql,
          severidad,
          "Nivel de inspeccion": nivelInspeccion,
          ...(atributos !== "ninguno" && { atributos }),
        },
        estudiantes,
        estado: isGroupsFinish ? "Realizado" : "Sin realizar",
      };

      if (nombrePC3 === BOLSA_ARROZ) {
        arrozArray.push(grupo);
      }
      if (nombrePC3 === REFRESCOS) {
        refrescosArray.push(grupo);
      }
      if (nombrePC3 === BARRA_JABON) {
        jabonArray.push(grupo);
      }
      if (nombrePC3 === PITILLOS) {
        pitillosArray.push(grupo);
      }
      if (nombrePC3 === BARRA_CHOCOLATE) {
        chocolateArray.push(grupo);
      }
    }

    // Añade el producto al arreglo de grupos
    const populateArrayGroups = (actualProduct, newArray) =>
      grupos.push({ nombreProducto: actualProduct, productos: newArray });

    if (Array.isArray(arrozArray) && arrozArray.length) {
      const { actualProduct, newArray } =
        extractNameProductFromArray(arrozArray);
      populateArrayGroups(actualProduct, newArray);
    }
    if (Array.isArray(refrescosArray) && refrescosArray.length) {
      const { actualProduct, newArray } =
        extractNameProductFromArray(refrescosArray);
      populateArrayGroups(actualProduct, newArray);
    }
    if (Array.isArray(jabonArray) && jabonArray.length) {
      const { actualProduct, newArray } =
        extractNameProductFromArray(jabonArray);
      populateArrayGroups(actualProduct, newArray);
    }
    if (Array.isArray(pitillosArray) && pitillosArray.length) {
      const { actualProduct, newArray } =
        extractNameProductFromArray(pitillosArray);
      populateArrayGroups(actualProduct, newArray);
    }
    if (Array.isArray(chocolateArray) && chocolateArray.length) {
      const { actualProduct, newArray } =
        extractNameProductFromArray(chocolateArray);
      populateArrayGroups(actualProduct, newArray);
    }

    res.json({ bannerInfo, grupos });
  } catch (error) {
    console.log(error);
  }
}

/**
 * Función que trae todas las prácticas del estudiante
 * @param {*} req
 * @param {*} res
 * @returns {practices}
 */
export async function getAllPraticesByStudent(req, res) {
  try {
    const { idEstudiante } = req.params;

    const getPractices = await sequelize.query(
      `select pa.*, ge.finalizado as finalizado from practica pa, grupo g, grupo_estudiante ge, estudiante e where e.idEstudiante=ge.idEstudianteGE and ge.idGrupoGE=g.idGrupo and g.idPracticaG=pa.idPractica and e.idEstudiante=${idEstudiante};`,
      { type: sequelize.QueryTypes.SELECT }
    );

    if (!getPractices.length)
      return res.status(404).json({ msg: "Este estudiante no existe" });

    let productStudent = "";
    let practices = [];

    for (let i = 0; i < getPractices.length; i++) {
      let idPractica = getPractices[i].idPractica;
      let productIndex = getPractices[i].idCorteP;
      productStudent = await sequelize.query(
        `select p.nombrePC${productIndex} as nombre from producto_corte_${productIndex} p, grupo_estudiante ge, estudiante e, grupo g, practica pa where p.idGrupoEstudiantePC${productIndex}=ge.idGrupoEstudiante and ge.idEstudianteGE=e.idEstudiante and ge.idGrupoGE=g.idGrupo and g.idPracticaG=pa.idPractica and e.idEstudiante=${idEstudiante} and pa.idPractica=${idPractica} group by p.idProductoC${productIndex} limit 1;`,
        { type: sequelize.QueryTypes.SELECT }
      );

      let practiceInfo = {
        id: idPractica,
        nombreProducto: productStudent[0].nombre,
        nombrePractica: getPractices[i].nombrePractica,
        descripcion: getPractices[i].descripcionPractica,
        fecha: formatDate(getPractices[i].fechaHoraPublicacionPractica),
        estado: getPractices[i].finalizado === 0 ? "Sin realizar" : "Realizada",
        idCorte: productIndex,
      };
      practices.push(practiceInfo);
    }

    res.json({ practices });
  } catch (error) {
    console.log(error);
  }
}

export async function deletePractice(req, res) {
  try {
    const { idPractica } = req.params;

    const practiceModule = await sequelize.query(
      `select idCorteP as modulo from practica where idPractica=${idPractica};`,
      { type: sequelize.QueryTypes.SELECT }
    );

    if (practiceModule[0].modulo === 2) {
      await sequelize.query(
        `delete subgrupo from subgrupo, subgrupo_producto, producto_corte_2, grupo_estudiante, grupo, practica where subgrupo.idSubgrupo=subgrupo_producto.idSubgrupoSP and subgrupo_producto.idProductoC2SP=producto_corte_2.idProductoC2 and producto_corte_2.idGrupoEstudiantePC2=grupo_estudiante.idGrupoEstudiante and grupo_estudiante.idGrupoGE=grupo.idGrupo and grupo.idPracticaG=practica.idPractica and practica.idPractica=${idPractica}`
      );
    }
    await Practica.destroy({
      where: { idPractica },
    });

    res.json({ msg: "Práctica eliminada con éxito" });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error" });
    console.log(error);
  }
}
