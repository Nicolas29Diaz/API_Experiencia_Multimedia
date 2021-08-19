import { Router } from "express";
import { getAllStudentGroups } from "../controllers/grupoEstudianteController";

const router = Router();

// Consultas
//api/grupoEstudiante
router.get("/", getAllStudentGroups);

export default router;
