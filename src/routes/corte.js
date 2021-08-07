import { Router } from "express";
import { getAllCortes } from "../controllers/corteController";

const router = Router();

//api/corte
router.get("/", getAllCortes);

export default router;
