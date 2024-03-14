import { Router } from "express";
import {
  createPractice1,
  createPractice2,
  createPractice3,
  getAllPractices,
  getPractice1InfoTeacher,
  getPractice2InfoTeacher,
  getPractice3InfoTeacher,
  getAllPraticesByStudent,
  deletePractice,
} from "../controllers/practicaController";
const router = Router();
import { verifyUser, permitirSoloProfesor } from "../middleware/auth";

// Inserciones
router.post("/corte1", verifyUser, permitirSoloProfesor, createPractice1);
router.post("/corte2", verifyUser, permitirSoloProfesor, createPractice2);
router.post("/corte3", verifyUser, permitirSoloProfesor, createPractice3);

// Consultas

//practica 1 profesor
router.get("/practica1/:idPractica", verifyUser, getPractice1InfoTeacher);
router.get("/practica2/:idPractica", verifyUser, getPractice2InfoTeacher);
router.get("/practica3/:idPractica", verifyUser, getPractice3InfoTeacher);

//practica 1 estudiante
router.get(
  "/practica1/estudiante/:idEstudiante",
  verifyUser,
  getAllPraticesByStudent
);

//obtener todas las practicas
router.get("/:idCurso", verifyUser, getAllPractices);

// Eliminar practica
router.delete("/:idPractica", verifyUser, permitirSoloProfesor, deletePractice);

export default router;
