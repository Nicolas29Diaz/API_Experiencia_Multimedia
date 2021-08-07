import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";
import Practica from "./Practica";

const Corte = sequelize.define(
  "corte",
  {
    idCorte: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    nombreCorte: { type: DataTypes.STRING(20), allowNull: false },
  },
  { tableName: "corte", timestamps: false }
);

Corte.hasMany(Practica, { foreignKey: "idCorteP", sourceKey: "idCorte" });
Practica.belongsTo(Corte, { foreignKey: "idCorteP", sourceKey: "idCorte" });

export default Corte;
