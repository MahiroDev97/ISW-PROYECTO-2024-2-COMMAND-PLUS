"use strict";
import { Router } from "express";
import { isCocinero } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import {
    getProductComanda,
    getProductComandaByComanda,
    updateProductComanda,
}

from "../controllers/productcomanda.controller.js";

const router = Router();

router.use(authenticateJwt).use(isCocinero);

router
.get("/detail/", getProductComanda)     // funcion que obtiene un productcomanda
.get("/", getProductComandaByComanda) // funcion que obtiene todos los productos de una comanda
.patch("/detail/", updateProductComanda);  // funcion que actualiza un productcomanda
  

export default router;
