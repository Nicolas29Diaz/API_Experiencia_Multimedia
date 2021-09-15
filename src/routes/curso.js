import { Router } from "express";
import {
  createCourse,
  getAllCourses,
  getOneCourse,
  getCourseByTeacher,
  getPracticePerCourse,
  getStudentCourse,
  getCourseStudent,
  updateCourse,
  deleteCourse,
} from "../controllers/cursoController";
import { verifyUser } from "../middleware/auth";

const router = Router();

// /api/cursos

// Inserciones
router.post("/", verifyUser, createCourse);

// Consultas
router.get("/", verifyUser, getAllCourses);
// Obetener la información de un curso
router.get("/:idCurso", verifyUser, getOneCourse);
// Conocer que cursos pertenecen a un profesor
router.get("/profesor/:idProfesorC", getCourseByTeacher);
// Conocer que practicas tiene asignadas un curso especifico:
router.get("/practica/:idCurso", getPracticePerCourse);
// Conocer a que curso pertenece un estudiante especifico:
router.get("/estudiante/:idEstudiante", getStudentCourse);
// Conocer que estudiantes pertencen a un curso
router.get("/curso/:idCurso", getCourseStudent);

// Eliminar curso
router.delete("/curso/:idCurso", verifyUser, deleteCourse);
// actualizar curso
router.put("/curso/:idCurso", verifyUser, updateCourse);
export default router;
