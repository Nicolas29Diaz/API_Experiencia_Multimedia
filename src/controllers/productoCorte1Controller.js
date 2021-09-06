import { sequelize } from "../config/database";
import ProductoCorte1 from "../Models/ProductoCorte1";
import { getRandomMinMax, getRandomAttributes } from "../helpers";
import { REFRESCOS, BARRA_JABON, ATRIBUTOS_CODE } from "../constants/index";
import ProductoAtributo1 from "../Models/ProductoAtributo1";
import { getModels } from "../productModels";
import { getPosterImages } from "../productModels/getPosterImages";

export async function createInspectionProductC1(req, res) {
  try {
    const { idPractica, idEstudiante } = req.params;

    const getStudentProduct = await sequelize.query(
      `select p.nombrePC1, p.variablePrincipalC1, p.toleranciaPC1, p.unidadesPC1, p.idGrupoEstudiantePC1, group_concat(a.nombreAtributo separator ',') as atributos from atributo a, producto_atributo_1 pa1, producto_corte_1 p, grupo_estudiante ge, estudiante e, grupo g, practica pa where a.idAtributo=pa1.idAtributoPA1 and pa1.idProductoC1A=p.idProductoC1 and p.idGrupoEstudiantePC1=ge.idGrupoEstudiante and ge.idEstudianteGE=e.idEstudiante and ge.idGrupoGE=g.idGrupo and g.idPracticaG=pa.idPractica and e.idEstudiante=${idEstudiante} and pa.idPractica=${idPractica} group by p.idProductoC1 limit 1;`,
      { type: sequelize.QueryTypes.SELECT }
    );

    const {
      nombrePC1,
      variablePrincipalC1,
      toleranciaPC1,
      unidadesPC1,
      idGrupoEstudiantePC1,
      atributos,
    } = getStudentProduct[0];

    let getRandomTolerancePrincipal = 0;
    let getRandomToleranceSecondary = 0;
    let resultRandomAttributesList = 0;

    let inspectionProduct = "";

    let atributosProduct = atributos.split(",");
    let randomItem = 0;

    // Número de productos en buen estado
    let normalProductAmount = Math.round(unidadesPC1 * 0.6);
    // Número de productos en mal estado
    let faultyProductAmount = unidadesPC1 - normalProductAmount;

    let isHasProductName = nombrePC1 === REFRESCOS || nombrePC1 === BARRA_JABON;

    // productos en buen estado
    for (let i = 0; i < normalProductAmount; i++) {
      getRandomTolerancePrincipal = getRandomMinMax(
        -toleranciaPC1,
        toleranciaPC1
      );

      randomItem = getRandomMinMax(1, atributosProduct.length);

      getRandomToleranceSecondary = isHasProductName && getRandomMinMax(-2, 2);
      resultRandomAttributesList = getRandomAttributes(
        randomItem,
        atributosProduct
      );

      inspectionProduct = await ProductoCorte1.create(
        {
          nombrePC1,
          variablePrincipalC1:
            variablePrincipalC1 + getRandomTolerancePrincipal,
          ...(isHasProductName === BARRA_JABON && {
            variableSecundariaC1: 39 + getRandomToleranceSecondary,
          }),
          ...(isHasProductName && {
            variableSecundariaC1: 15 + getRandomToleranceSecondary,
          }),
          idGrupoEstudiantePC1,
        },
        {
          fields: [
            "nombrePC1",
            "variablePrincipalC1",
            "variableSecundariaC1",
            "idGrupoEstudiantePC1",
          ],
        }
      );
      await ProductoAtributo1.create({
        idAtributoPA1: ATRIBUTOS_CODE["Ninguno"],
        idProductoC1A: inspectionProduct.dataValues.idProductoC1,
      });
    }

    // productos en mal estado
    for (let i = 0; i < faultyProductAmount; i++) {
      getRandomTolerancePrincipal = getRandomMinMax(
        -toleranciaPC1,
        toleranciaPC1 + 5
      );

      randomItem = getRandomMinMax(1, atributosProduct.length);

      getRandomToleranceSecondary = isHasProductName && getRandomMinMax(-5, 5);
      resultRandomAttributesList = getRandomAttributes(
        randomItem,
        atributosProduct
      );

      inspectionProduct = await ProductoCorte1.create(
        {
          nombrePC1,
          variablePrincipalC1:
            variablePrincipalC1 + getRandomTolerancePrincipal,
          ...(isHasProductName === BARRA_JABON && {
            variableSecundariaC1: 39 + getRandomToleranceSecondary,
          }),
          ...(isHasProductName && {
            variableSecundariaC1: 15 + getRandomToleranceSecondary,
          }),
          idGrupoEstudiantePC1,
        },
        {
          fields: [
            "nombrePC1",
            "variablePrincipalC1",
            "variableSecundariaC1",
            "idGrupoEstudiantePC1",
          ],
        }
      );

      if (resultRandomAttributesList.length > 1) {
        for (let j = 0; j < resultRandomAttributesList.length; j++) {
          await ProductoAtributo1.create({
            idAtributoPA1: ATRIBUTOS_CODE[resultRandomAttributesList[j]],
            idProductoC1A: inspectionProduct.dataValues.idProductoC1,
          });
        }
      } else {
        await ProductoAtributo1.create({
          idAtributoPA1: ATRIBUTOS_CODE[resultRandomAttributesList],
          idProductoC1A: inspectionProduct.dataValues.idProductoC1,
        });
      }
    }

    res.json("Insertados con exito");
  } catch (error) {
    res.status(500).json("Hubo un error");
    console.log(error);
  }
}

export async function getAllProductsC1(req, res) {
  try {
    const productosCorte1 = await ProductoCorte1.findAll();
    res.json(productosCorte1);
  } catch (error) {
    console.log(error);
  }
}

// Se obtienen los productos para la inspección
export async function getPracticeOneProductInfoPerStudent(req, res) {
  const { idEstudiante, idPractica } = req.params;
  try {
    let productsArray = [];

    const getProductsCount = await sequelize.query(
      `select count(p.idProductoC1) as count from producto_corte_1 p, grupo_estudiante ge, estudiante e, grupo g, practica pa where p.idGrupoEstudiantePC1=ge.idGrupoEstudiante and ge.idEstudianteGE=e.idEstudiante and ge.idGrupoGE=g.idGrupo and g.idPracticaG=pa.idPractica and pa.idPractica=${idPractica} and e.idEstudiante=${idEstudiante};`,
      { type: sequelize.QueryTypes.SELECT }
    );

    const [getValue] = getProductsCount;
    const count = getValue.count;
    const productsStudent = await sequelize.query(
      `select p.idProductoC1, p.nombrePC1, p.variablePrincipalC1, p.variableSecundariaC1, group_concat(a.nombreAtributo separator ',') as atributos
      from atributo a, producto_atributo_1 pa1, producto_corte_1 p, grupo_estudiante ge, estudiante e, grupo g, practica pa
      where a.idAtributo=pa1.idAtributoPA1 and pa1.idProductoC1A=p.idProductoC1 and
      p.idGrupoEstudiantePC1=ge.idGrupoEstudiante and ge.idEstudianteGE=e.idEstudiante and
      ge.idGrupoGE=g.idGrupo and g.idPracticaG=pa.idPractica and
      e.idEstudiante=${idEstudiante} and pa.idPractica=${idPractica} group by p.idProductoC1 limit ${count} offset 1;`,
      { type: sequelize.QueryTypes.SELECT }
    );

    const products = productsStudent.map(
      ({
        idProductoC1,
        nombrePC1,
        variablePrincipalC1,
        variableSecundariaC1,
        atributos,
      }) => {
        let separateAttributes = atributos.split(",");
        return {
          id: idProductoC1,
          nombre: nombrePC1,
          variablePrincipal: variablePrincipalC1,
          variableSecundaria: variableSecundariaC1,
          src: getModels(nombrePC1, separateAttributes),
          atributos,
        };
      }
    );

    const [actualProduct] = productsStudent;

    let getImage = getPosterImages(actualProduct.nombrePC1);

    productsArray.push({ poster: getImage, products });

    res.json({ productsArray });
  } catch (error) {
    console.log(error);
  }
}
