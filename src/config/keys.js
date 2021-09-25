import { config } from "dotenv";

if (process.env.NODE_ENV !== "production") {
  config();
}

export const database = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};
