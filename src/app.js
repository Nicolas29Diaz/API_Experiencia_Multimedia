import express, { json } from "express";
import morgan from "morgan";
import cors from "cors";
// Importing routes
import cursoRoutes from "./routes/curso";
import profesorRoutes from "./routes/profesor";
import practicaRoutes from "./routes/practica";
import grupoRoutes from "./routes/grupo";
import estudianteRoutes from "./routes/estudiante";
import productoRoutes from "./routes/Producto/producto";
import atributoRoutes from "./routes/Atributo/Atributo";

// Initializations
const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(json());
app.use(cors());

// routes
app.use("/api/profesor", profesorRoutes);
app.use("/api/cursos", cursoRoutes);
app.use("/api/practica", practicaRoutes);
app.use("/api/grupo", grupoRoutes);
app.use("/api/estudiante", estudianteRoutes);
app.use("/api/producto", productoRoutes);
app.use("/api/atributos", atributoRoutes);

export default app;
