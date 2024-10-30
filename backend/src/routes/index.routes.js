"use strict";
import { Router } from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import productRoutes from "./product.routes.js";
import comandaRoutes from "./comanda.routes.js";
const router = Router();

router
  .use("/auth", authRoutes)
  .use("/user", userRoutes)
  .use("/product", productRoutes)
  .use("/comanda", comandaRoutes);

export default router;
