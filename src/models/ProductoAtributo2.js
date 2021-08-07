import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";

const ProductoAtributo2 = sequelize.define(
  "producto_atributo_2",
  {
    idProductoAtributo2: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  },
  { tableName: "producto_atributo_2", timestamps: false }
);

export default ProductoAtributo2;
