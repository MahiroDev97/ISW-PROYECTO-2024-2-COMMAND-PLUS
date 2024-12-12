"use strict";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";


import { Router } from "express";
import {
  createTurno,
  deleteTurno,
  finishTurno,
  getTurno,
  getTurnos,
  getTurnosDiaController,
  updateTurno,
} from "../controllers/turno.controller.js";

const router = Router();

router.use(authenticateJwt);

router
  .post("/create", createTurno)
  .get("/getTurnosDia", getTurnosDiaController)
  .get("/", getTurnos)
  .get("/:id", getTurno)
  .patch("/:id", updateTurno)
  .delete("/:id", deleteTurno)
  .patch("/finishTurno/:id", finishTurno);

export default router;
