import express from "express";
import cors from "cors";
import usuarioRoutes from "./routes/usuarioRoutes";
import armaRoutes from "./routes/armaRoutes";

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use("/usuarios", usuarioRoutes);
app.use("/armas", armaRoutes);

export default app;
