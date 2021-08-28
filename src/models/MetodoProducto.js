import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";

const MetodoProducto = sequelize.define(
  "metodo_producto",
  {
    idMetodoProducto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    idMetodoMP: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idProductoMP: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { tableName: "metodo_producto", timestamps: false }
);

export default MetodoProducto;
