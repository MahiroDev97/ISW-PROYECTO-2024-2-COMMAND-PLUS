"use strict";
import { Router } from "express";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import {
  createProductComanda,
  getProductComanda,
  getProductComandas,
  updateProductComanda,
  deleteProductComanda,
} from "../controllers/productcomanda.controller.js";

const router = Router();

router.use(authenticateJwt).use(isAdmin);

router
  .post("/", createProductComanda)
  .get("/", getProductComandas)
  .get("/detail/", getProductComanda)
  .patch("/detail/", updateProductComanda)
  .delete("/detail/", deleteProductComanda);

export default router;
