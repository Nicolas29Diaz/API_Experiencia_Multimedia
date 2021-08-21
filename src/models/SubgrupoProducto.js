import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";

const SubgrupoProducto = sequelize.define(
  "subgrupo_producto",
  {
    idSubgrupoProducto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    idProductoC2SP: { type: DataTypes.INTEGER, allowNull: false },
    idSubgrupoSP: { type: DataTypes.INTEGER, allowNull: false },
  },
  { tableName: "subgrupo_producto", timestamps: false }
);

export default SubgrupoProducto;
