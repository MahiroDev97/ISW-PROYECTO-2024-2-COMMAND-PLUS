"use setrict";
import { Router } from "express";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { isAdmin, isGarzon } from "../middlewares/authorization.middleware.js";
import {
  createComanda,
  deleteComanda,
  getComanda,
  getComandas,
  updateComanda,
} from "../controllers/comanda.controller.js";

const router = Router();

router.use(authenticateJwt).use(isGarzon).use(isAdmin);

router
    .post("/", createComanda)
    .get("/", getComandas)
    .get("/detail/", getComanda)
    .patch("/detail/", updateComanda)
    .delete("/detail/", deleteComanda);

export default router;