import { Router } from "express";
import {
  getAllProductsC1,
  getOneProductC1,
} from "../controllers/productoCorte1Controller";

const router = Router();

//api/productocorte1
router.get("/", getAllProductsC1);
router.get("/:idProductoC1", getOneProductC1);

export default router;
