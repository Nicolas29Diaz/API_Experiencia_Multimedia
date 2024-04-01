import Estudiante from "../models/Estudiante";
import Profesor from "../models/Profesor";
import jwt from "jsonwebtoken";
import { hashedPassword } from "../helpers";
import { sequelize } from "../config/database";

export async function registerUser(req, res) {
  try {
    const { firstname, lastname, email, password, role } = req.body;

    let findUser = "";

    if (role.value === "estudiante") {
      findUser = await Estudiante.findOne({
        where: { emailEstudiante: email },
      });

      if (findUser) {
        return res.status(400).json({ msg: "Este usuario ya existe" });
      }

      //Hashear el password
      const passwordHashed = await hashedPassword(password);

      // Creamos un id de 9 digitos
      const id = Math.floor(100_000_000 + Math.random() * 900_000_000);
      //   Creamos el estudiante
      const createStudent = await Estudiante.create(
        {
          idEstudiante: id,
          nombreEstudiante: firstname,
          apellidoEstudiante: lastname,
          emailEstudiante: email,
          contrasenaEstudiante: passwordHashed,
        },
        {
          fields: [
            "idEstudiante",
            "nombreEstudiante",
            "apellidoEstudiante",
            "emailEstudiante",
            "contrasenaEstudiante",
          ],
        }
      );

      //Crear y firmar el JWT
      const payload = {
        user: {
          id: createStudent.dataValues.idEstudiante,
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
    }

    if (role.value === "profesor") {
      findUser = await Profesor.findOne({ where: { emailProfesor: email } });
      if (findUser) {
        return res.status(400).json({ msg: "Este usuario ya esta registrado" });
      }

      //Hashear el password
      const passwordHashed = await hashedPassword(password);

      const id = Math.floor(100_000_000 + Math.random() * 900_000_000);

      //   Creamos el profesor
      const createTeacher = await Profesor.create(
        {
          idProfesor: id,
          nombreProfesor: firstname,
          apellidoProfesor: lastname,
          emailProfesor: email,
          contrasenaProfesor: passwordHashed,
        },
        {
          fields: [
            "idProfesor",
            "nombreProfesor",
            "apellidoProfesor",
            "emailProfesor",
            "contrasenaProfesor",
          ],
        }
      );

      const payload = {
        user: {
          id: createTeacher.dataValues.idProfesor,
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
    }
  } catch (error) {
    res.status(500).json("Hubo un error");
    console.log(error);
  }
}

export async function registerUsers(req, res) {
  const studentsArray = req.body;
  console.log(req.body);
  const bulkData = [];
  // Construir el array de datos para la inserción masiva
  for (const student of studentsArray) {
    const passwordHashed = await hashedPassword(student.password);
    bulkData.push({
      idEstudiante: student.id,
      nombreEstudiante: student.firstname,
      apellidoEstudiante: student.lastname,
      emailEstudiante: student.email,
      contrasenaEstudiante: passwordHashed,
    });
  }
  let response = null;
  // console.log(bulkData);
  try {
    // Iniciar una transacción
    await sequelize.transaction(async (t) => {
      // Realizar la inserción masiva
      response = await Estudiante.bulkCreate(bulkData, {
        transaction: t,
      });
    });

    // Enviar respuesta de éxito
    res.json({ response });
  } catch (error) {
    // Manejar cualquier error que ocurra durante la inserción
    console.error("Error al insertar estudiantes:", error);
    res.status(500).json({ msg: "Hubo un error al registrar los estudiantes" });
  }
}
