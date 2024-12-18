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
  getComandasPorMesAno,
  updateComanda,
  updateEstadoCerradoComanda
} from "../controllers/comanda.controller.js";

const router = Router();

router.use(authenticateJwt);

router
  .post("/", createComanda)
  .get("/", getComandas)
  .get("/detail/", getComanda)
  .get("/mesano/", getComandasPorMesAno)
  .patch("/detail/", updateComanda)
  .patch("/confirm/", confirmComanda)
  .patch("/cerrada/",isGarzonOrAdmin, updateEstadoCerradoComanda)
  .delete("/delete/",isGarzonOrAdmin, deleteComanda);
  


export default router;
