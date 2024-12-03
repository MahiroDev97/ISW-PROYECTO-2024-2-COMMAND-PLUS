"use strict";
import { Router } from "express";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import {
  createProductComanda,
  deleteProductComanda,
  getAvailableProducts,
  getMesAnoDisponibles,
  getProductComanda,
  getProductComandas,
  getProductosPorMes,
  getVentasTotales,
  updateProductComanda
} from "../controllers/productcomanda.controller.js";

const router = Router();

router.use(authenticateJwt).use(isAdmin);

router
  .post("/", createProductComanda)
  .get("/", getProductComandas)
  .get("/detail/", getProductComanda)
  .get("/history/mes", getProductosPorMes)
  .get("/available", getAvailableProducts)
  .get("/getMesAnoDisponibles", getMesAnoDisponibles)
  .get("/ventasTotales", getVentasTotales)
  .patch("/detail/", updateProductComanda)
  .delete("/detail/", deleteProductComanda);

export default router;
