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

router.delete("/:idEstudiante", deleteStudent);
export default router;
