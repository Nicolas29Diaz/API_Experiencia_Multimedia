import { sequelize } from "../config/database";
import Curso from "../Models/Curso";

export async function createCourse(req, res) {
  const { nombreCurso, periodoAcademico } = req.body;
  try {
    const curso = await Curso.create(
      {
        nombreCurso,
        periodoAcademico,
        idProfesorC: req.user.id,
      },
      { fields: ["nombreCurso", "periodoAcademico", "idProfesorC"] }
    );
    res.json({ curso });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un problema al crear el curso" });
  }
}

export async function getAllCourses(req, res) {
  try {
    const cursos = await Curso.findAll({ where: { idProfesorC: req.user.id } });
    res.json({ cursos });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un problema al obtener los cursos" });
  }
}

export async function getOneCourse(req, res) {
  try {
    const { idCurso } = req.params;
    const curso = await Curso.findOne({
      where: {
        idCurso,
        idProfesorC: req.user.id,
      },
    });
    res.json({ curso });
  } catch (error) {
    console.log(error);
  }
}

export async function getCourseByTeacher(req, res) {
  try {
    const { idProfesorC } = req.params;
    const cursoProfesor = await Curso.findAll({
      attributes: ["idCurso", "nombreCurso"],
      where: { idProfesorC },
    });
    res.json(cursoProfesor);
  } catch (error) {
    console.log(error);
  }
}

export async function getPracticePerCourse(req, res) {
  const { idCurso } = req.params;
  try {
    const practiceCourse = await sequelize.query(
      `select pa.nombrePractica from practica pa, curso c where pa.idCursoP=c.idCurso and c.idCurso=${idCurso};`,
      { type: sequelize.QueryTypes.SELECT }
    );
    console.log(practiceCourse);
    res.json(practiceCourse);
  } catch (error) {
    console.log(error);
  }
}

export async function getStudentCourse(req, res) {
  const { idEstudiante } = req.params;
  try {
    const studentCourse = await sequelize.query(
      `select c.nombreCurso from curso c, practica pa, grupo g, grupo_estudiante ge, estudiante e where c.idCurso=pa.idCursoP and pa.idPractica=g.idPracticaG and g.idGrupo=ge.idGrupoGE and ge.idEstudianteGE=e.idEstudiante and e.idEstudiante=${idEstudiante} group by c.nombreCurso;`,
      { type: sequelize.QueryTypes.SELECT }
    );
    console.log(studentCourse);
    res.json(studentCourse);
  } catch (e) {
    console.log(e);
  }
}

export async function getCourseStudent(req, res) {
  const { idCurso } = req.params;
  try {
    const studentCourse = await sequelize.query(
      `select e.idEstudiante as id, CONCAT(e.nombreEstudiante ,' ', e.apellidoEstudiante) as estudiante from curso c, practica pa, grupo g, grupo_estudiante ge, estudiante e where c.idCurso=pa.idCursoP and pa.idPractica=g.idPracticaG and g.idGrupo=ge.idGrupoGE and ge.idEstudianteGE=e.idEstudiante and c.idCurso=${idCurso} group by e.nombreEstudiante;`,
      { type: sequelize.QueryTypes.SELECT }
    );
    res.json(studentCourse);
  } catch (e) {
    console.log(e);
  }
}
