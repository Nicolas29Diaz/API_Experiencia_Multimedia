import { Router } from "express";
import { getAllProductsC1, getPracticeOneProductInfoPerGroup, getPracticeOneProductAtributesPerGroup, getPracticeOneProductPerStudent, getPracticeOneProductInfoPerStudent, getPracticeOneProductAtributes } from "../../controllers/productoCorte1Controller";
import { getAllProductsC2, getPracticeTwoProductInfoPerGroup, getPracticeTwoProductAtributesPerGroup, getProductInfoPerSubgroupAndStudent, getPracticeTwoProductAtributes } from "../../controllers/productoCorte2Controller";
import { getAllProductsC3, getPracticeThreeProductInfoPerGroup, getPracticeThreeProductAtributesPerGroup, getPracticeThreeProductPerStudent, getPracticeThreeProductInfoPerStudent, getPracticeThreeProductAtributes } from "../../controllers/productoCorte3Controller";

const router = Router();

router.get("/corte1", getAllProductsC1);
// Conocer la informacion de un producto de acuerdo al grupo al que fue asignado:
router.get("/corte1/:nombreGrupo", getPracticeOneProductInfoPerGroup);
// Conocer los atributos asignados al producto de un grupo especifico:
router.get("/corte1/atributos/:nombreGrupo", getPracticeOneProductAtributesPerGroup);
// Conocer los productos que tuvo/tiene que inspeccionar un estudiante especifico:
router.get("/corte1/inspeccion/:idEstudiante", getPracticeOneProductPerStudent);
// Consultar toda la informacion de los productos asignados a un estudiante especifico (incluyendo los atributos)
router.get("/corte1/inspeccion/atributos/:idEstudiante", getPracticeOneProductInfoPerStudent);
// Consultar los atributos de un determinado producto especifico:
router.get("/corte1/atributos/inspeccion/:idProductoC1", getPracticeOneProductAtributes);

router.get("/corte2", getAllProductsC2);
// Conocer la informacion de un producto de acuerdo al grupo al que fue asignado:
router.get("/corte2/:idPractica/:nombreGrupo", getPracticeTwoProductInfoPerGroup);
// Conocer los atributos asignados al producto de un grupo especifico:
router.get("/corte2/atributos/grupo/:nombreGrupo", getPracticeTwoProductAtributesPerGroup);
// Conocer la informacion de los productos pertenecientes a un subgrupo especifico de un estudiante especifico para una practica determinada:
router.get("/corte2/inspeccion/:idPractica/:idEstudiante/:nombreSubgrupo", getProductInfoPerSubgroupAndStudent);
// Consultar los atributos de un determinado producto especifico:
router.get("/corte2/atributos/inspeccion/:idProductoC2", getPracticeTwoProductAtributes);

router.get("/corte3", getAllProductsC3);
// Conocer la informacion de un producto de acuerdo al grupo al que fue asignado:
router.get("/corte3/:idPractica/:nombreGrupo", getPracticeThreeProductInfoPerGroup);
// Conocer los atributos asignados al producto de un grupo especifico:
router.get("/corte3/atributos/grupo/:nombreGrupo", getPracticeThreeProductAtributesPerGroup);
// Conocer los productos que tuvo/tiene que inspeccionar un estudiante especifico:
router.get("/corte3/inspeccion/estudiante/:idEstudiante", getPracticeThreeProductPerStudent);
// Consultar toda la informacion de los productos asignados a un estudiante especifico (incluyendo atributos)
router.get("/corte3/inspeccion/atributos/estudiante/:idEstudiante", getPracticeThreeProductInfoPerStudent);
// Consultar los atributos de un determinado producto especifico:
router.get("/corte3/atributos/inspeccion/:idProductoC3", getPracticeThreeProductAtributes);

export default router;
