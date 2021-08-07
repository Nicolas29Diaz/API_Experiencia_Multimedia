import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";
import GraficoPractica from "./GraficoPractica";

const Grafico = sequelize.define(
  "grafico",
  {
    idGrafico: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    nombreGrafico: { type: DataTypes.STRING(50), allowNull: false },
  },
  { tableName: "grafico", timestamps: false }
);

Grafico.hasMany(GraficoPractica, {
  foreignKey: "idGraficoGP",
  sourceKey: "idGrafico",
});
GraficoPractica.belongsTo(Grafico, {
  foreignKey: "idGraficoGP",
  sourceKey: "idGrafico",
});

export default Grafico;
