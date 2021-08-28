import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";

const GraficoPractica = sequelize.define(
  "grafico_practica",
  {
    idGraficoPractica: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
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
