import { Router } from "express";

import { registerUser, registerUsers } from "../controllers/usuarioController";
import { verifyUser } from "../middleware/auth";
const router = Router();

router.post("/register", registerUser);
router.post(
  "/registerAll",
  verifyUser,
  registerUsers
);

export default router;
