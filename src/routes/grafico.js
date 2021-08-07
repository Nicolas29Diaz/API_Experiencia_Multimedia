import { Router } from "express";
import { getAllGrafico } from "../controllers/graficoController";

const router = Router();

//api/grafico
router.get("/", getAllGrafico);

export default router;
