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
  updateComanda
} from "../controllers/comanda.controller.js";

const router = Router();

router.use(authenticateJwt).use(isGarzonOrAdmin);

router
  .post("/", createComanda)
  .get("/", getComandas)
  .get("/detail/", getComanda)
  .patch("/detail/", updateComanda)
  .patch("/confirm/", confirmComanda) // Nueva ruta para confirmar la comanda
  .delete("/detail/", deleteComanda);

export default router;
