"use strict";
import { Router } from "express";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import {
    createProductComanda,
    getProductComanda,
    getProductComandaByComandaService,
    getProductComandas,
    updatedProductComanda,
    deleteProductComanda,
} from "../controllers/productcomanda.controller.js";

const router = Router();

router.use(authenticateJwt).use(isAdmin);

router
.post("/", createProductComanda)
.get("/", getProductComandas)
.get("/detail/",getProductComanda)
.get("/detail/",getProductComandaByComandaService)
.patch("/detail/", updatedProductComanda)
.delete("/detail/", deleteProductComanda);

export default router;