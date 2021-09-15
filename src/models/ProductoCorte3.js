import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";

const ProductoCorte3 = sequelize.define(
  "producto_corte_3",
  {
    idProductoC3: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nombrePC3: { type: DataTypes.STRING(25), allowNull: false },
    variablePrincipalC3: { type: DataTypes.INTEGER },
    variableSecundariaC3: { type: DataTypes.INTEGER },
    toleranciaPC3: { type: DataTypes.INTEGER },
    tamanioLote: { type: DataTypes.INTEGER },
    aql: { type: DataTypes.STRING(20) },
    severidad: { type: DataTypes.STRING(25) },
    nivelInspeccion: { type: DataTypes.STRING(25) },
    tipoMuestreo: { type: DataTypes.STRING(15) },
    idGrupoEstudiantePC3: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    estado: { type: DataTypes.TINYINT },
  },
  { tableName: "producto_corte_3", timestamps: false }
);

export default ProductoCorte3;
