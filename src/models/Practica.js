import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";
import GraficoPractica from "./GraficoPractica";
import Grupo from "./Grupo";

const Practica = sequelize.define(
  "practica",
  {
    idPractica: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    nombrePractica: { type: DataTypes.STRING(100), allowNull: false },
    descripcionPractica: { type: DataTypes.TEXT, allowNull: false },
    fechaHoraPublicacionPractica: { type: DataTypes.DATE, allowNull: false },
    idCursoP: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idCorteP: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { tableName: "practica", timestamps: false }
);

Practica.hasMany(GraficoPractica, {
  foreignKey: "idPracticaGP",
  sourceKey: "idPractica",
});
GraficoPractica.belongsTo(Practica, {
  foreignKey: "idPracticaGP",
  sourceKey: "idPractica",
});

Practica.hasMany(Grupo, {
  foreignKey: "idPracticaG",
  sourceKey: "idPractica",
});
Grupo.belongsTo(Practica, {
  foreignKey: "idPracticaG",
  sourceKey: "idPractica",
});

export default Practica;
