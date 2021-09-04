import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import ProductoCorte1 from "./ProductoCorte1";
import ProductoCorte2 from "./ProductoCorte2";

const GrupoEstudiante = sequelize.define(
  "grupo_estudiante",
  {
    idGrupoEstudiante: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    fechaHoraGrupoEstudiante: { type: DataTypes.DATE, allowNull: false },
    idGrupoGE: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idEstudianteGE: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    finalizado: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
  },
  { tableName: "grupo_estudiante", timestamps: false }
);

GrupoEstudiante.hasMany(ProductoCorte1, {
  foreignKey: "idGrupoEstudiantePC1",
  sourceKey: "idGrupoEstudiante",
});

ProductoCorte1.belongsTo(GrupoEstudiante, {
  foreignKey: "idGrupoEstudiantePC1",
  sourceKey: "idGrupoEstudiante",
});

GrupoEstudiante.hasMany(ProductoCorte2, {
  foreignKey: "idGrupoEstudiantePC2",
  sourceKey: "idGrupoEstudiante",
});

ProductoCorte2.belongsTo(GrupoEstudiante, {
  foreignKey: "idGrupoEstudiantePC2",
  sourceKey: "idGrupoEstudiante",
});

export default GrupoEstudiante;
