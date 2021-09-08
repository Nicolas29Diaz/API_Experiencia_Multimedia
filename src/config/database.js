import { Sequelize } from "sequelize";
import { database } from "./keys";
export const sequelize = new Sequelize(
  database.database,
  database.user,
  database.password,
  {
    host: database.host,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    logging: false,
  }
);
