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
  getGraphicsByPractice,
  getFeaturesC2,
} from "../../controllers/productoCorte2Controller";
import {
  getAllProductsC3,
  getPracticeThreeProductPerStudent,
  createInspectionProductC3,
  getPracticeThreeProductInfoPerStudent,
  getFeaturesC3,
  updateProductsState,
} from "../../controllers/productoCorte3Controller";
import { verifyUser } from "../../middleware/auth";

const router = Router();
// /api/producto

/* Corte Uno */

//Inserciones
/** Ruta para crear los productos de inspección */
router.get(
  "/corte1/referencia/:idPractica/estudiante/:idEstudiante",
  verifyUser,
  createInspectionProductC1
);

router.get(
  "/corte1/caracteristicas/:idPractica/estudiante/:idEstudiante",
  verifyUser,
  getFeatures
);

// Consultas
router.get("/corte1", getAllProductsC1);

/** Ruta para obtener los productos de inspección */
router.get(
  "/corte1/inspeccion/:idPractica/estudiante/:idEstudiante",
  verifyUser,
  getPracticeOneProductInfoPerStudent
);

/* Corte 2 */

//Inserciones
/** Ruta para crear los productos de inspección */
router.get(
  "/corte2/referencia/:idPractica/estudiante/:idEstudiante",
  verifyUser,
  createInspectionProductC2
);

router.get(
  "/corte2/caracteristicas/:idPractica/estudiante/:idEstudiante",
  verifyUser,
  getFeaturesC2
);

/** Ruta para obtener los graficos de la práctica 2*/
router.get("/corte2/graficos/:idPractica/", verifyUser, getGraphicsByPractice);

// Consultas
/** Ruta para obtener los productos de inspección */
router.get(
  "/corte2/inspeccion/:idPractica/estudiante/:idEstudiante/subgrupo",
  verifyUser,
  getProductInfoPerSubgroupAndStudent
);

/* Corte 3 */

// Inserciones
/** Ruta para crear los productos de inspección */
router.post("/corte3/inspeccion", verifyUser, createInspectionProductC3);

// Consultas
router.get("/corte3", verifyUser, getAllProductsC3);

router.get(
  "/corte3/referencia/:idPractica/estudiante/:idEstudiante",
  verifyUser,
  getPracticeThreeProductPerStudent
);

router.get(
  "/corte3/inspeccion/:idPractica/estudiante/:idEstudiante",
  verifyUser,
  getPracticeThreeProductInfoPerStudent
);

router.get(
  "/corte3/caracteristicas/:idPractica/estudiante/:idEstudiante",
  verifyUser,
  getFeaturesC3
);

router.put(
  "/corte3/actualizar/:idPractica/estudiante/:idEstudiante",
  verifyUser,
  updateProductsState
);

export default router;
