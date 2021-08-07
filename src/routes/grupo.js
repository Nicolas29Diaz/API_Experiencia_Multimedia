import { Router } from "express";
import { getAllGrupos } from "../controllers/grupoController";

const router = Router();

// api/grupo
router.get("/", getAllGrupos);

export default router;
