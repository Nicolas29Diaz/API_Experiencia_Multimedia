import { Router } from "express";
import { createAtribute, getAllAtributes } from "../../controllers/atributoController";
import { createProductOneAtribute, getAllProduct1Atributes } from "../../controllers/productoAtributo1Controller";
import { createProductTwoAtribute, getAllProduct2Atributes } from "../../controllers/productoAtributo2Controller";
import { createProductThreeAtribute, getAllProduct3Atributes } from "../../controllers/productoAtributo3Controller";

const router = Router();

// Atributos

// Inserciones
router.post("/", createAtribute);
router.post("/producto1", createProductOneAtribute);
router.post("/producto2", createProductTwoAtribute);
router.post("/producto3", createProductThreeAtribute);

// Consultas
router.get("/", getAllAtributes);
router.get("/producto1", getAllProduct1Atributes);
router.get("/producto2", getAllProduct2Atributes);
router.get("/producto3", getAllProduct3Atributes);

export default router;
