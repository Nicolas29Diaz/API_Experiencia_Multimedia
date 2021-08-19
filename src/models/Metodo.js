import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";
import MetodoProducto from "./MetodoProducto";

const Metodo = sequelize.define(
  "metodo",
  {
    idMetodo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nombreMetodo: { type: DataTypes.STRING(20), allowNull: false },
  },
  { tableName: "metodo", timestamps: false }
);

Metodo.hasMany(MetodoProducto, {
  foreignKey: "idMetodoMP",
  sourceKey: "idMetodo",
});
MetodoProducto.belongsTo(Metodo, {
  foreignKey: "idMetodoMP",
  sourceKey: "idMetodo",
});

export default Metodo;
