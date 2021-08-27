import { Router } from "express";

import { registerUser } from "../controllers/usuarioController";
const router = Router();

router.post("/register", registerUser);

export default router;
