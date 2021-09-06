import { Router } from "express";
import {
  createInspectionProductC1,
  getAllProductsC1,
  getPracticeOneProductInfoPerStudent,
} from "../../controllers/productoCorte1Controller";
import {
  createInspectionProductC2,
  getAllProductsC2,
  getProductInfoPerSubgroupAndStudent,
} from "../../controllers/productoCorte2Controller";
import {
  getAllProductsC3,
  getPracticeThreeProductPerStudent,
  createInspectionProductC3,
  getPracticeThreeProductInfoPerStudent,
} from "../../controllers/productoCorte3Controller";

const router = Router();

// Corte Uno

// Inserciones
router.get(
  "/corte1/referencia/:idPractica/estudiante/:idEstudiante",
  createInspectionProductC1
);

// Consultas
router.get("/corte1", getAllProductsC1);

// Consultar toda la informacion de los productos asignados a un estudiante especifico (incluyendo los atributos)
router.get(
  "/corte1/inspeccion/:idPractica/estudiante/:idEstudiante",
  getPracticeOneProductInfoPerStudent
);

// Corte 2

router.get(
  "/corte2/inspeccion/:idPractica/estudiante/:idEstudiante",
  createInspectionProductC2
);

// Consultas
router.get("/corte2", getAllProductsC2);
// Conocer la informacion de los productos pertenecientes a un subgrupo especifico de un estudiante especifico para una practica determinada:
router.get(
  "/corte2/inspeccion/:idPractica/estudiante/:idEstudiante/subgrupo",
  getProductInfoPerSubgroupAndStudent
);

// Corte 3
router.post("/corte3/inspeccion", createInspectionProductC3);
// Inserciones

// Consultas
router.get("/corte3", getAllProductsC3);

router.get(
  "/corte3/referencia/:idPractica/estudiante/:idEstudiante",
  getPracticeThreeProductPerStudent
);

router.get(
  "/corte3/inspeccion/:idPractica/estudiante/:idEstudiante",
  getPracticeThreeProductInfoPerStudent
);

export default router;
