import Recurso from "../models/Recurso";

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

export async function deleteDocument(req, res) {
  const idRecurso = req.params.idRecurso;

  try {
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
