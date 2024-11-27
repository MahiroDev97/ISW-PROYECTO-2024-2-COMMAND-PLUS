"use setrict";
import { Router } from "express";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import {
  isAdmin,
  isGarzon,
  isGarzonOrAdmin,
} from "../middlewares/authorization.middleware.js";
import {
  confirmComanda,
  createComanda,
  deleteComanda,
  getComanda,
  getComandas,
  getMesAnoDisponibles,
  updateComanda
} from "../controllers/comanda.controller.js";

const router = Router();

router.use(authenticateJwt);

router
  .post("/", createComanda)
  .get("/", getComandas)
  .get("/detail/", getComanda)
  .get("/getMesAnoDisponibles", getMesAnoDisponibles)
  .patch("/detail/", updateComanda)
  .patch("/confirm/", confirmComanda)
  .delete("/detail/", deleteComanda);

export default router;
