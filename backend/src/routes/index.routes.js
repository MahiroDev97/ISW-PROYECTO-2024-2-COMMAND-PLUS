"use strict";
import { Router } from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import productRoutes from "./product.routes.js";
import comandaRoutes from "./comanda.routes.js";
import turnoRoutes from "./turno.routes.js";
import productcomanda from "./productcomanda.routes.js";
import cocineroRoutes from "./cocinero.routes.js";
import reportesRoutes from "./reportes.routes.js";
const router = Router();

router
  .use("/auth", authRoutes)
  .use("/user", userRoutes)
  .use("/product", productRoutes)
  .use("/comanda", comandaRoutes)
  .use("/turno", turnoRoutes)
  .use("/productcomanda", productcomanda)
  .use("/reportes", reportesRoutes)
  .use("/cocinero", cocineroRoutes);

export default router;
