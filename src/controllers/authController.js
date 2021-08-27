import Estudiante from "../models/Estudiante";
import Profesor from "../models/Profesor";
import jwt from "jsonwebtoken";
import { comparePassword } from "../helpers";

// api/auth/
export async function authenticateUser(req, res) {
  const { email, password } = req.body;
  try {
    // Revisar que es un usuario registrado

    const estudiante = await Estudiante.findOne({
      where: { emailEstudiante: email },
    });
    const profesor = await Profesor.findOne({
      where: { emailProfesor: email },
    });

    if (!estudiante && !profesor) {
      return res.status(400).json({ msg: "El usuario no existe" });
    }

    // Revisar password
    const correctPassword = await comparePassword(
      password,
      estudiante?.contrasenaEstudiante || profesor?.contrasenaProfesor
    );

    if (!correctPassword) {
      return res.status(400).json({ msg: "Contraseña incorrecta" });
    }

    // Si todo es correcto crear y firmar el JWT
    const payload = {
      user: {
        id: estudiante?.idEstudiante || profesor?.idProfesor,
      },
    };

    // Firmar el JWT
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
  } catch (error) {
    console.log(error);
  }
}
