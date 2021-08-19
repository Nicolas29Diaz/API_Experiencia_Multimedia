import { Router } from "express";
import {
  insertCourse,
  getAllCourses,
  getOneCourse,
  getCourseByTeacher,
  getPracticePerCourse,
  getStudentCourse,
  getCourseStudent,
} from "../controllers/cursoController";

const router = Router();

// Inserciones
router.post("/", insertCourse);

// Consultas
// /api/curso
router.get("/", getAllCourses);
// Obetener la información de un curso
router.get("/:idCurso", getOneCourse);
// Conocer que cursos pertenecen a un profesor
router.get("/profesor/:idProfesorC", getCourseByTeacher);
// Conocer que practicas tiene asignadas un curso especifico:
router.get("/practica/:idCurso", getPracticePerCourse);
// Conocer a que curso pertenece un estudiante especifico:
router.get("/estudiante/:idEstudiante", getStudentCourse);
// Conocer que estudiantes pertencen a un curso
router.get("/curso/:idCurso", getCourseStudent);

export default router;
