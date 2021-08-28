import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";

const ProductoAtributo3 = sequelize.define(
  "producto_atributo_3",
  {
    idProductoAtributo3: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    idAtributoPA3: { type: DataTypes.INTEGER, allowNull: false },
    idProductoC3A: { type: DataTypes.INTEGER, allowNull: false },
  },
  { tableName: "producto_atributo_3", timestamps: false }
);

export default ProductoAtributo3;
