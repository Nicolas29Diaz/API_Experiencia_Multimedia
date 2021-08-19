import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";
import ProductoAtributo1 from "./ProductoAtributo1";
import ProductoAtributo2 from "./ProductoAtributo2";

const Atributo = sequelize.define(
  "atributo",
  {
    idAtributo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nombreAtributo: { type: DataTypes.STRING(50), allowNull: false },
  },
  { tableName: "atributo", timestamps: false }
);

Atributo.hasMany(ProductoAtributo1, {
  foreignKey: "idAtributoPA1",
  sourceKey: "idAtributo",
});
ProductoAtributo1.belongsTo(Atributo, {
  foreignKey: "idAtributoPA1",
  sourceKey: "idAtributo",
});

Atributo.hasMany(ProductoAtributo2, {
  foreignKey: "idAtributoPA2",
  sourceKey: "idAtributo",
});
ProductoAtributo2.belongsTo(Atributo, {
  foreignKey: "idAtributoPA2",
  sourceKey: "idAtributo",
});

export default Atributo;
