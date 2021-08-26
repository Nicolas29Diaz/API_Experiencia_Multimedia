import { Router } from "express";
import {
  createPractice1,
  createPractice2,
  createPractice3,
  getAllPractica,
} from "../controllers/practicaController";
const router = Router();

// Inserciones
router.post("/corte1", createPractice1);
router.post("/corte2", createPractice2);
router.post("/corte3", createPractice3);

// Consultas
// api/practica
router.get("/", getAllPractica);

export default router;
