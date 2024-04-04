import Recurso from "../models/Recurso";
import PracticaRecurso from "../models/Practica_Recurso";
import { sequelize } from "../config/database";

/**
 * Obtiene todos los documentos disponibles.
 * @param {*} req - Solicitud HTTP.
 * @param {*} res - Respuesta HTTP.
 * @returns {Object[]} - Array de documentos.
 */
export async function getDocuments(req, res) {
  try {
    const recurso = await Recurso.findAll({
      where: { tipoRecurso: "document" },
    });
    res.json(recurso);
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error" });
    console.log(error);
  }
}
/**
 * Obtiene todos los videos disponibles.
 * @param {*} req - Solicitud HTTP.
 * @param {*} res - Respuesta HTTP.
 * @returns {Object[]} - Array de videos.
 */
export async function getVideos(req, res) {
  try {
    const recurso = await Recurso.findAll({
      where: { tipoRecurso: "video" },
    });
    res.json(recurso);
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error" });
    console.log(error);
  }
}
/**
 * Obtiene todos los documentos asociados a una práctica específica.
 * @param {number} idPractica - ID de la práctica.
 * @returns {Object[]} - Array de documentos asociados a la práctica.
 */
export async function getDocumentsPractice(idPractica) {
  try {
    const documentos = await sequelize.query(
      `SELECT r.idRecurso, r.urlRecurso, r.nombreRecurso FROM recurso r, practica_recurso pr WHERE pr.idPracticaPr = ${idPractica} and r.idRecurso = pr.idRecursoPr;`,
      { type: sequelize.QueryTypes.SELECT }
    );
    console.log(documentos);

    return documentos;
  } catch (error) {
    console.log(error);
  }
}
/**
 * Actualiza la URL de un video.
 * @param {*} req - Solicitud HTTP.
 * @param {*} res - Respuesta HTTP.
 */
export async function updateVideo(req, res) {
  try {
    const { nombreRecurso } = req.params;
    const { urlRecurso } = req.body;
    console.log(urlRecurso);
    // Verificar si el recurso existe
    const existeRecurso = await Recurso.findOne({
      where: { nombreRecurso: nombreRecurso },
    });

    if (!existeRecurso) {
      return res.status(404).json({ msg: "El recurso no existe" });
    }

    // Actualizar el recurso
    await Recurso.update(
      { urlRecurso: urlRecurso },
      { where: { nombreRecurso: nombreRecurso } }
    );

    const recurso = {
      nombreRecurso,
      urlRecurso,
    };
    //
    res.json({ recurso });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error" });
    console.log(error);
  }
}
/**
 * Sube un nuevo documento.
 * @param {*} req - Solicitud HTTP.
 * @param {*} res - Respuesta HTTP.
 */
export async function postDocument(req, res) {
  const { urlRecurso, nombreRecurso } = req.body;
  try {
    const recurso = await Recurso.create(
      {
        tipoRecurso: "document",
        urlRecurso,
        nombreRecurso,
      },
      { fields: ["tipoRecurso", "urlRecurso", "nombreRecurso"] }
    );
    res.json({ recurso });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un problema al crear el recurso" });
  }
}
/**
 * Elimina un documento existente.
 * @param {*} req - Solicitud HTTP.
 * @param {*} res - Respuesta HTTP.
 */
export async function deletePracticeResource(idRecurso) {
  try {
    // Eliminar los registros en la tabla practica_recurso que coincidan con idRecurso
    const rowsDeleted = await PracticaRecurso.destroy({
      where: {
        idRecursoPr: idRecurso,
      },
    });

    // Verificar si se eliminaron registros
    if (rowsDeleted > 0) {
      console.log(
        `Se eliminaron ${rowsDeleted} registros de la tabla practica_recurso relacionados con la práctica ${idRecurso}.`
      );
    } else {
      console.log(
        `No se encontraron registros para eliminar en la tabla practica_recurso relacionados con la práctica ${idRecurso}.`
      );
    }
  } catch (error) {
    // Manejar errores
    console.error("Ocurrió un error al eliminar los registros:", error);
    throw error; // Re-lanza el error para que sea manejado en un nivel superior si es necesario
  }
}

/**
 * Elimina los registros de recursos asociados a una práctica específica.
 * @param {number} idPractica - ID de la práctica.
 */
export async function deletePracticeResourceByPractice(idPractica) {
  try {
    // Eliminar los registros en la tabla practica_recurso que coincidan con idPractica
    const rowsDeleted = await PracticaRecurso.destroy({
      where: {
        idPracticaPr: idPractica,
      },
    });

    // Verificar si se eliminaron registros
    if (rowsDeleted > 0) {
      console.log(
        `Se eliminaron ${rowsDeleted} registros de la tabla practica_recurso relacionados con la práctica ${idPractica}.`
      );
    } else {
      console.log(
        `No se encontraron registros para eliminar en la tabla practica_recurso relacionados con la práctica ${idPractica}.`
      );
    }
  } catch (error) {
    // Manejar errores
    console.error("Ocurrió un error al eliminar los registros:", error);
    throw error; // Re-lanza el error para que sea manejado en un nivel superior si es necesario
  }
}
/**
 * Elimina un documento existente y sus asociaciones.
 * @param {*} req - Solicitud HTTP.
 * @param {*} res - Respuesta HTTP.
 */
export async function deleteDocument(req, res) {
  try {
    //PRIMERO BORRAR DE PRACTICA_RECURSO
    const idRecurso = req.params.idRecurso;
    deletePracticeResource(idRecurso);
    // Verificar si el recurso existe
    const existeRecurso = await Recurso.findOne({
      where: { idRecurso },
    });

    if (!existeRecurso) {
      return res.status(404).json({ msg: "El recurso no existe" });
    } else if (existeRecurso.dataValues.tipoRecurso !== "document") {
      return res.status(404).json({ msg: "El documento no existe" });
    }

    console.log("Eliminado");
    await Recurso.destroy({
      where: { idRecurso },
    });

    res.json({ msg: "Recurso eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error" });
    console.log(error);
  }
}
