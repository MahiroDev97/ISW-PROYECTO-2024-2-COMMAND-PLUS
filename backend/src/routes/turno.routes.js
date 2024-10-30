"use strict";

import { Router } from "express";
import {
    createTurno,
    getTurnos,
    getTurno,
    updateTurno,
    deleteTurno
} from "../controllers/turno.controller.js";

const router = Router();

router
    .post("/create", createTurno)     // Ruta específica para crear
    .get("/", getTurnos)
    .get("/:id", getTurno)
    .patch("/:id", updateTurno)
    .delete("/:id", deleteTurno);

export default router;
