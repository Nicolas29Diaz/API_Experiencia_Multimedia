import { Router } from "express";
import { getAllAtributes } from "../../controllers/atributoController";
import { getAllProduct1Atributes } from "../../controllers/productoAtributo1Controller";
import { getAllProduct2Atributes } from "../../controllers/productoAtributo2Controller";
import { getAllProduct3Atributes } from "../../controllers/productoAtributo3Controller";

const router = Router();

router.get("/", getAllAtributes);

router.get("/producto1", getAllProduct1Atributes);
router.get("/producto2", getAllProduct2Atributes);
router.get("/producto3", getAllProduct3Atributes);

export default router;
