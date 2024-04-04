import { Router } from "express";

import { registerUser, registerUsers } from "../controllers/usuarioController";
import { verifyUser } from "../middleware/auth";
const router = Router();
/**
 * Registra un nuevo usuario.
 * @param {*} req - Solicitud HTTP.
 * @param {*} res - Respuesta HTTP.
 */
router.post("/register", registerUser);
/**
 * Registra varios usuarios a la vez.
 * @param {*} req - Solicitud HTTP.
 * @param {*} res - Respuesta HTTP.
 */
router.post("/registerAll", verifyUser, registerUsers);

export default router;

