import { Router } from "express";
import {
  createInspectionProductC1,
  getAllProductsC1,
  getPracticeOneProductInfoPerStudent,
  getFeatures,
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
// /api/producto

/* Corte Uno */

//Inserciones
/** Ruta para crear los productos de inspección */
router.get(
  "/corte1/referencia/:idPractica/estudiante/:idEstudiante",
  createInspectionProductC1
);

router.get(
  "/corte1/caracteristicas/:idPractica/estudiante/:idEstudiante",
  getFeatures
);

// Consultas
router.get("/corte1", getAllProductsC1);

/** Ruta para obtener los productos de inspección */
router.get(
  "/corte1/inspeccion/:idPractica/estudiante/:idEstudiante",
  getPracticeOneProductInfoPerStudent
);

/* Corte 2 */

//Inserciones
/** Ruta para crear los productos de inspección */
router.get(
  "/corte2/referencia/:idPractica/estudiante/:idEstudiante",
  createInspectionProductC2
);

// Consultas
/** Ruta para obtener los productos de inspección */
router.get(
  "/corte2/inspeccion/:idPractica/estudiante/:idEstudiante/subgrupo",
  getProductInfoPerSubgroupAndStudent
);

/* Corte 3 */

// Inserciones
/** Ruta para crear los productos de inspección */
router.post("/corte3/inspeccion", createInspectionProductC3);

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
