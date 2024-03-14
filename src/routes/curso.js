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
import { verifyUser, permitirSoloProfesor } from "../middleware/auth";

const router = Router();

// /api/cursos

// Inserciones
router.post("/", verifyUser, permitirSoloProfesor, createCourse);

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
router.delete(
  "/curso/:idCurso",
  verifyUser,
  permitirSoloProfesor,
  deleteCourse
);
// actualizar curso
router.put("/curso/:idCurso", verifyUser, permitirSoloProfesor, updateCourse);
export default router;
