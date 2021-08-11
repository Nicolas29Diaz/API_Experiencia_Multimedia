import { Router } from "express";
import { createGraphicPractice, getAllGraphicPractice } from "../controllers/graficoPracticaController";

const router = Router();

// Inserciones
router.post("/", createGraphicPractice);

// Consultas
//api/graficopractica
router.get("/", getAllGraphicPractice);

export default router;
