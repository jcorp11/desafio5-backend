import express from "express";
import cors from "cors";
import "dotenv/config";
import joyaRoute from "./routes/joya.route.js";

const PORT = process.env.PORT || 3500;
const app = express();

function logEndpoint(req, res, next) {
  console.log(`Request recieved: ${req.method} ${req.path}`);
  next(); // Llama a next() para pasar la solicitud al siguiente middleware
}

function logSuccess(req, res, next) {
  const originalSend = res.send;

  res.send = function (data) {
    console.log(`Success: ${req.method} ${req.path}`);
    originalSend.apply(res, arguments);
  };
  next();
}

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
