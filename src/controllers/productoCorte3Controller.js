import { sequelize } from "../config/database";
import ProductoAtributo3 from "../models/ProductoAtributo3";
import Practica from "../models/Practica";
import ProductoCorte3 from "../models/ProductoCorte3";
import { getRandomAttributes, getRandomMinMax, shuffle } from "../helpers";
import {
  ATRIBUTOS_CODE,
  BARRA_JABON,
  PRODUCT_UNITS,
  REFRESCOS,
  VARIABLE_PRIMARIA,
  VARIABLE_SECUNDARIA,
} from "../constants";
import { getModels } from "../productModels";
import { getPosterImages } from "../productModels/getPosterImages";

// api/producto/corte3/

export async function getAllProductsC3(req, res) {
  try {
    const productosCorte3 = await ProductoCorte3.findAll();
    res.json(productosCorte3);
  } catch (error) {
    console.log(error);
  }
}

// Obtener los datos de la practica
export async function getPracticeThreeProductPerStudent(req, res) {
  const { idEstudiante, idPractica } = req.params;
  try {
    const samplingType = await sequelize.query(
      `select p.tipoMuestreo from producto_corte_3 p, grupo_estudiante ge, estudiante e, grupo g, practica pa where p.idGrupoEstudiantePC3=ge.idGrupoEstudiante and ge.idEstudianteGE=e.idEstudiante and ge.idGrupoGE=g.idGrupo and g.idPracticaG=pa.idPractica and e.idEstudiante=${idEstudiante} and pa.idPractica=${idPractica};`,
      { type: sequelize.QueryTypes.SELECT }
    );

    const [selectedTypeOfSampling] = samplingType;

    const count = await sequelize.query(
      `select count(p.idProductoC3) as countProducts from producto_corte_3 p, grupo_estudiante ge, estudiante e, grupo g, practica pa
where p. idGrupoEstudiantePC3=ge.idGrupoEstudiante and ge.idEstudianteGE=e.idEstudiante and ge.idGrupoGE=g.idGrupo 
and g.idPracticaG=pa.idPractica and pa.idPractica=${idPractica} and e.idEstudiante=${idEstudiante};`,
      { type: sequelize.QueryTypes.SELECT }
    );

    const numberProducts = count[0].countProducts;

    let productsStudent = "";

    if (selectedTypeOfSampling.tipoMuestreo === "variable") {
      productsStudent = await sequelize.query(
        `select p.tipoMuestreo, p.idGrupoEstudiantePC3, p.nombrePC3, p.variablePrincipalC3,p.toleranciaPC3,p.tamanioLote,p.aql,p.severidad,p.nivelInspeccion,group_concat(m.nombreMetodo separator ', ') as metodos from metodo m, metodo_producto mp, producto_corte_3 p, grupo_estudiante ge, estudiante e, grupo g, practica pa where m.idMetodo=mp.idMetodoMP and mp.idProductoMP=p.idProductoC3 and p.idGrupoEstudiantePC3=ge.idGrupoEstudiante and ge.idEstudianteGE=e.idEstudiante and ge.idGrupoGE=g.idGrupo and g.idPracticaG=pa.idPractica and e.idEstudiante=${idEstudiante} and pa.idPractica=${idPractica} group by p.nombrePC3 limit 1;`,
        { type: sequelize.QueryTypes.SELECT }
      );
    }
    if (selectedTypeOfSampling.tipoMuestreo === "atributo") {
      productsStudent = await sequelize.query(
        `select p.tipoMuestreo, p.idGrupoEstudiantePC3, p.nombrePC3,p.tamanioLote,p.aql,p.severidad,p.nivelInspeccion,group_concat(a.nombreAtributo separator ', ') as atributos from atributo a, producto_atributo_3 pa3, producto_corte_3 p, grupo_estudiante ge, estudiante e, grupo g, practica pa where a.idAtributo=pa3.idAtributoPA3 and pa3.idProductoC3A=p.idProductoC3 and p.idGrupoEstudiantePC3=ge.idGrupoEstudiante and ge.idEstudianteGE=e.idEstudiante and ge.idGrupoGE=g.idGrupo and g.idPracticaG=pa.idPractica and e.idEstudiante=${idEstudiante} and pa.idPractica=${idPractica} group by p.nombrePC3 limit 1;`,
        { type: sequelize.QueryTypes.SELECT }
      );
    }

    res.json({ productsStudent, numberProducts });
  } catch (error) {
    console.log(error);
    res.status(500).json("Hubo un error");
  }
}

export async function createInspectionProductC3(req, res) {
  try {
    const {
      tipoMuestreo,
      tamanioMuestra,
      idGrupoEstudiantePC3,
      nombrePC3,
      variablePrincipalC3,
      toleranciaPC3,
      atributos,
    } = req.body;

    let getRandomTolerancePrincipal = 0;
    let getRandomToleranceSecondary = 0;
    let resultRandomAttributesList = 0;
    let randomItem = 0;

    let inspectionProduct = "";

    let atributosProduct = atributos?.split(",");

    let isHasProductName = nombrePC3 === REFRESCOS || nombrePC3 === BARRA_JABON;

    if (tipoMuestreo === "variable") {
      for (let i = 0; i < tamanioMuestra; i++) {
        getRandomTolerancePrincipal = getRandomMinMax(
          -toleranciaPC3,
          toleranciaPC3
        );

        inspectionProduct = await ProductoCorte3.create(
          {
            nombrePC3,
            variablePrincipalC3:
              variablePrincipalC3 + getRandomTolerancePrincipal,
            ...(isHasProductName === BARRA_JABON && {
              variableSecundariaC3: 39 + getRandomToleranceSecondary,
            }),
            ...(isHasProductName && {
              variableSecundariaC3: 15 + getRandomToleranceSecondary,
            }),
            idGrupoEstudiantePC3,
            tipoMuestreo,
          },
          {
            fields: [
              "nombrePC3",
              "variablePrincipalC3",
              "variableSecundariaC3",
              "idGrupoEstudiantePC3",
              "tipoMuestreo",
            ],
          }
        );
        await ProductoAtributo3.create({
          idAtributoPA3: ATRIBUTOS_CODE["Ninguno"],
          idProductoC3A: inspectionProduct.dataValues.idProductoC3,
        });
      }
    }
    if (tipoMuestreo === "atributo") {
      // Número de productos en buen estado
      let normalProductAmount = Math.round(tamanioMuestra * 0.6);
      // Número de productos en mal estado
      let faultyProductAmount = tamanioMuestra - normalProductAmount;
      for (let i = 0; i < normalProductAmount; i++) {
        getRandomTolerancePrincipal = getRandomMinMax(
          -toleranciaPC3,
          toleranciaPC3
        );

        randomItem = getRandomMinMax(1, atributosProduct.length);

        resultRandomAttributesList = getRandomAttributes(
          randomItem,
          atributosProduct
        );

        inspectionProduct = await ProductoCorte3.create(
          {
            nombrePC3,
            idGrupoEstudiantePC3,
            tipoMuestreo,
          },
          {
            fields: ["nombrePC3", "idGrupoEstudiantePC3", "tipoMuestreo"],
          }
        );
        await ProductoAtributo3.create({
          idAtributoPA3: ATRIBUTOS_CODE["Ninguno"],
          idProductoC3A: inspectionProduct.dataValues.idProductoC3,
        });
      }
      for (let i = 0; i < faultyProductAmount; i++) {
        getRandomTolerancePrincipal = getRandomMinMax(
          -toleranciaPC3,
          toleranciaPC3
        );

        randomItem = getRandomMinMax(1, atributosProduct.length);

        resultRandomAttributesList = getRandomAttributes(
          randomItem,
          atributosProduct
        );

        inspectionProduct = await ProductoCorte3.create(
          {
            nombrePC3,
            idGrupoEstudiantePC3,
            tipoMuestreo,
          },
          {
            fields: ["nombrePC3", "idGrupoEstudiantePC3", "tipoMuestreo"],
          }
        );
        for (let j = 0; j < resultRandomAttributesList.length; j++) {
          await ProductoAtributo3.create({
            idAtributoPA3: ATRIBUTOS_CODE[resultRandomAttributesList[j].trim()],
            idProductoC3A: inspectionProduct.dataValues.idProductoC3,
          });
        }
      }
    }
    res.json({ msg: "Productos creado con éxito" });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error" });
    console.log(error);
  }
}

// Se obtienen los productos para la inspección
export async function getPracticeThreeProductInfoPerStudent(req, res) {
  const { idEstudiante, idPractica } = req.params;
  try {
    const getProductsCount = await sequelize.query(
      `select count(p.idProductoC3) as count from producto_corte_3 p, grupo_estudiante ge, estudiante e, grupo g, practica pa where p.idGrupoEstudiantePC3=ge.idGrupoEstudiante and ge.idEstudianteGE=e.idEstudiante and ge.idGrupoGE=g.idGrupo and g.idPracticaG=pa.idPractica and pa.idPractica=${idPractica} and e.idEstudiante=${idEstudiante};`,
      { type: sequelize.QueryTypes.SELECT }
    );

    const [getValue] = getProductsCount;
    const count = getValue.count;
    const productsStudent = await sequelize.query(
      `select p.idProductoC3, p.nombrePC3, p.variablePrincipalC3, p.variableSecundariaC3, p.estado, group_concat(a.nombreAtributo separator ',') as atributos from atributo a, producto_atributo_3 pa3, producto_corte_3 p, grupo_estudiante ge, estudiante e, grupo g, practica pa where a.idAtributo=pa3.idAtributoPA3 and pa3.idProductoC3A=p.idProductoC3 and p.idGrupoEstudiantePC3=ge.idGrupoEstudiante and ge.idEstudianteGE=e.idEstudiante and ge.idGrupoGE=g.idGrupo and g.idPracticaG=pa.idPractica and e.idEstudiante=${idEstudiante} and pa.idPractica=${idPractica} group by p.idProductoC3 limit ${count} offset 1;`,
      { type: sequelize.QueryTypes.SELECT }
    );

    let productsArray = [];
    const products = productsStudent.map(
      ({
        idProductoC3,
        nombrePC3,
        variablePrincipalC3,
        variableSecundariaC3,
        atributos,
        estado,
      }) => {
        let separateAttributes = atributos.split(",");

        return {
          id: idProductoC3,
          nombre: nombrePC3,
          ...(variablePrincipalC3 !== null && {
            variablePrincipal: `${variablePrincipalC3} ${PRODUCT_UNITS[nombrePC3]}`,
          }),
          ...(variableSecundariaC3 !== null && {
            variableSecundaria: `${variableSecundariaC3} %`,
          }),
          src: getModels(nombrePC3, separateAttributes),
          atributos,
          estado,
        };
      }
    );

    let shuffleArray = shuffle(products);

    let [actualProduct] = products;
    let image = actualProduct.nombre;
    let getImage = getPosterImages(image);

    productsArray.push({ poster: getImage, products: shuffleArray });

    res.json({ productsArray });
  } catch (error) {
    console.log(error);
  }
}

export async function getFeaturesC3(req, res) {
  try {
    const { idEstudiante, idPractica } = req.params;

    const samplingType = await sequelize.query(
      `select p.tipoMuestreo from producto_corte_3 p, grupo_estudiante ge, estudiante e, grupo g, practica pa where p.idGrupoEstudiantePC3=ge.idGrupoEstudiante and ge.idEstudianteGE=e.idEstudiante and ge.idGrupoGE=g.idGrupo and g.idPracticaG=pa.idPractica and e.idEstudiante=${idEstudiante} and pa.idPractica=${idPractica} limit 1;`,
      { type: sequelize.QueryTypes.SELECT }
    );

    const [selectedTypeOfSampling] = samplingType;

    let getInfo = [];

    if (selectedTypeOfSampling.tipoMuestreo === "variable") {
      getInfo = await sequelize.query(
        `select p.nombrePC3,p.variablePrincipalC3,p.toleranciaPC3 from producto_corte_3 p, grupo_estudiante ge, estudiante e, grupo g, practica pa where p.idGrupoEstudiantePC3=ge.idGrupoEstudiante and ge.idEstudianteGE=e.idEstudiante and ge.idGrupoGE=g.idGrupo and g.idPracticaG=pa.idPractica and e.idEstudiante=${idEstudiante} and pa.idPractica=${idPractica} limit 1;`,
        { type: sequelize.QueryTypes.SELECT }
      );
    } else {
      getInfo = await sequelize.query(
        `select p.nombrePC3,group_concat(a.nombreAtributo separator ', ') as atributos from atributo a, producto_atributo_3 pa3, producto_corte_3 p, grupo_estudiante ge, estudiante e, grupo g, practica pa where a.idAtributo=pa3.idAtributoPA3 and pa3.idProductoC3A=p.idProductoC3 and p.idGrupoEstudiantePC3=ge.idGrupoEstudiante and ge.idEstudianteGE=e.idEstudiante and ge.idGrupoGE=g.idGrupo and g.idPracticaG=pa.idPractica and e.idEstudiante=${idEstudiante} and pa.idPractica=${idPractica} group by p.idProductoC3 limit 1;`,
        { type: sequelize.QueryTypes.SELECT }
      );
    }

    const featuresArray = getInfo.map((feature) => {
      const valueWithUnits = `${feature.variablePrincipalC3} ${
        PRODUCT_UNITS[feature.nombrePC3]
      } +- ${feature.toleranciaPC3}`;

      const primaryVariable = VARIABLE_PRIMARIA(feature.nombrePC3);

      return {
        feature: [
          {
            ...(selectedTypeOfSampling.tipoMuestreo === "variable" &&
              feature.variablePrincipalC3 !== null && {
                name: primaryVariable,
                value: valueWithUnits,
              }),
          },
          ,
          {
            ...(selectedTypeOfSampling.tipoMuestreo === "variable" &&
              feature.variableSecundariaC1 !== null &&
              VARIABLE_SECUNDARIA[feature.nombrePC3]),
          },
          {
            ...(feature.atributos && {
              name: "atributos",
              value: feature.atributos,
            }),
          },
        ],
      };
    });

    const features = featuresArray
      .map((value) =>
        value.feature.filter((value) => Object.keys(value).length !== 0)
      )
      .flat();

    res.json({ features });
  } catch (error) {
    console.log(error);
  }
}

export async function updateProductsState(req, res) {
  try {
    const { idEstudiante, idPractica } = req.params;

    const isPracticeExist = Practica.findOne({ where: idPractica });

    if (!isPracticeExist) {
      return res.status(404).json({ msg: "La práctica no existe" });
    }

    const isStudentExist = sequelize.query(
      `
    select e.idEstudiante from estudiante e, grupo_estudiante ge, grupo g, practica pa where e.idEstudiante=ge.idEstudianteGE and ge.idGrupoGE=g.idGrupo and g.idPracticaG=pa.idPractica and pa.idPractica=${idPractica} and e.idEstudiante=${idEstudiante};
    `,
      { type: sequelize.QueryTypes.SELECT }
    );

    if (!isStudentExist) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    const { accepted, rejected } = req.body;
    for (let i = 0; i < accepted.length; i++) {
      await ProductoCorte3.update(
        {
          estado: 1,
        },
        {
          where: { idProductoC3: accepted[i] },
        }
      );
    }

    for (let j = 0; j < rejected.length; j++) {
      await ProductoCorte3.update(
        {
          estado: 0,
        },
        {
          where: { idProductoC3: rejected[j] },
        }
      );
    }

    res.json({ msg: "Datos guardados con éxito" });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error al guardar los datos" });
    console.log(error);
  }
}
