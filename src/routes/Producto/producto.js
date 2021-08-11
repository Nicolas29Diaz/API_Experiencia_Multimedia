import { Router } from "express";
import {createReferenceProductC1, createInspectionProductC1, getAllProductsC1, getPracticeOneProductInfoPerGroup, getPracticeOneProductAtributesPerGroup, getPracticeOneProductPerStudent, getPracticeOneProductInfoPerStudent, getPracticeOneProductAtributes } from "../../controllers/productoCorte1Controller";
import {createReferenceProductC2, createInspectionProductC2, getAllProductsC2, getPracticeTwoProductInfoPerGroup, getPracticeTwoProductAtributesPerGroup, getProductInfoPerSubgroupAndStudent, getPracticeTwoProductAtributes } from "../../controllers/productoCorte2Controller";
import {createReferenceProductC3TypeA, createInspectionProductC3TypeA, createReferenceProductC3TypeV, createInspectionProductC3TypeV, getAllProductsC3, getPracticeThreeProductInfoPerGroup, getPracticeThreeProductAtributesPerGroup, getPracticeThreeProductPerStudent, getPracticeThreeProductInfoPerStudent, getPracticeThreeProductAtributes } from "../../controllers/productoCorte3Controller";

const router = Router();

// Corte Uno

// Inserciones
router.post("/corte1/referencia", createReferenceProductC1);
router.post("/corte1/inspeccion", createInspectionProductC1);

// Consultas
router.get("/corte1", getAllProductsC1);
// Conocer la informacion de un producto de acuerdo al grupo al que fue asignado:
router.get("/corte1/:idPractica/:nombreGrupo", getPracticeOneProductInfoPerGroup);
// Conocer los atributos asignados al producto de un grupo especifico:
router.get("/corte1/atributos/grupo/:nombreGrupo", getPracticeOneProductAtributesPerGroup);//Toca agregar el id de la practica
// Conocer los productos que tuvo/tiene que inspeccionar un estudiante especifico:
router.get("/corte1/inspeccion/estudiante/:idEstudiante", getPracticeOneProductPerStudent);
// Consultar toda la informacion de los productos asignados a un estudiante especifico (incluyendo los atributos)
router.get("/corte1/inspeccion/atributos/:idEstudiante", getPracticeOneProductInfoPerStudent);
// Consultar los atributos de un determinado producto especifico:
router.get("/corte1/atributos/inspeccion/:idProductoC1", getPracticeOneProductAtributes);

// Corte 2

// Inserciones
router.post("/corte2/referencia", createReferenceProductC2);
router.post("/corte2/inspeccion", createInspectionProductC2);

// Consultas
router.get("/corte2", getAllProductsC2);
// Conocer la informacion de un producto de acuerdo al grupo al que fue asignado:
router.get("/corte2/:idPractica/:nombreGrupo", getPracticeTwoProductInfoPerGroup);
// Conocer los atributos asignados al producto de un grupo especifico:
router.get("/corte2/atributos/grupo/:nombreGrupo", getPracticeTwoProductAtributesPerGroup);
// Conocer la informacion de los productos pertenecientes a un subgrupo especifico de un estudiante especifico para una practica determinada:
router.get("/corte2/inspeccion/:idPractica/:idEstudiante/:nombreSubgrupo", getProductInfoPerSubgroupAndStudent);
// Consultar los atributos de un determinado producto especifico:
router.get("/corte2/atributos/inspeccion/:idProductoC2", getPracticeTwoProductAtributes);

// Corte 3

// Inserciones
// Si el muestreo es por atributos:
router.post("/corte3/referencia/atributos", createReferenceProductC3TypeA);
router.post("/corte3/inspeccion/atributos", createInspectionProductC3TypeA);
// Si el muestreo es por variables:
router.post("/corte3/referencia/variables", createReferenceProductC3TypeV);
router.post("/corte3/inspeccion/variables", createInspectionProductC3TypeV);

// Consultas
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
