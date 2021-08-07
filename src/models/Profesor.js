import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";

import Curso from "./Curso";

const Profesor = sequelize.define(
  "profesor",
  {
    idProfesor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    nombreProfesor: { type: DataTypes.STRING(50), allowNull: false },
    apellidoProfesor: { type: DataTypes.STRING(50), allowNull: false },
  },
  { tableName: "profesor", timestamps: false }
);

Profesor.hasMany(Curso, { foreignKey: "idProfesorC", sourceKey: "idProfesor" });
Curso.belongsTo(Profesor, {
  foreignKey: "idProfesorC",
  sourceKey: "idProfesor",
});

export default Profesor;
