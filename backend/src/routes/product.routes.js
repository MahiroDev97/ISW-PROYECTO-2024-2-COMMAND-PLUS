"use strict";
import { Router } from "express";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";
import {
  createProduct,
  deleteProduct,
  getAvailableProducts,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";

const router = Router();

router.use(authenticateJwt);

router
  .post("/", upload, createProduct)
  .get("/", getProducts)
  .get("/disponibles/", getAvailableProducts)
  .get("/detail/", getProduct)
  .patch("/detail/", upload, updateProduct)
  .delete("/detail/", deleteProduct);

export default router;
