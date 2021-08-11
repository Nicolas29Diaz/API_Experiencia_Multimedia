import { Router } from "express";
import { createGroup, getAllGrupos } from "../controllers/grupoController";

const router = Router();

// Inserciones
router.post("/", createGroup);

// Consultas
// api/grupo
router.get("/", getAllGrupos);

export default router;
