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
  },
  { tableName: "subgrupo_producto", timestamps: false }
);

export default SubgrupoProducto;
