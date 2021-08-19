import express, { json } from "express";
import morgan from "morgan";
import cors from "cors";
// Importing routes
import cursoRoutes from "./routes/curso";
import profesorRoutes from "./routes/profesor";
import practicaRoutes from "./routes/practica";
import corteRoutes from "./routes/corte";
import graficoRoutes from "./routes/grafico";
import graficoPracticaRoutes from "./routes/graficoPractica";
import grupoRoutes from "./routes/grupo";
import estudianteRoutes from "./routes/estudiante";
import grupoEstudianteRoutes from "./routes/grupoEstudiante";
import subgrupoRoutes from "./routes/subgrupo";
import subgrupoProductoRoutes from "./routes/subgrupoProducto";
import metodoRoutes from "./routes/metodo";
import metodoProductoRoutes from "./routes/metodoProducto";
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
app.use("/api/corte", corteRoutes);
app.use("/api/grafico", graficoRoutes);
app.use("/api/graficopractica", graficoPracticaRoutes);
app.use("/api/grupo", grupoRoutes);
app.use("/api/estudiante", estudianteRoutes);
app.use("/api/grupoestudiante", grupoEstudianteRoutes);
app.use("/api/subgrupo", subgrupoRoutes);
app.use("/api/subgrupoproducto", subgrupoProductoRoutes);
app.use("/api/metodo", metodoRoutes);
app.use("/api/metodoproducto", metodoProductoRoutes);
app.use("/api/producto", productoRoutes);
app.use("/api/atributos", atributoRoutes);

export default app;
