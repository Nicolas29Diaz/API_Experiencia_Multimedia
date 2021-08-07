import { Router } from "express";
import { getAllGraficoPracticas } from "../controllers/graficoPracticaController";

const router = Router();

//api/graficopractica
router.get("/", getAllGraficoPracticas);

export default router;
