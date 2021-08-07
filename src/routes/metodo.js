import { Router } from "express";
import { getAllMethods } from "../controllers/metodoController";

const router = Router();

// /api/metodo
router.get("/", getAllMethods);

export default router;
