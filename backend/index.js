import express from "express";
import cors from "cors";
import "dotenv/config";
import joyaRoute from "./routes/joya.route.js";
import { logEndpoint, logSuccess } from "./middlewares/joya.middleware.js";

const PORT = process.env.PORT || 3500;
const app = express();

// Usar el middleware en todas las rutas
app.use(logEndpoint);
app.use(logSuccess);

// Middleware para parsear el cuerpo de las peticiones
app.use(express.json());

// <--- Habilitamos CORS
app.use(cors());

app.use("/joyas", joyaRoute);

app.listen(PORT, () => {
  console.log(`Desafio 5 listening on port ${PORT}`);
});
