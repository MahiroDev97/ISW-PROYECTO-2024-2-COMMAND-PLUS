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
  getProductComandaByComanda,
  getProductComandas,
  getProductosPorMes,
  getVentasTotales,
  updateProductComanda,
  
} from "../controllers/productcomanda.controller.js";

const router = Router();

router.use(authenticateJwt);

// Rutas protegidas solo para administradores
router
  .post("/", isAdmin, createProductComanda)
  .get("/", isAdmin, getProductComandaByComanda)
  .get("/detail/", isAdmin, getProductComanda)
  .get("/history/mes", isAdmin, getProductosPorMes)
  .get("/available", isAdmin, getAvailableProducts)
  .get("/getMesAnoDisponibles", isAdmin, getMesAnoDisponibles)
  .get("/ventasTotales", isAdmin, getVentasTotales)
  .patch("/detail/", isAdmin, updateProductComanda)
  .delete("/detail/", isAdmin, deleteProductComanda);

export default router;
