import { Router } from "express";
import {
  createInspectionProductC1,
  getAllProductsC1,
  getPracticeOneProductInfoPerGroup,
  getPracticeOneProductAtributesPerGroup,
  getPracticeOneProductPerStudent,
  getPracticeOneProductInfoPerStudent,
  getPracticeOneProductAtributes,
} from "../../controllers/productoCorte1Controller";
import {
  createReferenceProductC2,
  createInspectionProductC2,
  getAllProductsC2,
  getPracticeTwoProductInfoPerGroup,
  getPracticeTwoProductAtributesPerGroup,
  getProductInfoPerSubgroupAndStudent,
  getPracticeTwoProductAtributes,
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
  "/corte1/inspeccion/:idPractica/estudiante/:idEstudiante",
  createInspectionProductC1
);

// Consultas
router.get("/corte1", getAllProductsC1);
// Conocer la informacion de un producto de acuerdo al grupo al que fue asignado:
router.get(
  "/corte1/:idPractica/:nombreGrupo",
  getPracticeOneProductInfoPerGroup
);
// Conocer los atributos asignados al producto de un grupo especifico:
router.get(
  "/corte1/atributos/grupo/:nombreGrupo/:idPractica",
  getPracticeOneProductAtributesPerGroup
); //Toca agregar el id de la practica
// Consultar toda la informacion de los productos asignados a un estudiante especifico (incluyendo los atributos)
router.get(
  "/corte1/inspeccion/atributos/:idEstudiante",
  getPracticeOneProductInfoPerStudent
);
// Consultar los atributos de un determinado producto especifico:
router.get(
  "/corte1/atributos/inspeccion/:idProductoC1",
  getPracticeOneProductAtributes
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
