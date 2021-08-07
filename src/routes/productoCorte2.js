import { Router } from "express";
import {
  getAllProductsC2,
  getOneProductC2,
} from "../controllers/productoCorte2Controller";

const router = Router();

//api/productocorte2
router.get("/", getAllProductsC2);
router.get("/:idProductoC2", getOneProductC2);

export default router;
