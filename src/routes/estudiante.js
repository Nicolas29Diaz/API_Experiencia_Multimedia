import { Router } from "express";
import {insertStudent, getAllStudents, getOneStudent, getGroupPerPractice } from "../controllers/estudianteController";

const router = Router();

// Inserciones
router.post("/", insertStudent);

// Consultas
router.get("/", getAllStudents);
// Consultar informacion de un estudiante
router.get("/:idEstudiante", getOneStudent);
// Conocer a que grupo pertenecio cada estudiante en cada practica:
router.get("/grupo/practica/:idEstudiante", getGroupPerPractice);

export default router;
