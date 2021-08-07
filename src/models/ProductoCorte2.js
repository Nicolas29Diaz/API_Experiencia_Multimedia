import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";
import ProductoAtributo2 from "./ProductoAtributo2";
import SubgrupoProducto from "./SubgrupoProducto";

const ProductoCorte2 = sequelize.define(
  "producto_corte_2",
  {
    idProductoC2: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    nombrePC2: { type: DataTypes.STRING(25), allowNull: false },
    variablePrincipalC2: { type: DataTypes.INTEGER, allowNull: false },
    variableSecundariaC2: { type: DataTypes.INTEGER },
    toleranciaPC2: { type: DataTypes.INTEGER },
  },
  { tableName: "producto_corte_2", timestamps: false }
);

ProductoCorte2.hasMany(ProductoAtributo2, {
  foreignKey: "idProductoC2A",
  sourceKey: "idProductoC2",
});
ProductoAtributo2.belongsTo(ProductoCorte2, {
  foreignKey: "idProductoC2A",
  sourceKey: "idProductoC2",
});

ProductoCorte2.hasMany(SubgrupoProducto, {
  foreignKey: "idProductoC2SP",
  sourceKey: "idProductoC2",
});
SubgrupoProducto.belongsTo(ProductoCorte2, {
  foreignKey: "idProductoC2SP",
  sourceKey: "idProductoC2",
});

export default ProductoCorte2;
