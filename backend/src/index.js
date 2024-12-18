"use strict";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import indexRoutes from "./routes/index.routes.js";
import session from "express-session";
import passport from "passport";
import express, { json, urlencoded } from "express";
import { cookieKey, HOST, PORT } from "./config/configEnv.js";
import { connectDB } from "./config/configDb.js";
import { createInitialSetup } from "./config/initialSetup.js";
import { passportJwtSetup } from "./auth/passport.auth.js";
import { sendEmailCron } from "./services/cron.service.js";
import { WebSocketServer } from "ws";
import WebSocketManager from "./websocket/WebSocketManager.js";

async function setupServer() {
  try {
    const app = express();

    app.disable("x-powered-by");

    const corsOptions = {
      origin: [
        "http://146.83.198.35:1296",

      ],
      credentials: true
    };

    app.use(cors(corsOptions));

    app.use(
      urlencoded({
        extended: true,
        limit: "1mb",
      }),
    );

    app.use(
      json({
        limit: "1mb",
      }),
    );

    app.use(cookieParser());

    app.use(morgan("dev"));

    app.use(
      session({
        secret: cookieKey,
        resave: false,
        saveUninitialized: false,
        cookie: {
          secure: false,
          httpOnly: true,
          sameSite: "strict",
        },
      }),
    );

    app.use(passport.initialize());
    app.use(passport.session());

    passportJwtSetup();

    app.use("/api", indexRoutes);

    app.use("/api/uploads", express.static("uploads"));

    const server = app.listen(PORT, () => {
      console.log(`=> Servidor corriendo en ${HOST}:${PORT}/api`);
    });

    // Setup WebSocket Server
    const wss = new WebSocketServer({ server, path: "/ws" });
    const wsManager = new WebSocketManager();

    wss.on("connection", (ws) => {
      console.log("New WebSocket connection");
      wsManager.handleConnection(ws);
    });

  } catch (error) {
    console.log("Error en index.js -> setupServer(), el error es: ", error);
  }
}

async function setupAPI() {
  try {
    await connectDB();
    await setupServer();
    await createInitialSetup();
    sendEmailCron();
  } catch (error) {
    console.log("Error en index.js -> setupAPI(), el error es: ", error);
  }
}

setupAPI()
  .then(() => console.log("=> API Iniciada exitosamente"))
  .catch((error) =>
    console.log("Error en index.js -> setupAPI(), el error es: ", error),
  );

