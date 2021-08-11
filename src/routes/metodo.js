import { Router } from "express";
import { createMethod, getAllMethods } from "../controllers/metodoController";

const router = Router();

// Inserciones
router.post("/", createMethod);

// Consultas
// /api/metodo
router.get("/", getAllMethods);

export default router;
