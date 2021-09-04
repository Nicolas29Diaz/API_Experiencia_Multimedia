import { Router } from "express";
import {
  createPractice1,
  createPractice2,
  createPractice3,
  getAllPractices,
  getPractice1InfoTeacher,
  getPractice2InfoTeacher,
  getPractice3InfoTeacher,
} from "../controllers/practicaController";
const router = Router();
import { verifyUser } from "../middleware/auth";
// Inserciones
router.post("/corte1", verifyUser, createPractice1);
router.post("/corte2", verifyUser, createPractice2);
router.post("/corte3", verifyUser, createPractice3);

// Consultas
// api/practicas

//practica 1
router.get("/practica1/:idPractica", verifyUser, getPractice1InfoTeacher);

router.get("/practica2/:idPractica", verifyUser, getPractice2InfoTeacher);
router.get("/practica3/:idPractica", verifyUser, getPractice3InfoTeacher);
router.get("/:idCurso", verifyUser, getAllPractices);

export default router;
