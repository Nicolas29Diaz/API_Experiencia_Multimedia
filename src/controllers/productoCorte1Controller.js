import { sequelize } from "../database/database";
import ProductoCorte1 from "../Models/ProductoCorte1";

export async function createReferenceProductC1(req, res){
  const {nombrePC1, variablePrincipalC1, toleranciaPC1, unidadesPC1,idGrupoEstudiantePC1} = req.body;
  try {
    const referenceProduct = await ProductoCorte1.create({
      nombrePC1,
      variablePrincipalC1,
      toleranciaPC1,
      unidadesPC1,
      idGrupoEstudiantePC1
    },{fields:['nombrePC1','variablePrincipalC1','toleranciaPC1','unidadesPC1','idGrupoEstudiantePC1']});
    console.log(referenceProduct);
    res.json(referenceProduct);
  } catch (error) {
    console.log(error);
  }
}

export async function createInspectionProductC1(req, res){
  const {nombrePC1, variablePrincipalC1, variableSecundariaC1,idGrupoEstudiantePC1} = req.body;
  try {
    const inspectionProduct = await ProductoCorte1.create({
      nombrePC1,
      variablePrincipalC1,
      variableSecundariaC1,
      idGrupoEstudiantePC1
    },{fields:['nombrePC1','variablePrincipalC1','variableSecundariaC1','idGrupoEstudiantePC1']});
    console.log(inspectionProduct);
    res.json(inspectionProduct);
  } catch (error) {
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

export async function getPracticeOneProductInfoPerGroup(req, res){
  const {idPractica, nombreGrupo} = req.params
  try {
    const practiceProductsInfo = await sequelize.query(`select p.nombrePC1,p.variablePrincipalC1,p.toleranciaPC1,p.unidadesPC1 from producto_corte_1 p, grupo_estudiante ge, grupo g, practica pa where p.idGrupoEstudiantePC1=ge.idGrupoEstudiante and ge.idGrupoGE=g.idGrupo and g.idPracticaG=pa.idPractica and pa.idPractica=${idPractica} and g.nombreGrupo='${nombreGrupo}' group by p.nombrePC1;`,{ type: sequelize.QueryTypes.SELECT })
    console.log(practiceProductsInfo);
    res.json(practiceProductsInfo);
  } catch (error) {
    console.log(error)
  }
}

export async function getPracticeOneProductAtributesPerGroup(req, res){
  const {nombreGrupo, idPractica} = req.params
  try {
    const productAtributes = await sequelize.query(`select a.nombreAtributo from atributo a, producto_atributo_1 pra, producto_corte_1 p, grupo_estudiante ge, grupo g, practica pa where a.idAtributo=pra.idAtributoPA1 and pra.idProductoC1A=p.idProductoC1 and p.idGrupoEstudiantePC1=ge.idGrupoEstudiante and ge.idGrupoGE=g.idGrupo and g.idPracticaG=pa.idPractica and g.nombreGrupo='${nombreGrupo}' and pa.idPractica=${idPractica} group by a.nombreAtributo;`,{ type: sequelize.QueryTypes.SELECT })
    console.log(productAtributes);
    res.json(productAtributes);
  } catch (error) {
    console.log(error)
  }
}

export async function getPracticeOneProductPerStudent(req, res){
  const {idEstudiante} = req.params
  try {
    const productsStudent = await sequelize.query(`select p.nombrePC1,p.variablePrincipalC1,p.variableSecundariaC1 from producto_corte_1 p, grupo_estudiante ge, estudiante e where p.idGrupoEstudiantePC1=ge.idGrupoEstudiante and ge.idEstudianteGE=e.idEstudiante and e.idEstudiante=${idEstudiante};`,{ type: sequelize.QueryTypes.SELECT })
    console.log(productsStudent);
    res.json(productsStudent);
  } catch (error) {
    console.log(error)
  }
}

// Parecida a la anterior, pero agrega la informacion de los atributos
export async function getPracticeOneProductInfoPerStudent(req, res){
  const {idEstudiante} = req.params
  try {
    const productsStudent = await sequelize.query(`select p.idProductoC1, p.nombrePC1, p.variablePrincipalC1, p.variableSecundariaC1, a.nombreAtributo from atributo a, producto_atributo_1 pa, producto_corte_1 p, grupo_estudiante ge, estudiante e where a.idAtributo=pa.idAtributoPA1 and pa.idProductoC1A=p.idProductoC1 and p.idGrupoEstudiantePC1=ge.idGrupoEstudiante and ge.idEstudianteGE=e.idEstudiante and e.idEstudiante=${idEstudiante} order by p.idProductoC1;`,{ type: sequelize.QueryTypes.SELECT })
    console.log(productsStudent);
    res.json(productsStudent);
  } catch (error) {
    console.log(error)
  }
}

export async function getPracticeOneProductAtributes(req, res){
  const {idProductoC1} = req.params
  try {
    const productAtributes = await sequelize.query(`select a.nombreAtributo from atributo a, producto_atributo_1 pa, producto_corte_1 p where a.idAtributo=pa.idAtributoPA1 and pa.idProductoC1A=p.idProductoC1 and p.idProductoC1=${idProductoC1};`,{ type: sequelize.QueryTypes.SELECT })
    console.log(productAtributes);
    res.json(productAtributes);
  } catch (error) {
    console.log(error)
  }
}