import { Router } from "express";
import { createGraphic, getAllGraphics } from "../controllers/graficoController";

const router = Router();

// Inserciones
router.post("/", createGraphic);

// Consultas
//api/grafico
router.get("/", getAllGraphics);

export default router;
