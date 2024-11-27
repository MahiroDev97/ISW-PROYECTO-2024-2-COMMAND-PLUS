"use strict";
import { Router } from "express";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.controller.js";

const router = Router();


router
  .use(authenticateJwt);

router
  .get("/", getUsers)
  .get("/detail/", getUser)
  // TODO: Implementar updateUser
  // .patch("/detail/", updateUser)
  .delete("/detail/", deleteUser);

export default router;