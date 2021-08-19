import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";
import Practica from "./Practica";

const Curso = sequelize.define(
  "curso",
  {
    idCurso: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nombreCurso: { type: DataTypes.STRING(25), allowNull: false },
    periodoAcademico: { type: DataTypes.STRING(25), allowNull: false },
    idProfesorC: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { tableName: "curso", timestamps: false }
);

Curso.hasMany(Practica, { foreignKey: "idCursoP", sourceKey: "idCurso" });
Practica.belongsTo(Curso, { foreignKey: "idCursoP", sourceKey: "idCurso" });

export default Curso;
