import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";
 
const Recurso = sequelize.define(
  "recurso",
  {
    idRecurso: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    tipoRecurso: { type: DataTypes.STRING(50), allowNull: false },
    urlRecurso: { type: DataTypes.STRING(50), allowNull: false },
    nombreRecurso: { type: DataTypes.STRING(50), allowNull: false },
  },
  { tableName: "recurso", timestamps: false }
);

export default Recurso;
