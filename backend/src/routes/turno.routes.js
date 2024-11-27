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
    .post("/", createTurno)
    .get("/", getTurnos)
    .get("/:id", getTurno)
    .patch("/:id", updateTurno)
    .delete("/:id", deleteTurno)
    .patch("/finishTurno/:id", finishTurno);

export default router;
