import { Router } from "express";

import {
  createSubgroupProduct,
  getAllSubgroupsProduct,
  getOneSubgroupProduct,
} from "../controllers/subgrupoProductoController";
const router = Router();

// Inserciones
router.post("/", createSubgroupProduct);

// Consultas
// /api/subgrupoProducto
router.get("/", getAllSubgroupsProduct);
router.get("/:idSubgrupoProducto", getOneSubgroupProduct);

export default router;
