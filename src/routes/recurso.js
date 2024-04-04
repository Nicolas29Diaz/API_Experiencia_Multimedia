import {
  getDocuments,
  getVideos,
  updateVideo,
  postDocument,
  deleteDocument,
  getDocumentsPractice,
} from "../controllers/recursoController";
import { Router } from "express";
import { verifyUser, permitirSoloProfesor } from "../middleware/auth";
const router = Router();

/**
 * Obtiene todos los documentos disponibles.
 * @param {*} req - Solicitud HTTP.
 * @param {*} res - Respuesta HTTP.
 */
router.get("/documents", getDocuments);

/**
 * Obtiene todos los documentos disponibles en una practica.
 * @param {*} req - Solicitud HTTP.
 * @param {*} res - Respuesta HTTP.
 */
router.get("/documents/:idPractica", getDocumentsPractice);

/**
 * Obtiene todos los videos disponibles.
 * @param {*} req - Solicitud HTTP.
 * @param {*} res - Respuesta HTTP.
 */
router.get("/videos", getVideos);

/**
 * Actualiza la URL de un video.
 * @param {*} req - Solicitud HTTP.
 * @param {*} res - Respuesta HTTP.
 */
router.put(
  "/videos/:nombreRecurso",
  verifyUser,
  permitirSoloProfesor,
  updateVideo
);

/**
 * Sube un nuevo documento.
 * @param {*} req - Solicitud HTTP.
 * @param {*} res - Respuesta HTTP.
 */
router.post("/documents", verifyUser, permitirSoloProfesor, postDocument);

/**
 * Elimina un documento existente.
 * @param {*} req - Solicitud HTTP.
 * @param {*} res - Respuesta HTTP.
 */
router.delete(
  "/documents/:idRecurso",
  verifyUser,
  permitirSoloProfesor,
  deleteDocument
);

export default router;
