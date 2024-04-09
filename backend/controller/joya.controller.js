import { joyaModel } from "../models/joya.model.js";
import { getDatabaseError } from "../lib/errors/database.error.js";

const read = async (req, res) => {
  const { limit = 5, order_by = "stock_DESC", page = 1 } = req.query;
  try {
    const joyas = await joyaModel.findAll({ limit, order_by, page });
    return res.json(joyas);
  } catch (error) {
    console.log(error);
    if (error.code) {
      const { code, message } = getDatabaseError(error.code);
      return res.status(code).json({ message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

const joyaFiltros = async (req, res) => {
  const queryStrings = req.query;
  try {
    const joyas = await joyaModel.findByFiltros(queryStrings);
    return res.json(joyas);
  } catch (error) {
    console.log(error);
    if (error.code) {
      const { code, message } = getDatabaseError(error.code);
      return res.status(code).json({ message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const joyaController = { read, joyaFiltros };
