import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import GrupoEstudiante from "./GrupoEstudiante";

const Grupo = sequelize.define(
  "grupo",
  {
    idGrupo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nombreGrupo: { type: DataTypes.STRING(50), allowNull: false },
    idPracticaG: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { tableName: "grupo", timestamps: false }
);

Grupo.hasMany(GrupoEstudiante, {
  foreignKey: "idGrupoGE",
  sourceKey: "idGrupo",
});
GrupoEstudiante.belongsTo(Grupo, {
  foreignKey: "idGrupoGE",
  sourceKey: "idGrupo",
});

export default Grupo;
