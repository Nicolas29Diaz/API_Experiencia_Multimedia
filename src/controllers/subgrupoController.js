import { sequelize } from "../database/database";
import Subgrupo from "../Models/Subgrupo";

export async function getAllSubgroups(req, res) {
  try {
    const subgrupos = await Subgrupo.findAll();
    res.json(subgrupos);
  } catch (error) {
    console.log("error", error);
  }
}

export async function getOneSubgroup(req, res) {
  const { idSubgrupo } = req.params;
  try {
    const subgrupo = await Subgrupo.findOne({
      where: {
        idSubgrupo,
      },
    });
    res.json(subgrupo);
  } catch (error) {
    console.log(error);
  }
}

export async function getSubgroupSize(req, res){
  const {idPractica} = req.params;
  try {
    const subgroupSize = await sequelize.query(`select s.cantidadSubgrupo from subgrupo s, subgrupo_producto sp, producto_corte_2 p, grupo_estudiante ge, grupo g, practica pa where s.idSubgrupo=sp.idSubgrupoSP and sp.idProductoC2SP=p.idProductoC2 and p.idGrupoEstudiantePC2=ge.idGrupoEstudiante and ge.idGrupoGE=g.idGrupo and g.idPracticaG=pa.idPractica and pa.idPractica=${idPractica} group by g.idGrupo;`,{ type: sequelize.QueryTypes.SELECT });
    console.log(subgroupSize);
    res.json(subgroupSize);
  } catch (error) {
    console.log(error)
  }
}

export async function getSubgroupCount(req, res){
  const {nombreGrupo, idPractica} = req.params;
  try {
    const subgroupCount = await sequelize.query(`select count(s.idSubgrupo) from subgrupo s, subgrupo_producto sp, producto_corte_2 p, grupo_estudiante ge, grupo g, practica pa where s.idSubgrupo=sp.idSubgrupoSP and sp.idProductoC2SP=p.idProductoC2 and p.idGrupoEstudiantePC2=ge.idGrupoEstudiante and ge.idGrupoGE=g.idGrupo and g.idPracticaG=pa.idPractica and g.nombreGrupo='${nombreGrupo}' and pa.idPractica=${idPractica};`,{ type: sequelize.QueryTypes.SELECT });
    console.log(subgroupCount);
    res.json(subgroupCount);
  } catch (error) {
    console.log(error);
  }
}
