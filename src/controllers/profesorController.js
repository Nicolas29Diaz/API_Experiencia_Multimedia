import { sequelize } from "../database/database";
import Profesor from "../Models/Profesor";

export async function insertTeacher(req, res) {
  const { idProfesor, nombreProfesor, apellidoProfesor } = req.body;
  try {
    const profesor = await Profesor.create(
      {
        idProfesor,
        nombreProfesor,
        apellidoProfesor,
      },
      { fields: ["idProfesor", "nombreProfesor", "apellidoProfesor"] }
    );
    res.json(profesor);
  } catch (error) {
    console.log(error);
  }
}

export async function getAllTeachers(req, res) {
  try {
    const teachers = await Profesor.findAll();
    res.json(teachers);
  } catch (error) {
    console.log(error);
  }
}

export async function getOneTeacher(req, res) {
  const { idProfesor } = req.params;
  try {
    const teacher = await Profesor.findOne({
      where: {
        idProfesor,
      },
    });
    res.json(teacher);
  } catch (error) {
    console.log(error);
  }
}

export async function getPracticeAndModuleByTeacher(req, res) {
  const { idProfesor } = req.params;
  try {
    const teacherPracticeAndModule = await sequelize.query(
      `select pa.nombrePractica,co.nombreCorte from corte co, practica pa, curso c, profesor pr where co.idCorte=pa.idCorteP and pa.idCursoP=c.idCurso and c.idProfesorC=pr.idProfesor and pr.idProfesor=${idProfesor};`
    );
    res.json(teacherPracticeAndModule);
  } catch (error) {
    console.log(error);
  }
}
