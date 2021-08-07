import express, { json } from "express";
import morgan from "morgan";

// Importing routes
import cursoRoutes from "./routes/curso";
import profesorRoutes from "./routes/profesor";
import practicaRoutes from "./routes/practica";
import corteRoutes from "./routes/corte";
import graficoRoutes from "./routes/grafico";
import grupoRoutes from "./routes/grupo";
import estudianteRoutes from "./routes/estudiante";
import subgrupoRoutes from "./routes/subgrupo";
import metodoRoutes from "./routes/metodo";
import productoRoutes from "./routes/Producto/producto";
import atributoRoutes from "./routes/Atributo/Atributo";

// Initializations
const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(json());

// routes
app.use("/api/profesor", profesorRoutes);
app.use("/api/curso", cursoRoutes);
app.use("/api/practica", practicaRoutes);
app.use("/api/corte", corteRoutes);
app.use("/api/grafico", graficoRoutes);
app.use("/api/grupo", grupoRoutes);
app.use("/api/estudiante", estudianteRoutes);
app.use("/api/subgrupo", subgrupoRoutes);
app.use("/api/metodo", metodoRoutes);
app.use("/api/producto", productoRoutes);
app.use("/api/atributos", atributoRoutes);

export default app;
