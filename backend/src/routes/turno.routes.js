"use strict";

import { Router } from "express";
import {
    createTurno,
    deleteTurno,
    finishTurno,
    getTurno,
    getTurnos,
    updateTurno,
} from "../controllers/turno.controller.js";

const router = Router();

router
    .post("/create", createTurno)
    .get("/getTurnos", getTurnos)
    .get("/getTurno/:id", getTurno)
    .patch("/updateTurno/:id", updateTurno)
    .delete("/deleteTurno/:id", deleteTurno)
    .patch("/finishTurno/:id", finishTurno);

export default router;
