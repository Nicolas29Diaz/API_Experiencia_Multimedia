import { sequelize } from "../database/database";
import ProductoCorte2 from "../Models/ProductoCorte2";

export async function createReferenceProductC2(req, res){
  const {nombrePC2, variablePrincipalC2, toleranciaPC2, idGrupoEstudiantePC2} = req.body;
  try {
    const referenceProduct = await ProductoCorte2.create({
      nombrePC2,
      variablePrincipalC2,
      toleranciaPC2,
      idGrupoEstudiantePC2
    },{fields:['nombrePC2','variablePrincipalC2','toleranciaPC2','idGrupoEstudiantePC2']});
    console.log(referenceProduct);
    res.json(referenceProduct);
  } catch (error) {
    console.log(error);
  }
}

export async function createInspectionProductC2(req, res){
  const {nombrePC2, variablePrincipalC2, variableSecundariaC2,idGrupoEstudiantePC2} = req.body;
  try {
    const inspectionProduct = await ProductoCorte2.create({
      nombrePC2,
      variablePrincipalC2,
      variableSecundariaC2,
      idGrupoEstudiantePC2
    },{fields:['nombrePC2','variablePrincipalC2','variableSecundariaC2','idGrupoEstudiantePC2']});
    console.log(inspectionProduct);
    res.json(inspectionProduct);
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

export async function getPracticeTwoProductInfoPerGroup(req, res){
  const {nombreGrupo, idPractica} = req.params
  try {
    const practiceProductsInfo = await sequelize.query(`select p.nombrePC2, count(s.idSubgrupo),s.cantidadSubgrupo,p.variablePrincipalC2,p.toleranciaPC2 from subgrupo s, subgrupo_producto sp, producto_corte_2 p, grupo_estudiante ge, grupo g, practica pa where s.idSubgrupo=sp.idSubgrupoSP and sp.idProductoC2SP=p.idProductoC2 and p.idGrupoEstudiantePC2=ge.idGrupoEstudiante and ge.idGrupoGE=g.idGrupo and g.idPracticaG=pa.idPractica and g.nombreGrupo='${nombreGrupo}' and pa.idPractica=${idPractica};`,{ type: sequelize.QueryTypes.SELECT })
    console.log(practiceProductsInfo);
    res.json(practiceProductsInfo);
  } catch (error) {
    console.log(error)
  }
}

export async function getPracticeTwoProductAtributesPerGroup(req, res){
  const {nombreGrupo, idPractica} = req.params;
  try {
    const productAtributes = await sequelize.query(`select a.nombreAtributo from atributo a, producto_atributo_2 pra, producto_corte_2 p, grupo_estudiante ge, grupo g, practica pa where a.idAtributo=pra.idAtributoPA2 and pra.idProductoC2A=p.idProductoC2 and p.idGrupoEstudiantePC2=ge.idGrupoEstudiante and ge.idGrupoGE=g.idGrupo and g.idPracticaG=pa.idPractica and g.nombreGrupo='${nombreGrupo}' and pa.idPractica=${idPractica} group by a.nombreAtributo;`,{ type: sequelize.QueryTypes.SELECT })
    console.log(productAtributes);
    res.json(productAtributes);
  } catch (error) {
    console.log(error)
  }
}

export async function getProductInfoPerSubgroupAndStudent(req, res){
  const {idPractica, idEstudiante, nombreSubgrupo} = req.params;
  try {
    const productInfoPerSubgroupAndStudent = await sequelize.query(`select p.nombrePC2,p.variablePrincipalC2,p.variableSecundariaC2 from subgrupo s, subgrupo_producto sp, producto_corte_2 p, grupo_estudiante ge, estudiante e, grupo g, practica pa where s.idSubgrupo=sp.idSubgrupoSP and sp.idProductoC2SP=p.idProductoC2 and p.idGrupoEstudiantePC2=ge.idGrupoEstudiante and ge.idEstudianteGE=e.idEstudiante and ge.idGrupoGE=g.idGrupo and g.idPracticaG=pa.idPractica and pa.idPractica=${idPractica} and s.nombreSubgrupo='${nombreSubgrupo}' and e.idEstudiante=${idEstudiante};`,{ type: sequelize.QueryTypes.SELECT });
    console.log(productInfoPerSubgroupAndStudent);
    res.json(productInfoPerSubgroupAndStudent);
  } catch (error) {
    console.log(error);
  }
}

export async function getPracticeTwoProductAtributes(req, res){
  const {idProductoC2} = req.params
  try {
    const productAtributes = await sequelize.query(`select a.nombreAtributo from atributo a, producto_atributo_2 pa, producto_corte_2 p where a.idAtributo=pa.idAtributoPA2 and pa.idProductoC2A=p.idProductoC2 and p.idProductoC2=${idProductoC2};`,{ type: sequelize.QueryTypes.SELECT })
    console.log(productAtributes);
    res.json(productAtributes);
  } catch (error) {
    console.log(error)
  }
}
