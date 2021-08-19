import { sequelize } from "../database/database";
import { getRandomMinMax } from "../helpers";
import ProductoCorte1 from "../Models/ProductoCorte1";

import { refrescoModels } from "../productModels/refrescoModels";
import { bolsaArrozModels } from "../productModels/bolsaArrozModels";
import { barraChocolateModels } from "../productModels/barraChocolateModels";
import { barraJabonModels } from "../productModels/barraJabonModels";
import { pitillosModels } from "../productModels/pitillosModels";

export async function createInspectionProductC1(req, res) {
  const { idPractica, idEstudiante } = req.params;
  const getStudentProduct = await sequelize.query(
    `select p.nombrePC1,p.variablePrincipalC1,p.toleranciaPC1,p.unidadesPC1 from producto_corte_1 p, grupo_estudiante ge, estudiante e, grupo g, practica pa where p.idGrupoEstudiantePC1=ge.idGrupoEstudiante and ge.idEstudianteGE=e.idEstudiante and ge.idGrupoGE=g.idGrupo and g.idPracticaG=pa.idPractica and pa.idPractica=${idPractica} and e.idEstudiante='${idEstudiante}';`,
    { type: sequelize.QueryTypes.SELECT }
  );
  const productAtributes = await sequelize.query(
    `select a.nombreAtributo as atributo from atributo a, producto_atributo_1 pra, producto_corte_1 p, grupo_estudiante ge, estudiante e, grupo g, practica pa where a.idAtributo=pra.idAtributoPA1 and pra.idProductoC1A=p.idProductoC1 and p.idGrupoEstudiantePC1=ge.idGrupoEstudiante and ge.idEstudianteGE=e.idEstudiante and ge.idGrupoGE=g.idGrupo and g.idPracticaG=pa.idPractica and e.idEstudiante='${idEstudiante}' and pa.idPractica=${idPractica};`,
    { type: sequelize.QueryTypes.SELECT }
  );

  const { nombrePC1, variablePrincipalC1, toleranciaPC1, unidadesPC1 } =
    getStudentProduct[0];

  let atributos = productAtributes.map((product) => product);

  console.log(atributos.length);

  function getRandomAttributes(random, atributos) {
    if (atributos.length === 2) {
      const primervalor = atributos[0];
      const segundovalor = atributos[1];

      if (random === 1) {
        return primervalor;
      }
      if (random === 2) {
        return {
          ...primervalor,
          ...segundovalor,
        };
      }
    }
  }

  const nameProducts = {
    Refrescos: refrescoModels(atributos),
    "Bolsa de arroz": "",
    "Barra de chocolate": "",
    "Barra de jabon": "",
    Pitillos: "",
  };

  let SELECTEDPRODUCT = nameProducts[nombrePC1];

  let productsArray = [];
  let productsBad = [];

  let normalProductAmount = Math.round(unidadesPC1 * 0.6);

  let faultyProductAmonut = unidadesPC1 - normalProductAmount;

  for (let i = 0; i < normalProductAmount; i++) {
    let getRandomTolerance = getRandomMinMax(-toleranciaPC1, toleranciaPC1);

    let newProduct1 = {
      nombrePC1,
      variablePrincipalC1: variablePrincipalC1 + getRandomTolerance,
      src: SELECTEDPRODUCT,
      atributos,
    };

    productsArray.push(newProduct1);

    for (let index = 0; index < faultyProductAmonut; index++) {
      let getRandomTolerance2 = getRandomMinMax(-toleranciaPC1, toleranciaPC1);

      let newProduct2 = {
        nombrePC1,
        variablePrincipalC1: variablePrincipalC1 + getRandomTolerance2,
        src: SELECTEDPRODUCT,
        atributos,
      };

      productsBad.push(newProduct2);
    }
  }

  let allArray = {
    productsArray,
    productsBad,
  };

  // // Crear productos en buen estado
  // for (let i = 0; i < normalProductAmount; i++) {
  //   if (nombrePC1 === "Refresco" || nombrePC1 === "Barra de jabon") {
  //     let newProduct = {
  //       nombrePC1,
  //       variablePrincipalC1,
  //       variableSecundariaC1,
  //     };
  //   } else {
  //     let newProduct = {
  //       nombrePC1,
  //       variablePrincipalC1,
  //     };
  //   }
  // }

  // // Crear productos en mal estado
  // for (let i = 0; i < faultyProductAmonut; i++) {
  //   if (nombrePC1 === "Refresco" || nombrePC1 === "Barra de jabon") {
  //     let newProduct = {
  //       nombrePC1,
  //       variablePrincipalC1,
  //       variableSecundariaC1,
  //       atributos,
  //     };
  //   } else {
  //     let newProduct = {
  //       nombrePC1,
  //       variablePrincipalC1,
  //       atributos,
  //     };
  //   }
  // }

  res.json(allArray);
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

// Parecida a la anterior, pero agrega la informacion de los atributos
export async function getPracticeOneProductInfoPerStudent(req, res) {
  const { idEstudiante } = req.params;
  try {
    const productsStudent = await sequelize.query(
      `select p.idProductoC1, p.nombrePC1, p.variablePrincipalC1, p.variableSecundariaC1, a.nombreAtributo from atributo a, producto_atributo_1 pa, producto_corte_1 p, grupo_estudiante ge, estudiante e where a.idAtributo=pa.idAtributoPA1 and pa.idProductoC1A=p.idProductoC1 and p.idGrupoEstudiantePC1=ge.idGrupoEstudiante and ge.idEstudianteGE=e.idEstudiante and e.idEstudiante=${idEstudiante} order by p.idProductoC1;`,
      { type: sequelize.QueryTypes.SELECT }
    );
    console.log(productsStudent);
    res.json(productsStudent);
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
    console.log(productAtributes);
    res.json(productAtributes);
  } catch (error) {
    console.log(error);
  }
}
