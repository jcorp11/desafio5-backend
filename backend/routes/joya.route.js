import { Router } from "express";
import { joyaController } from "../controller/joya.controller.js";
import { validateQueryParams } from "../middlewares/joya.middleware.js";

const router = Router();

// GET /todos
router.get("/", joyaController.read);

// GET /todos/filtros
router.get("/filtros", validateQueryParams, joyaController.joyaFiltros);

export default router;
