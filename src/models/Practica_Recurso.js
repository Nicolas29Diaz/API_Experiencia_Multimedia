import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import Practica from "./Practica"; // Importa el modelo de la tabla "practica"
import Recurso from "./Recurso"; // Importa el modelo de la tabla "recurso"

const PracticaRecurso = sequelize.define(
  "practica_recurso",
  {
    idPractica_recurso: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    idPracticaPr: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Practica, // Referencia al modelo de la tabla "practica"
        key: "idPractica", // Clave primaria de la tabla "practica"
      },
      onUpdate: "NO ACTION",
      onDelete: "NO ACTION",
    },
    idRecursoPr: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Recurso, // Referencia al modelo de la tabla "recurso"
        key: "idRecurso", // Clave primaria de la tabla "recurso"
      },
      onUpdate: "NO ACTION",
      onDelete: "NO ACTION",
    },
  },
  {
    tableName: "practica_recurso",
    timestamps: false,
  }
);

PracticaRecurso.belongsTo(Practica, { foreignKey: "idPracticaPr" });
PracticaRecurso.belongsTo(Recurso, { foreignKey: "idRecursoPr" });

export default PracticaRecurso;
