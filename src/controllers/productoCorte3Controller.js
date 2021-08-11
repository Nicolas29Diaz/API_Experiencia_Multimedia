import { sequelize } from "../database/database";
import ProductoCorte3 from "../models/ProductoCorte3";

// Crear productos cuando el tipo de muestreo es por atributos
export async function createReferenceProductC3TypeA(req, res){
  const {nombrePC3, tamanioLote, aql, severidad, nivelInspeccion,idGrupoEstudiantePC3} = req.body;
  try {
    const referenceProduct = await ProductoCorte3.create({
      nombrePC3,
      tamanioLote,
      aql,
      severidad,
      nivelInspeccion,
      idGrupoEstudiantePC3
    },{fields:['nombrePC3','tamanioLote','aql','severidad','nivelInspeccion','idGrupoEstudiantePC3']});
    console.log(referenceProduct);
    res.json(referenceProduct);
  } catch (error) {
    console.log(error);
  }
}

export async function createInspectionProductC3TypeA(req, res){
  const {nombrePC3,idGrupoEstudiantePC3} = req.body;
  try {
    const inspectionProduct = await ProductoCorte3.create({
      nombrePC3,
      idGrupoEstudiantePC3
    },{fields:['nombrePC3','idGrupoEstudiantePC3']});
    console.log(inspectionProduct);
    res.json(inspectionProduct);
  } catch (error) {
    console.log(error);
  }
}

// Crear productos cuando el tipo de muestreo es por variables
export async function createReferenceProductC3TypeV(req, res){
  const {nombrePC3, variablePrincipalC3, toleranciaPC3, tamanioLote, aql, severidad, nivelInspeccion,idGrupoEstudiantePC3} = req.body;
  try {
    const referenceProduct = await ProductoCorte3.create({
      nombrePC3,
      variablePrincipalC3,
      toleranciaPC3,
      tamanioLote,
      aql,
      severidad,
      nivelInspeccion,
      idGrupoEstudiantePC3
    },{fields:['nombrePC3','variablePrincipalC3','toleranciaPC3','tamanioLote','aql','severidad','nivelInspeccion','idGrupoEstudiantePC3']});
    console.log(referenceProduct);
    res.json(referenceProduct);
  } catch (error) {
    console.log(error);
  }
}

export async function createInspectionProductC3TypeV(req, res){
  const {nombrePC3, variablePrincipalC3, variableSecundariaC3,idGrupoEstudiantePC3} = req.body;
  try {
    const inspectionProduct = await ProductoCorte3.create({
      nombrePC3,
      variablePrincipalC3,
      variableSecundariaC3,
      idGrupoEstudiantePC3
    },{fields:['nombrePC3','variablePrincipalC3','variableSecundariaC3','idGrupoEstudiantePC3']});
    console.log(inspectionProduct);
    res.json(inspectionProduct);
  } catch (error) {
    console.log(error);
  }
}

// export async function createInspectionProductC3TypeV2(req, res){
//   const {nombrePC3, variablePrincipalC3, idGrupoEstudiantePC3} = req.body;
//   try {
//     const inspectionProduct = await ProductoCorte3.create({
//       nombrePC3,
//       variablePrincipalC3,
//       idGrupoEstudiantePC3
//     },{fields:['nombrePC3','variablePrincipalC3','idGrupoEstudiantePC3']});
//     console.log(inspectionProduct);
//     res.json(inspectionProduct);
//   } catch (error) {
//     console.log(error);
//   }
// }

export async function getAllProductsC3(req, res) {
  try {
    const productosCorte3 = await ProductoCorte3.findAll();
    res.json(productosCorte3);
  } catch (error) {
    console.log(error);
  }
}

export async function getPracticeThreeProductInfoPerGroup(req, res){
  const {nombreGrupo, idPractica} = req.params
  try {
    const practiceProductsInfo = await sequelize.query(`select p.nombrePC3,p.tamanioLote,p.aql,p.severidad,p.nivelInspeccion from producto_corte_3 p, grupo_estudiante ge, grupo g, practica pa where p.idGrupoEstudiantePC3=ge.idGrupoEstudiante and ge.idGrupoGE=g.idGrupo and g.idPracticaG=pa.idPractica and g.nombreGrupo='${nombreGrupo}' and pa.idPractica=${idPractica} group by p.nombrePC3;`,{ type: sequelize.QueryTypes.SELECT })
    console.log(practiceProductsInfo);
    res.json(practiceProductsInfo);
  } catch (error) {
    console.log(error)
  }
}

export async function getPracticeThreeProductAtributesPerGroup(req, res){
  const {nombreGrupo, idPractica} = req.params
  try {
    const productAtributes = await sequelize.query(`select a.nombreAtributo from atributo a, producto_atributo_3 pra, producto_corte_3 p, grupo_estudiante ge, grupo g, practica pa where a.idAtributo=pra.idAtributoPA3 and pra.idProductoC3A=p.idProductoC3 and p.idGrupoEstudiantePC3=ge.idGrupoEstudiante and ge.idGrupoGE=g.idGrupo and g.idPracticaG=pa.idPractica and g.nombreGrupo='${nombreGrupo}' and pa.idPractica=${idPractica} group by a.nombreAtributo;`,{ type: sequelize.QueryTypes.SELECT })
    console.log(productAtributes);
    res.json(productAtributes);
  } catch (error) {
    console.log(error)
  }
}

export async function getPracticeThreeProductPerStudent(req, res){
  const {idEstudiante} = req.params
  try {
    const productsStudent = await sequelize.query(`select p.nombrePC3,p.variablePrincipalC3,p.variableSecundariaC3 from producto_corte_3 p, grupo_estudiante ge, estudiante e where p.idGrupoEstudiantePC3=ge.idGrupoEstudiante and ge.idEstudianteGE=e.idEstudiante and e.idEstudiante=${idEstudiante};`,{ type: sequelize.QueryTypes.SELECT })
    console.log(productsStudent);
    res.json(productsStudent);
  } catch (error) {
    console.log(error)
  }
}

// Parecida a la anterior, pero agrega la informacion de los atributos
export async function getPracticeThreeProductInfoPerStudent(req, res){
  const {idEstudiante} = req.params
  try {
    const productsStudent = await sequelize.query(`select p.idProductoC3, p.nombrePC3, p.variablePrincipalC3, p.variableSecundariaC3, a.nombreAtributo from atributo a, producto_atributo_3 pa, producto_corte_3 p, grupo_estudiante ge, estudiante e where a.idAtributo=pa.idAtributoPA3 and pa.idProductoC3A=p.idProductoC3 and p.idGrupoEstudiantePC3=ge.idGrupoEstudiante and ge.idEstudianteGE=e.idEstudiante and e.idEstudiante=${idEstudiante} order by p.idProductoC3;`,{ type: sequelize.QueryTypes.SELECT })
    console.log(productsStudent);
    res.json(productsStudent);
  } catch (error) {
    console.log(error)
  }
}

export async function getPracticeThreeProductAtributes(req, res){
  const {idProductoC3} = req.params
  try {
    const productAtributes = await sequelize.query(`select a.nombreAtributo from atributo a, producto_atributo_3 pa, producto_corte_3 p where a.idAtributo=pa.idAtributoPA3 and pa.idProductoC3A=p.idProductoC3 and p.idProductoC3=${idProductoC3};`,{ type: sequelize.QueryTypes.SELECT })
    console.log(productAtributes);
    res.json(productAtributes);
  } catch (error) {
    console.log(error)
  }
}