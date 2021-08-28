import Estudiante from "../models/Estudiante";
import Profesor from "../models/Profesor";
import jwt from "jsonwebtoken";
import { comparePassword } from "../helpers";

// api/auth/
export async function authenticateUser(req, res) {
  const { email, password, role } = req.body;
  try {
    // Revisar que es un usuario registrado

    if (role.value === "estudiante") {
      const estudiante = await Estudiante.findOne({
        where: { emailEstudiante: email },
      });

      if (!estudiante) {
        return res.status(400).json({ msg: "El usuario no existe" });
      }

      // Revisar password
      const correctPassword = await comparePassword(
        password,
        estudiante.contrasenaEstudiante
      );

      if (!correctPassword) {
        return res.status(400).json({ msg: "Contraseña incorrecta" });
      }

      const payload = {
        user: {
          id: estudiante?.idEstudiante,
        },
      };

      // Si todo es correcto crear y firmar el JWT
      jwt.sign(
        payload,
        process.env.SECRET_WORD,
        {
          expiresIn: 60 * 60 * 24,
        },
        (error, token) => {
          if (error) throw error;

          res.status(200).json({ token });
        }
      );
    }

    if (role.value === "profesor") {
      const profesor = await Profesor.findOne({
        where: { emailProfesor: email },
      });

      if (!profesor) {
        return res.status(400).json({ msg: "El usuario no existe" });
      }

      // Revisar password
      const correctPassword = await comparePassword(
        password,
        profesor?.contrasenaProfesor
      );

      if (!correctPassword) {
        return res.status(400).json({ msg: "Contraseña incorrecta" });
      }

      const payload = {
        user: {
          id: profesor?.idProfesor,
        },
      };

      // Si todo es correcto crear y firmar el JWT
      jwt.sign(
        payload,
        process.env.SECRET_WORD,
        {
          expiresIn: 60 * 60 * 24,
        },
        (error, token) => {
          if (error) throw error;

          res.status(200).json({ token });
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
}

// Obtiene el usuario autenticado

export async function userAuthenticated(req, res) {
  try {
    const estudiante = await Estudiante.findOne({
      where: { idEstudiante: req.user.id },
      attributes: {
        exclude: ["contrasenaEstudiante"],
      },
    });
    const profesor = await Profesor.findOne({
      where: { idProfesor: req.user.id },
      attributes: {
        exclude: ["contrasenaProfesor"],
      },
    });

    if (estudiante) {
      res.json({ estudiante });
    }
    if (profesor) {
      res.json({ profesor });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
}
