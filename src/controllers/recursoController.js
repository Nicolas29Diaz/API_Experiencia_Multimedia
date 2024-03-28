import Recurso from "../models/Recurso";
import PracticaRecurso from "../models/Practica_Recurso";

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

export async function getDocumentsPractice(req, res) {
  const idPractica = req.params.idPractica;

  try {
    const documentos = await PracticaRecurso.findAll({
      where: { idPracticaPr: idPractica },
      include: [
        {
          model: Recurso,
          attributes: ["urlRecurso", "nombreRecurso"],
        },
      ],
    });

    res.json(documentos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
}

export async function updateVideo(req, res) {
  try {
    const { nombreRecurso } = req.params;
    const { urlRecurso } = req.body;

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

    res.json({ recurso });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error" });
    console.log(error);
  }
}

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
