import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import GrupoEstudiante from "./GrupoEstudiante";

const Estudiante = sequelize.define(
  "estudiante",
  {
    idEstudiante: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    nombreEstudiante: { type: DataTypes.STRING(50), allowNull: false },
    apellidoEstudiante: { type: DataTypes.STRING(50), allowNull: false },
    emailEstudiante: { type: DataTypes.STRING(100), allowNull: false },
    contrasenaEstudiante: { type: DataTypes.STRING(100), allowNull: false },
  },
  { tableName: "estudiante", timestamps: false }
);

Estudiante.hasMany(GrupoEstudiante, {
  foreignKey: "idEstudianteGE",
  sourceKey: "idEstudiante",
});
GrupoEstudiante.belongsTo(Estudiante, {
  foreignKey: "idEstudianteGE",
  sourceKey: "idEstudiante",
});

export default Estudiante;
