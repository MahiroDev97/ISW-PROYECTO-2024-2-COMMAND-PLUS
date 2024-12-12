

import { Router } from "express";
import { sendEmailCronController } from "../controllers/reportes.controller.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";


const router = Router();

router.use(authenticateJwt);

router.get("/test-email", sendEmailCronController);

export default router;
