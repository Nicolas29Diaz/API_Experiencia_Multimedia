import { Router } from "express";
import { createMethodProduct, getAllMethodProduct } from "../controllers/metodoProductoController";

const router = Router();

// Inserciones
router.post("/", createMethodProduct);

// Consultas
// /api/metodoproducto
router.get("/", getAllMethodProduct);

export default router;
