import { Router } from "express";

import {
  authenticateUser,
  userAuthenticated,
} from "../controllers/authController";
import { verifyUser } from "../middleware/auth";
const router = Router();

router.post("/", authenticateUser);

// Obtiene el usuario autenticado
router.get("/", verifyUser, userAuthenticated);

export default router;
