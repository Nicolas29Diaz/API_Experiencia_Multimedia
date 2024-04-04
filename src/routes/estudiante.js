import { Router } from "express";
import {
  insertStudent,
  getAllStudents,
  getOneStudent,
  getGroupPerPractice,
  updatePracticeState,
  getStudentPracticeState,
  getAllStudentsAllData,
  deleteStudent,
  deleteAllStudents,
} from "../controllers/estudianteController";
import { verifyUser } from "../middleware/auth";
const router = Router();

// Inserciones
router.post("/", verifyUser, insertStudent);

// Consultas
router.get("/", verifyUser, getAllStudents);
router.get("/all", verifyUser, getAllStudentsAllData);

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

/**
 * Elimina un estudiante.
 * @param {*} req - Solicitud HTTP.
 * @param {*} res - Respuesta HTTP.
 */
router.delete("/:idEstudiante", verifyUser, deleteStudent);
/**
 * Elimina todos los estudiantes.
 * @param {*} req - Solicitud HTTP.
 * @param {*} res - Respuesta HTTP.
 */

router.delete("/", verifyUser, deleteAllStudents);
export default router;
