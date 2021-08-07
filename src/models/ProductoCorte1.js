import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";
import ProductoAtributo1 from "./ProductoAtributo1";

const ProductoCorte1 = sequelize.define(
  "producto_corte_1",
  {
    idProductoC1: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    nombrePC1: { type: DataTypes.STRING(25), allowNull: false },
    variablePrincipalC1: { type: DataTypes.INTEGER, allowNull: false },
    variableSecundariaC1: { type: DataTypes.INTEGER },
    toleranciaPC1: { type: DataTypes.INTEGER },
    unidadesPC1: { type: DataTypes.INTEGER },
  },
  { tableName: "producto_corte_1", timestamps: false }
);

ProductoCorte1.hasMany(ProductoAtributo1, {
  foreignKey: "idProductoC1A",
  sourceKey: "idProductoC1",
});
ProductoAtributo1.belongsTo(ProductoCorte1, {
  foreignKey: "idProductoC1A",
  sourceKey: "idProductoC1",
});

export default ProductoCorte1;
