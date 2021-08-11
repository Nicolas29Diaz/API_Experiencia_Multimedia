import { sequelize } from "../database/database";
import Estudiante from "../models/Estudiante";

export async function insertStudent(req, res){
  const {idEstudiante, nombreEstudiante, apellidoEstudiante} = req.body;
  try {
    const estudiante = await Estudiante.create({
      idEstudiante,
      nombreEstudiante,
      apellidoEstudiante
    },{fields:['idEstudiante','nombreEstudiante','apellidoEstudiante']});
    console.log(estudiante);
    res.json(estudiante);
  } catch (error) {
    console.log(error);
  }
}

export async function getAllStudents(req, res) {
  try {
    const estudiantes = await Estudiante.findAll();
    res.json(estudiantes);
  } catch (error) {
    console.log(error);
  }
}

export async function getOneStudent(req, res) {
  const { idEstudiante } = req.params;
  try {
    const estudiante = await Estudiante.findOne({
      where: {
        idEstudiante,
      },
    });
    res.json(estudiante);
  } catch (error) {
    console.log(error);
  }
}

export async function getGroupPerPractice(req, res){
  const {idEstudiante} = req.params;
  try {
    const groupPerPractice = await sequelize.query(`select g.nombreGrupo, pa.nombrePractica from practica pa, grupo g, grupo_estudiante ge, estudiante e where e.idEstudiante=ge.idEstudianteGE and ge.idGrupoGE=g.idGrupo and g.idPracticaG=pa.idPractica and e.idEstudiante=${idEstudiante};`,{ type: sequelize.QueryTypes.SELECT });
    console.log(groupPerPractice);
    res.json(groupPerPractice);
  } catch (error) {
    console.log(error);
  }
}
