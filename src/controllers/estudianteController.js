import { sequelize } from "../config/database";
import Estudiante from "../models/Estudiante";
import Practica from "../models/Practica";
import { deletePractice2 } from "./practicaController";
import { deletePracticeResourceByPractice } from "./recursoController";

export async function insertStudent(req, res) {
  const {
    idEstudiante,
    nombreEstudiante,
    apellidoEstudiante,
    emailEstudiante,
    contrasenaEstudiante,
  } = req.body;
  try {
    const estudiante = await Estudiante.create(
      {
        idEstudiante,
        nombreEstudiante,
        apellidoEstudiante,
        emailEstudiante,
        contrasenaEstudiante,
      },
      {
        fields: [
          "idEstudiante",
          "nombreEstudiante",
          "apellidoEstudiante",
          "emailEstudiante",
          "contrasenaEstudiante",
        ],
      }
    );
    res.json(estudiante);
  } catch (error) {
    console.log(error);
  }
}

export async function getAllStudents(req, res) {
  try {
    const estudiantes = await Estudiante.findAll({
      attributes: [
        "idEstudiante",
        [
          sequelize.fn(
            "CONCAT",
            sequelize.col("nombreEstudiante"),
            " ",
            sequelize.col("apellidoEstudiante")
          ),
          "estudiante",
        ],
      ],
    });
    res.json({ estudiantes });
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

export async function getGroupPerPractice(req, res) {
  const { idEstudiante } = req.params;
  try {
    const groupPerPractice = await sequelize.query(
      `select g.nombreGrupo, pa.nombrePractica from practica pa, grupo g, grupo_estudiante ge, estudiante e where e.idEstudiante=ge.idEstudianteGE and ge.idGrupoGE=g.idGrupo and g.idPracticaG=pa.idPractica and e.idEstudiante=${idEstudiante};`,
      { type: sequelize.QueryTypes.SELECT }
    );
    res.json(groupPerPractice);
  } catch (error) {
    console.log(error);
  }
}

export async function updatePracticeState(req, res) {
  try {
    const { idEstudiante, idPractica } = req.params;

    await sequelize.query(
      `UPDATE grupo_estudiante, estudiante, grupo, practica SET grupo_estudiante.finalizado=1 WHERE grupo_estudiante.idEstudianteGE=${idEstudiante} and grupo_estudiante.idGrupoGE=grupo.idGrupo and grupo.idPracticaG=${idPractica};`
    );

    res.json({ idPractica });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error" });
    console.log(error);
  }
}

export async function getStudentPracticeState(req, res) {
  try {
    const { idEstudiante, idPractica } = req.params;

    const state = await sequelize.query(
      `select ge.finalizado from grupo_estudiante ge, estudiante e, grupo g, practica pa where pa.idPractica=g.idPracticaG and g.idGrupo=ge.idGrupoGE and ge.idEstudianteGE=e.idEstudiante and e.idEstudiante=${idEstudiante} and pa.idPractica=${idPractica};`,
      { type: sequelize.QueryTypes.SELECT }
    );

    res.json({ state });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error" });
    console.log(error);
  }
}

export async function getAllStudentsAllData(req, res) {
  try {
    const estudiantes = await Estudiante.findAll({
      attributes: [
        "idEstudiante",
        [
          sequelize.fn(
            "CONCAT",
            sequelize.col("nombreEstudiante"),
            " ",
            sequelize.col("apellidoEstudiante")
          ),
          "estudiante",
        ],
        "emailEstudiante",
      ],
    });
    res.json({ estudiantes });
  } catch (error) {
    console.log(error);
  }
}

export async function deleteStudent(req, res) {
  try {
    const idEstudiante = req.params.idEstudiante;

    const idSubgrupos = await sequelize.query(
      `select s.idSubgrupo from
      grupo_estudiante ge,
      producto_corte_2 pc2,
      subgrupo_producto	sp,
      subgrupo s Where
      s.idSubgrupo = sp.idSubgrupoSP and
      sp.idProductoC2SP = pc2.idProductoC2 and
       pc2.idGrupoEstudiantePC2 = ge.idGrupoEstudiante and
      ge.idEstudianteGE = ${idEstudiante};`
    );

    for (const subgrupo of idSubgrupos[0]) {
      const rowsDeleted = await sequelize.query(
        `DELETE FROM subgrupo WHERE idSubgrupo = '${subgrupo.idSubgrupo}';`
      );
    }

    const rowsDeleted = await sequelize.query(
      `DELETE FROM estudiante WHERE idEstudiante = '${idEstudiante}';`
    );

    res.json({ msg: "Estudiante eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error" });
  }
}

export async function deleteAllStudents(req, res) {
  try {
    await sequelize.query(`DELETE FROM estudiante;`);

    await sequelize.query(`DELETE FROM subgrupo;`);

    res.json({ msg: "Estudiantes eliminados" });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error" });
  }
}
