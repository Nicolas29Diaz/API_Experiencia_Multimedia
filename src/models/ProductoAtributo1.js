import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";

const ProductoAtributo1 = sequelize.define(
  "producto_atributo_1",
  {
    idProductoAtributo1: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  },
  { tableName: "producto_atributo_1", timestamps: false }
);

export default ProductoAtributo1;
