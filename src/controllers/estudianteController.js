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

    const cortesQuery = await sequelize.query(
      `SELECT nombreCorte from grupo_estudiante ge,
      grupo g, practica p, corte c WHERE p.idCorteP = c.idCorte and g.idPracticaG = p.idPractica 
      and ge.idGrupoGE = g.idGrupo and ge.idEstudianteGE = ${idEstudiante};
    `,
      { type: sequelize.QueryTypes.SELECT }
    );

    const contieneCorte2 = cortesQuery.some(
      (elemento) => elemento.nombreCorte === "Corte 2"
    );

    // if (contieneCorte2) {
    // const response = await sequelize.query(
    //   `SELECT s.idSubgrupo
    //   FROM subgrupo s
    //   INNER JOIN subgrupo_producto sp ON sp.idSubgrupoSP = s.idSubgrupo
    //   INNER JOIN producto_corte_2 pc2 ON pc2.idProductoC2 = sp.idProductoC2SP
    //   INNER JOIN grupo_estudiante ge ON ge.idGrupoEstudiante = pc2.idGrupoEstudiantePC2
    //   WHERE ge.idEstudianteGE = ${idEstudiante}`
    // );
    // response[0].map((item) => {
    //   console.log(item.idSubgrupo);
    // });

    // } else {
    //Primero eliminar el estudiante
    const rowsDeleted = await sequelize.query(
      `DELETE FROM estudiante WHERE idEstudiante = '${idEstudiante}';`
    );
    console.log("Estudiante eliminado");
    //Si en grupo_estudiante no existe el idGrupo (Misma consulta que la otra) pues se borra el
    //grupo
    //Obtener grupos sin estudiantes
    const idGruposQueryResult = await sequelize.query(
      `SELECT g.idGrupo
        FROM grupo g
        LEFT JOIN grupo_estudiante ge ON g.idGrupo = ge.idGrupoGE
        WHERE ge.idGrupoGE IS NULL;
      `,
      { type: sequelize.QueryTypes.SELECT }
    );
    const idGrupos = idGruposQueryResult.map((result) => result.idGrupo);
    console.log("idGrupos sin estudiantes:");
    console.log(idGrupos);
    if (idGrupos.length > 0) {
      for (const idGrupo of idGrupos) {
        await sequelize.query(`DELETE FROM grupo WHERE idGrupo = ${idGrupo};`);
      }
    } else {
      console.log("No hay grupos sin estudiantes");
    }
    //Luego si en grupo no existe el id de la practica pues se borra la practica
    // Obtener practica sin grupos
    const idPracticasQueryResult = await sequelize.query(
      `SELECT p.idPractica
        FROM practica p
        LEFT JOIN grupo g ON p.idPractica = g.idPracticaG
        WHERE g.idPracticaG IS NULL;
      `,
      { type: sequelize.QueryTypes.SELECT }
    );
    const idPracticas = idPracticasQueryResult.map(
      (result) => result.idPractica
    );
    console.log("idPracticas sin grupos:");

    console.log(idPracticas);

    if (idPracticas.length > 0) {
      for (const idPractica of idPracticas) {
        console.log(idPractica);
        await deletePracticeResourceByPractice(idPractica);
        await deletePractice2(idPractica);
      }
      // console.log("Jay prácticas sin estudiantes");
    } else {
      console.log("No hay prácticas sin estudiantes");
    }
    // }

    res.json({ msg: "Estudiente eliminado" });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error" });
  }
}
