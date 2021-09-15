import { Router } from "express";
import {
  insertStudent,
  getAllStudents,
  getOneStudent,
  getGroupPerPractice,
  updatePracticeState,
  getStudentPracticeState,
} from "../controllers/estudianteController";
import { verifyUser } from "../middleware/auth";
const router = Router();

// Inserciones
router.post("/", verifyUser, insertStudent);

// Consultas
router.get("/", verifyUser, getAllStudents);
// Consultar informacion de un estudiante
router.get("/:idEstudiante", getOneStudent);
// Conocer a que grupo pertenecio cada estudiante en cada practica:
router.get("/grupo/practica/:idEstudiante", getGroupPerPractice);

router.put(
  "/practica/:idPractica/estudiante/:idEstudiante",
  verifyUser,
  updatePracticeState
);

router.get(
  "/practica/:idPractica/estudiante/:idEstudiante",
  verifyUser,
  getStudentPracticeState
);

export default router;
