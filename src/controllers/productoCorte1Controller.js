import { sequelize } from "../config/database";
import ProductoCorte1 from "../Models/ProductoCorte1";
import { getRandomMinMax, getRandomAttributes } from "../helpers";
import { REFRESCOS, BARRA_JABON, ATRIBUTOS_CODE } from "../constants/index";
import ProductoAtributo1 from "../Models/ProductoAtributo1";
import { getModels } from "../productModels";

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

export async function getOneProductC1(req, res) {
  try {
    const { idProductoC1 } = req.params;
    const productoCorte1 = await ProductoCorte1.findOne({
      where: {
        idProductoC1,
      },
    });
    res.json(productoCorte1);
  } catch (error) {
    console.log(error);
  }
}

export async function getPracticeOneProductInfoPerGroup(req, res) {
  const { idPractica, nombreGrupo } = req.params;
  try {
    const practiceProductsInfo = await sequelize.query({
      type: sequelize.QueryTypes.SELECT,
    });
    res.json(practiceProductsInfo);
  } catch (error) {
    console.log(error);
  }
}

export async function getPracticeOneProductAtributesPerGroup(req, res) {
  const { nombreGrupo, idPractica } = req.params;
  try {
    const productAtributes = await sequelize.query(
      `select a.nombreAtributo from atributo a, producto_atributo_1 pra, producto_corte_1 p, grupo_estudiante ge, grupo g, practica pa where a.idAtributo=pra.idAtributoPA1 and pra.idProductoC1A=p.idProductoC1 and p.idGrupoEstudiantePC1=ge.idGrupoEstudiante and ge.idGrupoGE=g.idGrupo and g.idPracticaG=pa.idPractica and g.nombreGrupo='${nombreGrupo}' and pa.idPractica=${idPractica} group by a.nombreAtributo;`,
      { type: sequelize.QueryTypes.SELECT }
    );
    res.json(productAtributes);
  } catch (error) {
    console.log(error);
  }
}

export async function getPracticeOneProductPerStudent(req, res) {
  const { idEstudiante } = req.params;
  try {
    const productsStudent = await sequelize.query(
      `select p.nombrePC1,p.variablePrincipalC1,p.variableSecundariaC1 from producto_corte_1 p, grupo_estudiante ge, estudiante e where p.idGrupoEstudiantePC1=ge.idGrupoEstudiante and ge.idEstudianteGE=e.idEstudiante and e.idEstudiante=${idEstudiante};`,
      { type: sequelize.QueryTypes.SELECT }
    );
    console.log(productsStudent);
    res.json(productsStudent);
  } catch (error) {
    console.log(error);
  }
}

// Se obtienen los productos para la inspección
export async function getPracticeOneProductInfoPerStudent(req, res) {
  const { idEstudiante } = req.params;
  try {
    const productsStudent = await sequelize.query(
      `select p.idProductoC1, p.nombrePC1,p.variablePrincipalC1,p.variableSecundariaC1 from producto_corte_1 p, grupo_estudiante ge, estudiante e where p.idGrupoEstudiantePC1=ge.idGrupoEstudiante and ge.idEstudianteGE=e.idEstudiante and e.idEstudiante=${idEstudiante};`,
      { type: sequelize.QueryTypes.SELECT }
    );

    // const productsStudent = await sequelize.query(
    //   `select p.idProductoC1, p.nombrePC1, p.variablePrincipalC1, p.variableSecundariaC1, group_concat(a.nombreAtributo separator ',') as atributos from atributo a, producto_atributo_1 pa1, producto_corte_1 p, grupo_estudiante ge, estudiante e, grupo g, practica pa where a.idAtributo=pa1.idAtributoPA1 and pa1.idProductoC1A=p.idProductoC1 and p.idGrupoEstudiantePC1=ge.idGrupoEstudiante and ge.idEstudianteGE=e.idEstudiante and ge.idGrupoGE=g.idGrupo and g.idPracticaG=pa.idPractica and e.idEstudiante=${idEstudiante} and pa.idPractica=${idPractica} group by p.idProductoC1;`,
    //   { type: sequelize.QueryTypes.SELECT }
    // );

    const mapProduct = productsStudent.map(
      ({ nombrePC1, variablePrincipalC1, variableSecundariaC1, atributos }) => {
        let separateAttributes = atributos.split(",");

        return {
          nombre: nombrePC1,
          variablePrincipal: variablePrincipalC1,
          variableSecundaria: variableSecundariaC1,
          src: getModels(nombrePC1, separateAttributes),
          atributos,
        };
      }
    );

    // let productAtributes = [];

    // let newProduct = {};

    // const productMap = await Promise.all(
    //   productsStudent.map(async (p) => {
    //     productAtributes = await sequelize.query(
    //       `select a.nombreAtributo as atributo from atributo a, producto_atributo_1 pa, producto_corte_1 p where a.idAtributo=pa.idAtributoPA1 and pa.idProductoC1A=p.idProductoC1 and p.idProductoC1=${p.idProductoC1};`,
    //       { type: sequelize.QueryTypes.SELECT }
    //     );

    //     let mapAttributes = productAtributes.map(({ atributo }) => atributo);

    //     newProduct = {
    //       idProductoC1: p.idProductoC1,
    //       nombrePC1: p.nombrePC1,
    //       variablePrincipalC1: p.variablePrincipalC1,
    //       variableSecundariaC1: p.variableSecundariaC1,
    //       src: getModels(p.nombrePC1, mapAttributes),
    //     };

    //     return newProduct;
    //   })
    // );

    res.json(productMap);
  } catch (error) {
    console.log(error);
  }
}

export async function getPracticeOneProductAtributes(req, res) {
  const { idProductoC1 } = req.params;
  try {
    const productAtributes = await sequelize.query(
      `select a.nombreAtributo from atributo a, producto_atributo_1 pa, producto_corte_1 p where a.idAtributo=pa.idAtributoPA1 and pa.idProductoC1A=p.idProductoC1 and p.idProductoC1=${idProductoC1};`,
      { type: sequelize.QueryTypes.SELECT }
    );

    res.json(productAtributes);
  } catch (error) {
    console.log(error);
  }
}
