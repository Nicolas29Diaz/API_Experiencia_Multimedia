import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import SubgrupoProducto from "./SubgrupoProducto";

const Subgrupo = sequelize.define(
  "subgrupo",
  {
    idSubgrupo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nombreSubgrupo: { type: DataTypes.STRING(25), allowNull: false },
    cantidadSubgrupo: { type: DataTypes.INTEGER, allowNull: false },
    tipoSubgrupo: { type: DataTypes.STRING(20), allowNull: false },
  },
  { tableName: "subgrupo", timestamps: false }
);

Subgrupo.hasMany(SubgrupoProducto, {
  foreignKey: "idSubgrupoSP",
  sourceKey: "idSubgrupo",
});
SubgrupoProducto.belongsTo(Subgrupo, {
  foreignKey: "idSubgrupoSP",
  sourceKey: "idSubgrupo",
});

export default Subgrupo;
