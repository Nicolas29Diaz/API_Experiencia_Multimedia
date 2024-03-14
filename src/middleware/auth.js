import jwt from "jsonwebtoken";
import Estudiante from "../models/Estudiante";
import Profesor from "../models/Profesor";

export async function verifyUser(req, res, next) {
  // Leer el token del header
  const token = req.header("x-auth-token");

  // Revisar si no hay token
  if (!token)
    return res.status(401).json({ msg: "No hay token, permiso no válido" });

  try {
    // Validar el token
    const decoded = jwt.verify(token, process.env.SECRET_WORD);

    // Guardar la información del usuario en el request para su uso posterior
    req.user = decoded.user;

    // Verificar si el usuario es un profesor
    const existeProfesor = await Profesor.findOne({
      where: { idProfesor: req.user.id },
    });

    // Si no existe el profesor, entonces el usuario es un estudiante
    if (!existeProfesor) {
      req.user.tipoUsuario = "estudiante";
      console.log(req.user.tipoUsuario);
    } else {
      req.user.tipoUsuario = "profesor";
      console.log(req.user.tipoUsuario);
    }

    next(); // Continuar con la ejecución del siguiente middleware o ruta
  } catch (error) {
    res.status(401).json({ msg: "Token no válido" });
  }
}

// Middleware para permitir solo a profesores
export function permitirSoloProfesor(req, res, next) {
  if (req.user && req.user.tipoUsuario === "profesor") {
    next();
  } else {
    res.status(403).json({ msg: "Acceso denegado: No eres un profesor" });
  }
}
