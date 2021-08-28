import { sequelize } from "../config/database";
import ProductoAtributo2 from "../Models/ProductoAtributo2";
import ProductoCorte2 from "../Models/ProductoCorte2";
import SubgrupoProducto from "../Models/SubgrupoProducto";
import { getRandomAttributes, getRandomMinMax } from "../helpers";
import {
  REFRESCOS,
  BARRA_JABON,
  ATRIBUTOS_CODE,
  VARIABLE,
  ALEATORIO,
  CONSTANTE,
} from "../constants/index";
import { getModels } from "../productModels";

export async function createInspectionProductC2(req, res) {
  try {
    const { idPractica, idEstudiante } = req.params;

    const practiceProductsInfo = await sequelize.query(
      `select p.nombrePC2,p.variablePrincipalC2,p.toleranciaPC2,p.idGrupoEstudiantePC2,group_concat(a.nombreAtributo separator ',') as atributos from atributo a, producto_atributo_2 pa2, producto_corte_2 p, grupo_estudiante ge, estudiante e, grupo g, practica pa where a.idAtributo=pa2.idAtributoPA2 and pa2.idProductoC2A=p.idProductoC2 and p.idGrupoEstudiantePC2=ge.idGrupoEstudiante and ge.idEstudianteGE=e.idEstudiante and ge.idGrupoGE=g.idGrupo and g.idPracticaG=pa.idPractica and pa.idPractica=${idPractica} and e.idEstudiante=${idEstudiante} group by p.idProductoC2 limit 1;`,
      { type: sequelize.QueryTypes.SELECT }
    );

    const getSubgroupsIds = await sequelize.query(
      `select s.idSubgrupo, s.cantidadSubgrupo, s.tipoSubgrupo from subgrupo_producto sp, subgrupo s, producto_corte_2 p, grupo_estudiante ge, estudiante e, grupo g, practica pa where s.idSubgrupo=sp.idSubgrupoSP and sp.idProductoC2SP=p.idProductoC2 and p.idGrupoEstudiantePC2=ge.idGrupoEstudiante and ge.idEstudianteGE=e.idEstudiante and ge.idGrupoGE=g.idGrupo and g.idPracticaG=pa.idPractica and e.idEstudiante=${idEstudiante} and pa.idPractica=${idPractica};`,
      { type: sequelize.QueryTypes.SELECT }
    );

    const {
      nombrePC2,
      variablePrincipalC2,
      toleranciaPC2,
      idGrupoEstudiantePC2,
      atributos,
    } = practiceProductsInfo[0];

    let getRandomTolerancePrincipal = 0;
    let getRandomToleranceSecondary = 0;
    let resultRandomAttributesList = 0;

    let randomItem = 0;

    let inspectionProduct = {};

    let atributosProduct = atributos.split(",");

    let isHasProductName = nombrePC2 === REFRESCOS || nombrePC2 === BARRA_JABON;

    for (let g = 0; g < getSubgroupsIds.length; g++) {
      // Si el tipo subgrupo es aleatorio o constante
      if (
        getSubgroupsIds[g].tipoSubgrupo === ALEATORIO ||
        getSubgroupsIds[g].tipoSubgrupo === CONSTANTE
      ) {
        for (let i = 0; i < getSubgroupsIds[g].cantidadSubgrupo; i++) {
          getRandomTolerancePrincipal = getRandomMinMax(
            -toleranciaPC2,
            toleranciaPC2
          );
          getRandomToleranceSecondary =
            isHasProductName && getRandomMinMax(1, atributosProduct.length);

          randomItem = getRandomMinMax(1, atributosProduct.length);

          resultRandomAttributesList = getRandomAttributes(
            randomItem,
            atributosProduct
          );

          inspectionProduct = await ProductoCorte2.create(
            {
              nombrePC2,
              variablePrincipalC2:
                variablePrincipalC2 + getRandomTolerancePrincipal,
              ...(isHasProductName === BARRA_JABON && {
                variableSecundariaC2: 39 + getRandomToleranceSecondary,
              }),
              ...(isHasProductName && {
                variableSecundariaC2: 15 + getRandomToleranceSecondary,
              }),
              idGrupoEstudiantePC2: idGrupoEstudiantePC2,
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

          for (let j = 0; j < resultRandomAttributesList.length; j++) {
            await ProductoAtributo2.create({
              idAtributoPA2: ATRIBUTOS_CODE[resultRandomAttributesList[j]],
              idProductoC2A: inspectionProduct.dataValues.idProductoC2,
            });
          }

          await SubgrupoProducto.create(
            {
              idProductoC2SP: inspectionProduct.dataValues.idProductoC2,
              idSubgrupoSP: getSubgroupsIds[g].idSubgrupo,
            },
            { fields: ["idProductoC2SP", "idSubgrupoSP"] }
          );
        }
      }
      if (getSubgroupsIds[g].tipoSubgrupo === VARIABLE) {
        // Si el tipo subgrupo es variable
        for (let i = 0; i < getSubgroupsIds[g].cantidadSubgrupo; i++) {
          getRandomTolerancePrincipal = getRandomMinMax(
            -toleranciaPC2,
            toleranciaPC2
          );
          getRandomToleranceSecondary =
            isHasProductName && getRandomMinMax(1, atributosProduct.length);

          resultRandomAttributesList = getRandomAttributes(
            randomItem,
            atributosProduct
          );

          inspectionProduct = await ProductoCorte2.create(
            {
              nombrePC2,
              variablePrincipalC2:
                variablePrincipalC2 + getRandomTolerancePrincipal,
              ...(isHasProductName === BARRA_JABON && {
                variableSecundariaC2: 39 + getRandomToleranceSecondary,
              }),
              ...(isHasProductName && {
                variableSecundariaC2: 15 + getRandomToleranceSecondary,
              }),
              idGrupoEstudiantePC2: idGrupoEstudiantePC2,
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

          await ProductoAtributo2.create({
            idAtributoPA2: ATRIBUTOS_CODE["Ninguno"],
            idProductoC2A: inspectionProduct.dataValues.idProductoC2,
          });

          await SubgrupoProducto.create(
            {
              idProductoC2SP: inspectionProduct.dataValues.idProductoC2,
              idSubgrupoSP: getSubgroupsIds[g].idSubgrupo,
            },
            { fields: ["idProductoC2SP", "idSubgrupoSP"] }
          );
        }
      }
    }

    res.json("Insertados con exito");
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error" });
    console.log(error);
  }
}

export async function getProductInfoPerSubgroupAndStudent(req, res) {
  const { idPractica, idEstudiante } = req.params;
  try {
    const getSubgroupsIds = await sequelize.query(
      `select s.* from subgrupo_producto sp, subgrupo s, producto_corte_2 p, grupo_estudiante ge, estudiante e, grupo g, practica pa where s.idSubgrupo=sp.idSubgrupoSP and sp.idProductoC2SP=p.idProductoC2 and p.idGrupoEstudiantePC2=ge.idGrupoEstudiante and ge.idEstudianteGE=e.idEstudiante and ge.idGrupoGE=g.idGrupo and g.idPracticaG=pa.idPractica and e.idEstudiante=${idEstudiante} and pa.idPractica=${idPractica} group by s.idSubgrupo;`,
      { type: sequelize.QueryTypes.SELECT }
    );

    let AtributoNAleatorio = [];
    let AtributoNConstante = [];
    let AtributoNVariable = [];
    let newSubgroup = {};
    let productsSubgroup = {};

    for (let sp = 0; sp < getSubgroupsIds.length; sp++) {
      const { idSubgrupo, nombreSubgrupo, tipoSubgrupo, cantidadSubgrupo } =
        getSubgroupsIds[sp];

      const product = await sequelize.query(
        `select p.idProductoC2, p.nombrePC2,p.variablePrincipalC2,p.variableSecundariaC2,group_concat(a.nombreAtributo separator ',') as atributos from atributo a, producto_atributo_2 pa2, subgrupo s, subgrupo_producto sp, producto_corte_2 p, grupo_estudiante ge, estudiante e, grupo g, practica pa where a.idAtributo=pa2.idAtributoPA2 and pa2.idProductoC2A=p.idProductoC2 and s.idSubgrupo=sp.idSubgrupoSP and sp.idProductoC2SP=p.idProductoC2 and p.idGrupoEstudiantePC2=ge.idGrupoEstudiante and ge.idEstudianteGE=e.idEstudiante and ge.idGrupoGE=g.idGrupo and g.idPracticaG=pa.idPractica and s.idSubgrupo=${idSubgrupo} and pa.idPractica=${idPractica} and e.idEstudiante=${idEstudiante} group by p.idProductoC2 order by p.idProductoC2 limit ${cantidadSubgrupo} offset 1;`,
        { type: sequelize.QueryTypes.SELECT }
      );

      const mapProduct = product.map(
        ({
          nombrePC2,
          variablePrincipalC2,
          variableSecundariaC2,
          atributos,
        }) => {
          let separateAttributes = atributos.split(",");

          return {
            nombre: nombrePC2,
            variablePrincipal: variablePrincipalC2,
            variableSecundaria: variableSecundariaC2,
            src: getModels(nombrePC2, separateAttributes),
            atributos,
            isChecked: false,
          };
        }
      );

      newSubgroup = {
        id: idSubgrupo,
        title: nombreSubgrupo,
        grupos: mapProduct,
      };

      if (tipoSubgrupo === ALEATORIO) {
        AtributoNAleatorio.push(newSubgroup);
      }

      if (tipoSubgrupo === CONSTANTE) {
        AtributoNConstante.push(newSubgroup);
      }

      if (tipoSubgrupo === VARIABLE) {
        AtributoNVariable.push(newSubgroup);
      }
    }
    productsSubgroup = {
      ...(AtributoNAleatorio.length > 0 && { AtributoNAleatorio }),
      ...(AtributoNConstante.length > 0 && { AtributoNConstante }),
      ...(AtributoNVariable.length > 0 && { AtributoNVariable }),
    };

    res.json(productsSubgroup);
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error" });
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
    res.status(500).json({ msg: "Hubo un error" });
    console.log(error);
  }
}
