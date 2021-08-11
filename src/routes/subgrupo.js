import { Router } from "express";

import {
  createSubgroup,
  getAllSubgroups,
  getOneSubgroup,
  getSubgroupSize,
  getSubgroupCount
} from "../controllers/subgrupoController";
const router = Router();

// Inserciones
router.post("/", createSubgroup);

// Consultas
// /api/subgrupo
router.get("/", getAllSubgroups);
router.get("/:idSubgrupo", getOneSubgroup);
// Conocer el tamaño de cada subgrupo para cada grupo de estudiantes:
router.get("/practica/:idPractica", getSubgroupSize);
// Conocer cuantos subgrupos se le asignaron a un grupo especifico en una practica especifica:
router.get("/:nombreGrupo/:idPractica", getSubgroupCount);
export default router;
