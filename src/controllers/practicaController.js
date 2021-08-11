import { sequelize } from "../database/database";
import Practica from "../models/Practica";

export async function createPractice(req, res){
  const {nombrePractica, descripcionPractica, fechaHoraPublicacionPractica,idCursoP, idCorteP} = req.body;
  try {
    const practica = await Practica.create({
      nombrePractica,
      descripcionPractica,
      fechaHoraPublicacionPractica,
      idCursoP,
      idCorteP
    },{fields:['nombrePractica','descripcionPractica','fechaHoraPublicacionPractica','idCursoP','idCorteP']});
    console.log(practica);
    res.json(practica);
  } catch (error) {
    console.log(error);
  }
}

export async function getAllPractica(req, res) {
  try {
    const practicas = await Practica.findAll();
    res.json(practicas);
  } catch (error) {
    console.log(error);
  }
}

export async function getPracticeStudentsPerGroup(req, res){
  const {idPractica} = req.params
  try {
    const practicestudentsPerGroup = await sequelize.query(`select e.nombreEstudiante,g.nombreGrupo from estudiante e, grupo_estudiante ge, grupo g, practica p where e.idEstudiante=ge.idEstudianteGE and ge.idGrupoGE=g.idGrupo and g.idPracticaG=p.idPractica and p.idPractica=${idPractica} order by g.idGrupo;`,{ type: sequelize.QueryTypes.SELECT })
    console.log(practicestudentsPerGroup);
    res.json(practicestudentsPerGroup);
  } catch (error) {
    console.log(error)
  }
}

export async function getStudentsPerGroup(req, res){
  const {idPractica, nombreGrupo} = req.params;
  try {
    const studentsPerGroup = await sequelize.query(`select e.nombreEstudiante,g.nombreGrupo from estudiante e, grupo_estudiante ge, grupo g, practica p where e.idEstudiante=ge.idEstudianteGE and ge.idGrupoGE=g.idGrupo and g.idPracticaG=p.idPractica and p.idPractica=${idPractica} and g.nombreGrupo="${nombreGrupo}";`,{ type: sequelize.QueryTypes.SELECT })
    console.log(studentsPerGroup);
    res.json(studentsPerGroup);
  } catch (error) {
    console.log(error)
  }
}

export async function getStudentCountPerGroup(req, res){
  const {idPractica}= req.params;
  try {
    const studentsCount = await sequelize.query(`select count(e.idEstudiante),g.nombreGrupo from estudiante e, grupo_estudiante ge, grupo g, practica p where e.idEstudiante=ge.idEstudianteGE and ge.idGrupoGE=g.idGrupo and g.idPracticaG=p.idPractica and p.idPractica=${idPractica} group by g.nombreGrupo;`,{ type: sequelize.QueryTypes.SELECT });
    console.log(studentsCount);
    res.json(studentsCount);
  } catch (error) {
    console.log(error)
  }
}

export async function getPracticeOneProductPerGroup(req, res){
  const {idPractica} = req.params
  try {
    const practiceProducts = await sequelize.query(`select p.nombrePC1,g.nombreGrupo from producto_corte_1 p, grupo_estudiante ge, grupo g, practica pa where p.idGrupoEstudiantePC1=ge.idGrupoEstudiante and ge.idGrupoGE=g.idGrupo and g.idPracticaG=pa.idPractica and pa.idPractica=${idPractica} group by g.nombreGrupo;`,{ type: sequelize.QueryTypes.SELECT })
    console.log(practiceProducts);
    res.json(practiceProducts);
  } catch (error) {
    console.log(error)
  }
}

export async function getPracticeGraphics(req, res){
  const {idPractica} = req.params;
  try {
    const practicegraphics = await sequelize.query(`select g.nombreGrafico from grafico g, grafico_practica gp, practica p where g.idGrafico=gp.idGraficoGP and gp.idPracticaGp=p.idPractica and p.idPractica=${idPractica};`,{ type: sequelize.QueryTypes.SELECT })
    console.log(practicegraphics);
    res.json(practicegraphics);
  } catch (error) {
    console.log(error);
  }
}

export async function getPracticeTwoProductPerGroup(req, res){
  const {idPractica} = req.params;
  try {
    const practiceProducts = await sequelize.query(`select p.nombrePC2,g.nombreGrupo from producto_corte_2 p, grupo_estudiante ge, grupo g, practica pa where p.idGrupoEstudiantePC2=ge.idGrupoEstudiante and ge.idGrupoGE=g.idGrupo and g.idPracticaG=pa.idPractica and pa.idPractica=${idPractica} group by g.nombreGrupo;`,{ type: sequelize.QueryTypes.SELECT })
    console.log(practiceProducts);
    res.json(practiceProducts);
  } catch (error) {
    console.log(error)
  }
}

export async function getPracticeThreeProductPerGroup(req, res){
  const {idPractica} = req.params;
  try {
    const practiceProducts = await sequelize.query(`select p.nombrePC3,g.nombreGrupo from producto_corte_3 p, grupo_estudiante ge, grupo g, practica pa where p.idGrupoEstudiantePC3=ge.idGrupoEstudiante and ge.idGrupoGE=g.idGrupo and g.idPracticaG=pa.idPractica and pa.idPractica=${idPractica} group by g.nombreGrupo;`,{ type: sequelize.QueryTypes.SELECT })
    console.log(practiceProducts);
    res.json(practiceProducts);
  } catch (error) {
    console.log(error)
  }
}

export async function getPracticeThreeGroupMethods(req, res){
  const {idPractica, nombreGrupo} = req.params;
  try {
    const groupMethods = await sequelize.query(`select m.nombreMetodo from metodo m, metodo_producto mp, producto_corte_3 p, grupo_estudiante ge, grupo g, practica pa where m.idMetodo=mp.idMetodoMP and mp.idProductoMP=p.idProductoC3 and p.idGrupoEstudiantePC3=ge.idGrupoEstudiante and ge.idGrupoGE=g.idGrupo and g.idPracticaG=pa.idPractica and pa.idPractica=${idPractica} and g.nombreGrupo='${nombreGrupo}' group by m.nombreMetodo;`,{ type: sequelize.QueryTypes.SELECT });
    console.log(groupMethods);
    res.json(groupMethods);
  } catch (error) {
    console.log(error);
  }
}

