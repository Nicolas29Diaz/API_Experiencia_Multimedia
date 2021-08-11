import { Router } from "express";
import {createStudentGroup, getAllStudentGroups } from "../controllers/grupoEstudianteController";

const router = Router();

// Inserciones
router.post("/", createStudentGroup);

// Consultas
//api/grupoEstudiante
router.get("/", getAllStudentGroups);

export default router;
