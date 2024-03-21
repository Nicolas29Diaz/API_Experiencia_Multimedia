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

// Obtiene los documentos y videos
router.get("/documents", getDocuments);
router.get("/videos", getVideos);
router.get("/documents/:idPractica", getDocumentsPractice);

//Actualiza la url de un video
router.put(
  "/videos/:nombreRecurso",
  verifyUser,
  permitirSoloProfesor,
  updateVideo
);

//Sube un documento
router.post("/documents", verifyUser, permitirSoloProfesor, postDocument);

//Elimina un documento
router.delete(
  "/documents/:idRecurso",
  verifyUser,
  permitirSoloProfesor,
  deleteDocument
);

export default router;
