import { sequelize } from "../config/database";
import ProductoAtributo3 from "../models/ProductoAtributo3";
import ProductoCorte3 from "../models/ProductoCorte3";
import { getRandomAttributes, getRandomMinMax } from "../helpers";
import { ATRIBUTOS_CODE, BARRA_JABON, REFRESCOS } from "../constants";
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

// Conseguir datos de la practica
export async function getPracticeThreeProductPerStudent(req, res) {
  const { idEstudiante, idPractica } = req.params;
  try {
    // const samplingType = await sequelize.query(
    //   ` select p.* from producto_corte_3 p, grupo_estudiante ge, estudiante e, grupo g, practica pa where p.idGrupoEstudiantePC3=ge.idGrupoEstudiante and ge.idEstudianteGE=e.idEstudiante and ge.idGrupoGE=g.idGrupo and g.idPracticaG=pa.idPractica and p.variablePrincipalC3 is not null and e.idEstudiante=${idEstudiante} and pa.idPractica=${idPractica} limit 1;`,
    //   { type: sequelize.QueryTypes.SELECT }
    // );
    const samplingType = await sequelize.query(
      `select p.tipoMuestreo from producto_corte_3 p, grupo_estudiante ge, estudiante e, grupo g, practica pa where p.idGrupoEstudiantePC3=ge.idGrupoEstudiante and ge.idEstudianteGE=e.idEstudiante and ge.idGrupoGE=g.idGrupo and g.idPracticaG=pa.idPractica and e.idEstudiante=${idEstudiante} and pa.idPractica=${idPractica};`,
      { type: sequelize.QueryTypes.SELECT }
    );

    let productsStudent = "";

    if (samplingType === "variable") {
      productsStudent = await sequelize.query(
        `select p.tipoMuestreo, p.idGrupoEstudiantePC3, p.nombrePC3, p.variablePrincipalC3,p.toleranciaPC3,p.tamanioLote,p.aql,p.severidad,p.nivelInspeccion,group_concat(m.nombreMetodo separator ',') as metodos from metodo m, metodo_producto mp, producto_corte_3 p, grupo_estudiante ge, estudiante e, grupo g, practica pa where m.idMetodo=mp.idMetodoMP and mp.idProductoMP=p.idProductoC3 and p.idGrupoEstudiantePC3=ge.idGrupoEstudiante and ge.idEstudianteGE=e.idEstudiante and ge.idGrupoGE=g.idGrupo and g.idPracticaG=pa.idPractica and e.idEstudiante=${idEstudiante} and pa.idPractica=${idPractica} group by p.nombrePC3 limit 1;`,
        { type: sequelize.QueryTypes.SELECT }
      );
    } else {
      productsStudent = await sequelize.query(
        `select p.tipoMuestreo, p.idGrupoEstudiantePC3, p.nombrePC3,p.tamanioLote,p.aql,p.severidad,p.nivelInspeccion,group_concat(a.nombreAtributo separator ',') as atributos from atributo a, producto_atributo_3 pa3, producto_corte_3 p, grupo_estudiante ge, estudiante e, grupo g, practica pa where a.idAtributo=pa3.idAtributoPA3 and pa3.idProductoC3A=p.idProductoC3 and p.idGrupoEstudiantePC3=ge.idGrupoEstudiante and ge.idEstudianteGE=e.idEstudiante and ge.idGrupoGE=g.idGrupo and g.idPracticaG=pa.idPractica and e.idEstudiante=${idEstudiante} and pa.idPractica=${idPractica} group by p.nombrePC3 limit 1;`,
        { type: sequelize.QueryTypes.SELECT }
      );
    }

    res.json(productsStudent);
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

    if (variablePrincipalC3) {
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
    } else {
      for (let i = 0; i < tamanioMuestra; i++) {
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
            idAtributoPA3: ATRIBUTOS_CODE[resultRandomAttributesList[j]],
            idProductoC3A: inspectionProduct.dataValues.idProductoC3,
          });
        }
      }
    }
    res.json({ msg: "Creado con éxito" });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error" });
    console.log(error);
  }
}

// Se obtienen los productos para la inspección
export async function getPracticeThreeProductInfoPerStudent(req, res) {
  const { idEstudiante, idPractica } = req.params;
  try {
    const productsStudent = await sequelize.query(
      `select p.idProductoC3, p.nombrePC3, p.variablePrincipalC3, p.variableSecundariaC3, group_concat(a.nombreAtributo separator ',') as atributos from atributo a, producto_atributo_3 pa3, producto_corte_3 p, grupo_estudiante ge, estudiante e, grupo g, practica pa where a.idAtributo=pa3.idAtributoPA3 and pa3.idProductoC3A=p.idProductoC3 and p.idGrupoEstudiantePC3=ge.idGrupoEstudiante and ge.idEstudianteGE=e.idEstudiante and ge.idGrupoGE=g.idGrupo and g.idPracticaG=pa.idPractica and e.idEstudiante=${idEstudiante} and pa.idPractica=${idPractica} group by p.idProductoC3;`,
      { type: sequelize.QueryTypes.SELECT }
    );

    const mapProduct = productsStudent.map(
      ({
        idProductoC3,
        nombrePC3,
        variablePrincipalC3,
        variableSecundariaC3,
        atributos,
      }) => {
        let separateAttributes = atributos.split(",");

        return {
          id: idProductoC3,
          nombre: nombrePC3,
          ...(variablePrincipalC3 !== null && {
            variablePrincipal: variablePrincipalC3,
          }),
          ...(variableSecundariaC3 !== null && {
            variableSecundaria: variableSecundariaC3,
          }),
          src: getModels(nombrePC3, separateAttributes),
          atributos,
        };
      }
    );
    let [actualProduct] = mapProduct;
    let image = actualProduct.nombre;
    let getImage = getPosterImages(image);

    res.json({ poster: getImage, mapProduct });
  } catch (error) {
    console.log(error);
  }
}
