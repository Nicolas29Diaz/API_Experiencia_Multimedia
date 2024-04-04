import express, { json } from "express";
import morgan from "morgan";
// import cors from "cors";
// Importing routes
import cursoRoutes from "./routes/curso";
import profesorRoutes from "./routes/profesor";
import practicaRoutes from "./routes/practica";
import grupoRoutes from "./routes/grupo";
import estudianteRoutes from "./routes/estudiante";
import productoRoutes from "./routes/Producto/producto";
import atributoRoutes from "./routes/Atributo/Atributo";
import usuarioRoutes from "./routes/usuario";
import authRoutes from "./routes/auth";
import recursoRoutes from "./routes/recurso";
// Initializations
const app = express();

const cors = require('cors');

app.use(cors());

app.use(morgan("dev"));
app.use(json());

// routes
app.use("/api/usuario", usuarioRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/profesor", profesorRoutes);
app.use("/api/cursos", cursoRoutes);
app.use("/api/practicas", practicaRoutes);
app.use("/api/grupo", grupoRoutes);
app.use("/api/estudiante", estudianteRoutes);
app.use("/api/producto", productoRoutes);
app.use("/api/atributos", atributoRoutes);
app.use("/api/recursos", recursoRoutes);

export default app;
