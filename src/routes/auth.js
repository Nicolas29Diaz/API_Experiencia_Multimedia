import { Router } from "express";

import { authenticateUser } from "../controllers/authController";
const router = Router();

router.post("/", authenticateUser);

export default router;
