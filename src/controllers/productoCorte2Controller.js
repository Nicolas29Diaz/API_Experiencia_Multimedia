import { sequelize } from "../database/database";
import ProductoAtributo2 from "../Models/ProductoAtributo2";
import ProductoCorte2 from "../Models/ProductoCorte2";
import SubgrupoProducto from "../Models/SubgrupoProducto";
import { getRandomAttributes, getRandomMinMax } from "../helpers";
import { REFRESCOS, BARRA_JABON, ATRIBUTOS_CODE } from "../constants/index";

export async function createInspectionProductC2(req, res) {
  try {
    const { idPractica, idEstudiante } = req.params;
    const practiceProductsInfo = await sequelize.query(
      `select p.nombrePC2, count(s.idSubgrupo) as subgrupos ,s.cantidadSubgrupo,p.variablePrincipalC2,p.toleranciaPC2,p.idGrupoEstudiantePC2 from subgrupo s, subgrupo_producto sp, producto_corte_2 p, grupo_estudiante ge, estudiante e, grupo g, practica pa where s.idSubgrupo=sp.idSubgrupoSP and sp.idProductoC2SP=p.idProductoC2 and p.idGrupoEstudiantePC2=ge.idGrupoEstudiante and ge.idEstudianteGE=e.idEstudiante and ge.idGrupoGE=g.idGrupo and g.idPracticaG=pa.idPractica and e.idEstudiante='${idEstudiante}' and pa.idPractica=${idPractica};`,
      { type: sequelize.QueryTypes.SELECT }
    );

    const getProductAttributes = await sequelize.query(
      `select a.nombreAtributo as atributo from atributo a, producto_atributo_2 pra, producto_corte_2 p, grupo_estudiante ge, estudiante e, grupo g, practica pa where a.idAtributo=pra.idAtributoPA2 and pra.idProductoC2A=p.idProductoC2 and p.idGrupoEstudiantePC2=ge.idGrupoEstudiante and ge.idEstudianteGE=e.idEstudiante and ge.idGrupoGE=g.idGrupo and g.idPracticaG=pa.idPractica and e.idEstudiante='${idEstudiante}' and pa.idPractica=${idPractica};`,
      { type: sequelize.QueryTypes.SELECT }
    );

    const getSubgroupsIds = await sequelize.query(
      `select s.idSubgrupo from subgrupo_producto sp, subgrupo s, producto_corte_2 p, grupo_estudiante ge, estudiante e, grupo g, practica pa where s.idSubgrupo=sp.idSubgrupoSP and sp.idProductoC2SP=p.idProductoC2 and p.idGrupoEstudiantePC2=ge.idGrupoEstudiante and ge.idEstudianteGE=e.idEstudiante and ge.idGrupoGE=g.idGrupo and g.idPracticaG=pa.idPractica and e.idEstudiante=${idEstudiante} and pa.idPractica=${idPractica};`,
      { type: sequelize.QueryTypes.SELECT }
    );

    const {
      nombrePC2,
      subgrupos,
      cantidadSubgrupo,
      variablePrincipalC2,
      toleranciaPC2,
      idGrupoEstudiantePC2,
    } = practiceProductsInfo[0];

    let getRandomTolerancePrincipal = 0;
    let getRandomToleranceSecondary = 0;
    let resultRandomAttributesList = 0;

    let inspectionProduct = "";
    let newProduct = {};

    let atributos = getProductAttributes.map((product) => product.atributo);
    let randomItem = getRandomMinMax(1, atributos.length);

    // Número total de productos
    let totalProductAmount = cantidadSubgrupo * subgrupos;

    // Número de productos en buen estado
    let normalProductAmount = Math.round(totalProductAmount * 0.6);
    // Número de productos en mal estado
    let faultyProductAmount = totalProductAmount - normalProductAmount;

    let isHasProductName = nombrePC2 === REFRESCOS || nombrePC2 === BARRA_JABON;

    // En Buen estado
    for (let index = 0; index < normalProductAmount; index++) {
      getRandomTolerancePrincipal = getRandomMinMax(
        -toleranciaPC2,
        toleranciaPC2
      );

      getRandomToleranceSecondary = isHasProductName && getRandomMinMax(-2, 2);
      resultRandomAttributesList = getRandomAttributes(randomItem, atributos);

      newProduct = {
        nombrePC2,
        variablePrincipalC2: variablePrincipalC2 + getRandomTolerancePrincipal,
        ...(isHasProductName === BARRA_JABON && {
          variableSecundariaC2: 39 + getRandomToleranceSecondary,
        }),
        ...(isHasProductName && {
          variableSecundariaC2: 15 + getRandomToleranceSecondary,
        }),
        idGrupoEstudiantePC2,
      };

      inspectionProduct = await ProductoCorte2.create(
        {
          ...newProduct,
        },
        {
          fields: [
            "nombrePC2",
            "variablePrincipalC2",
            "variableSecundariaC2",
            "idGrupoEstudiantePC2",
          ],
        }
      );

      // Revisar
      // localhost:4000/api/producto/corte2/inspeccion/40/estudiante/216
      for (let subID = 0; subID < getSubgroupsIds.length; subID++) {
        for (let a = 0; a < normalProductAmount; a++) {
          await SubgrupoProducto.create(
            {
              idProductoC2SP: inspectionProduct.dataValues.idProductoC2,
              idSubgrupoSP: getSubgroupsIds[subID].idSubgrupo,
            },
            { fields: ["idProductoC2SP", "idSubgrupoSP"] }
          );
        }
      }
      await ProductoAtributo2.create({
        idAtributoPA2: ATRIBUTOS_CODE["Ninguno"],
        idProductoC2A: inspectionProduct.dataValues.idProductoC2,
      });
    }

    // mal estado
    for (let index = 0; index < faultyProductAmount; index++) {
      getRandomTolerancePrincipal = getRandomMinMax(
        -toleranciaPC2,
        toleranciaPC2
      );

      getRandomToleranceSecondary = isHasProductName && getRandomMinMax(-5, 5);
      resultRandomAttributesList = getRandomAttributes(randomItem, atributos);

      newProduct = {
        nombrePC2,
        variablePrincipalC2: variablePrincipalC2 + getRandomTolerancePrincipal,
        ...(isHasProductName === BARRA_JABON && {
          variableSecundariaC2: 39 + getRandomToleranceSecondary,
        }),
        ...(isHasProductName && {
          variableSecundariaC2: 15 + getRandomToleranceSecondary,
        }),
        idGrupoEstudiantePC2,
      };

      inspectionProduct = await ProductoCorte2.create(
        {
          ...newProduct,
        },
        {
          fields: [
            "nombrePC2",
            "variablePrincipalC2",
            "variableSecundariaC2",
            "idGrupoEstudiantePC2",
          ],
        }
      );

      for (let subID = 0; subID < getSubgroupsIds.length; subID++) {
        for (let a = 0; a < faultyProductAmount; a++) {
          await SubgrupoProducto.create(
            {
              idProductoC2SP: inspectionProduct.dataValues.idProductoC2,
              idSubgrupoSP: getSubgroupsIds[subID].idSubgrupo,
            },
            { fields: ["idProductoC2SP", "idSubgrupoSP"] }
          );
        }
      }
      if (resultRandomAttributesList.length > 1) {
        for (let j = 0; j < resultRandomAttributesList.length; j++) {
          await ProductoAtributo2.create({
            idAtributoPA2: ATRIBUTOS_CODE[resultRandomAttributesList[j]],
            idProductoC2A: inspectionProduct.dataValues.idProductoC2,
          });
        }
      } else {
        await ProductoAtributo2.create({
          idAtributoPA2: ATRIBUTOS_CODE[resultRandomAttributesList],
          idProductoC2A: inspectionProduct.dataValues.idProductoC2,
        });
      }
    }

    res.json("Insertados con exito");
  } catch (error) {
    console.log(error);
  }
}

export async function getAllProductsC2(req, res) {
  try {
    const productosCorte2 = await ProductoCorte2.findAll();
    res.json(productosCorte2);
  } catch (error) {
    console.log(error);
  }
}

export async function getOneProductC2(req, res) {
  try {
    const { idProductoC2 } = req.params;
    const productoCorte2 = await ProductoCorte2.findOne({
      where: {
        idProductoC2,
      },
    });
    res.json(productoCorte2);
  } catch (error) {
    console.log(error);
  }
}

export async function getPracticeTwoProductInfoPerGroup(req, res) {
  const { nombreGrupo, idPractica } = req.params;
  try {
    const practiceProductsInfo = await sequelize.query(
      `select p.nombrePC2, count(s.idSubgrupo),s.cantidadSubgrupo,p.variablePrincipalC2,p.toleranciaPC2 from subgrupo s, subgrupo_producto sp, producto_corte_2 p, grupo_estudiante ge, grupo g, practica pa where s.idSubgrupo=sp.idSubgrupoSP and sp.idProductoC2SP=p.idProductoC2 and p.idGrupoEstudiantePC2=ge.idGrupoEstudiante and ge.idGrupoGE=g.idGrupo and g.idPracticaG=pa.idPractica and g.nombreGrupo='${nombreGrupo}' and pa.idPractica=${idPractica};`,
      { type: sequelize.QueryTypes.SELECT }
    );
    console.log(practiceProductsInfo);
    res.json(practiceProductsInfo);
  } catch (error) {
    console.log(error);
  }
}

export async function getPracticeTwoProductAtributesPerGroup(req, res) {
  const { nombreGrupo, idPractica } = req.params;
  try {
    const productAtributes = await sequelize.query(
      `select a.nombreAtributo from atributo a, producto_atributo_2 pra, producto_corte_2 p, grupo_estudiante ge, grupo g, practica pa where a.idAtributo=pra.idAtributoPA2 and pra.idProductoC2A=p.idProductoC2 and p.idGrupoEstudiantePC2=ge.idGrupoEstudiante and ge.idGrupoGE=g.idGrupo and g.idPracticaG=pa.idPractica and g.nombreGrupo='${nombreGrupo}' and pa.idPractica=${idPractica} group by a.nombreAtributo;`,
      { type: sequelize.QueryTypes.SELECT }
    );
    console.log(productAtributes);
    res.json(productAtributes);
  } catch (error) {
    console.log(error);
  }
}

export async function getProductInfoPerSubgroupAndStudent(req, res) {
  const { idPractica, idEstudiante, nombreSubgrupo } = req.params;
  try {
    const productInfoPerSubgroupAndStudent = await sequelize.query(
      `select p.nombrePC2,p.variablePrincipalC2,p.variableSecundariaC2 from subgrupo s, subgrupo_producto sp, producto_corte_2 p, grupo_estudiante ge, estudiante e, grupo g, practica pa where s.idSubgrupo=sp.idSubgrupoSP and sp.idProductoC2SP=p.idProductoC2 and p.idGrupoEstudiantePC2=ge.idGrupoEstudiante and ge.idEstudianteGE=e.idEstudiante and ge.idGrupoGE=g.idGrupo and g.idPracticaG=pa.idPractica and pa.idPractica=${idPractica} and s.nombreSubgrupo='${nombreSubgrupo}' and e.idEstudiante=${idEstudiante};`,
      { type: sequelize.QueryTypes.SELECT }
    );
    console.log(productInfoPerSubgroupAndStudent);
    res.json(productInfoPerSubgroupAndStudent);
  } catch (error) {
    console.log(error);
  }
}

export async function getPracticeTwoProductAtributes(req, res) {
  const { idProductoC2 } = req.params;
  try {
    const productAtributes = await sequelize.query(
      `select a.nombreAtributo from atributo a, producto_atributo_2 pa, producto_corte_2 p where a.idAtributo=pa.idAtributoPA2 and pa.idProductoC2A=p.idProductoC2 and p.idProductoC2=${idProductoC2};`,
      { type: sequelize.QueryTypes.SELECT }
    );
    console.log(productAtributes);
    res.json(productAtributes);
  } catch (error) {
    console.log(error);
  }
}
