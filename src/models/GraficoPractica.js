import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";

const GraficoPractica = sequelize.define(
  "grafico_practica",
  {
    idGraficoPractica: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    idPracticaGP: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idGraficoGP: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { tableName: "grafico_practica", timestamps: false }
);

export default GraficoPractica;
