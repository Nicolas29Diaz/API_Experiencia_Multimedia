import { Router } from "express";
import {
  getAllCourses,
  getOneCourse,
  getCourseByTeacher,
  getPracticePerCourse,
  getStudentCourse
} from "../controllers/cursoController";

const router = Router();

// /api/curso
router.get("/", getAllCourses);
router.get("/:idCurso", getOneCourse);

// api/curso/profesor/idProfesor
// Conocer que cursos pertenecen a un profesor
router.get("/profesor/:idProfesorC", getCourseByTeacher);
// Conocer que practicas tiene asignadas un curso especifico:
router.get("/practica/:idCurso", getPracticePerCourse);
// Conocer a que curso pertenece un estudiante especifico:
router.get("/estudiante/:idEstudiante", getStudentCourse);

export default router;
