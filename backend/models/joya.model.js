import { pool } from "../database/conection.js";
import format from "pg-format";
import "dotenv/config";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.DOMAIN_URL_APP
    : `http://localhost::${process.env.PORT}`;

const table = "inventario";
const findAll = async ({ limit = 5, order_by = "stock_DESC", page = 1 }) => {
  const countQuery = `SELECT COUNT(*) FROM ${table}`;
  const { rows: countResult } = await pool.query(countQuery);
  const total_rows = parseInt(countResult[0].count, 10);
  const total_pages = Math.ceil(total_rows / limit);
  const query = `SELECT * FROM ${table} ORDER BY %s %s LIMIT %s OFFSET %s`;
  const [field, direction] = order_by.split("_");
  const offset = (page - 1) * limit;
  const formattedQuery = format(query, field, direction, limit, offset);
  const { rows } = await pool.query(formattedQuery);

  const results = rows.map((row) => {
    return {
      ...row,
      href: `${BASE_URL}/joyas/${row.id}`, // no esta implementado pero lo dejo para HATEOAS
    };
  });
  // Devuelve un objeto con los resultados, el número total de páginas y los enlaces a la página siguiente y anterior
  return {
    results,
    total_pages,
    page,
    limit,
    next:
      total_pages <= page
        ? null
        : `${BASE_URL}/todos?limit=${limit}&page=${page + 1}`,
    previous:
      page <= 1 ? null : `${BASE_URL}/todos?limit=${limit}&page=${page - 1}`,
  };
};

const findByFiltros = async ({ precio_max, precio_min, categoria, metal }) => {
  let filtros = [];
  const values = [];
  const agregarFiltro = (campo, comparador, valor) => {
    values.push(valor);
    const { length } = filtros;
    filtros.push(`${campo} ${comparador} $${length + 1}`);
  };
  if (precio_max) agregarFiltro("precio", "<=", precio_max);
  if (precio_min) agregarFiltro("precio", ">=", precio_min);
  if (categoria) agregarFiltro("categoria", "=", categoria);
  if (metal) agregarFiltro("metal", "=", metal);
  let consulta = `SELECT * FROM ${table}`;
  if (filtros.length > 0) {
    filtros = filtros.join(" AND ");
    consulta += ` WHERE ${filtros}`;
  }
  const { rows: joyas } = await pool.query(consulta, values);
  return joyas;
};

export const joyaModel = {
  findAll,
  findByFiltros,
};
