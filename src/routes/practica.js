import { Router } from "express";
import {
  createPractice,
  getAllPractica,
  getPracticeStudentsPerGroup,
  getStudentsPerGroup,
  getStudentCountPerGroup,
  getPracticeOneProductPerGroup,
  getPracticeGraphics,
  getPracticeTwoProductPerGroup,
  getPracticeThreeProductPerGroup,
  getPracticeThreeGroupMethods
} from "../controllers/practicaController";
const router = Router();

// Inserciones
router.post("/", createPractice);

// Consultas
// api/practica
router.get("/", getAllPractica);
// Conocer el nombre de los estudiantes de cada grupo para una determinada practica:
router.get("/:idPractica", getPracticeStudentsPerGroup);
// Conocer el nombre de los integrantes de un grupo especifico en una practica determinada:
router.get("/grupo/:idPractica/:nombreGrupo", getStudentsPerGroup);
// Conocer la cantidad de estudiantes de cada grupo para una practica especifica:
router.get("/integrantes/:idPractica", getStudentCountPerGroup);
// Conocer que producto se le asigno a cada grupo para una determinada practica del corte 1:
router.get("/producto1/:idPractica", getPracticeOneProductPerGroup);
// Conocer el nombre de los graficos que se han seleccionado para una practica segun su nombre:
router.get("/graficos/:idPractica", getPracticeGraphics);
// Conocer que producto se le asigno a cada grupo para una determinada practica del corte 2:
router.get("/producto2/:idPractica", getPracticeTwoProductPerGroup);
// Conocer que producto se le asigno a cada grupo para una determinada practica del corte 3:
router.get("/producto3/:idPractica", getPracticeThreeProductPerGroup);
// Consultar los metodos asignados a un grupo especifico en una practica determinadad:
router.get("/producto3/:nombreGrupo/:idPractica", getPracticeThreeGroupMethods);
export default router;
