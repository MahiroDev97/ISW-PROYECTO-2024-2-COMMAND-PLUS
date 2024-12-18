import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Login from "@pages/Login";
import Home from "@pages/Home";
import Users from "@pages/Users";
import Register from "@pages/Register";
import Error404 from "@pages/Error404";
import Root from "@pages/Root";
import ProtectedRoute from "@components/ProtectedRoute";
import "@styles/styles.css";
import ActiveTurno from "./pages/ActiveTurno";
import FinishTurno from "./pages/FinishTurno";
import AdminTables from "./pages/AdminTables";
import Products from "./pages/Products";
import Comandas from "./pages/Comandas";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import VistaCocina from "./pages/VistaCocina";
import "@styles/index.css";
import React from "react";
import { wsService } from "./services/websocket";
import GlobalNotifications from "./components/GlobalNotifications";

Modal.setAppElement("#root");

import TurnosAdmin from "./pages/TurnosAdmin";

const user = JSON.parse(sessionStorage.getItem("usuario"));
//funcion que crea el router y lo renderiza en el root del html en pocas palabras es el punto de entrada de la aplicacion

// Inicializar WebSocket antes del router
wsService.connect();

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>

        <ToastContainer />
        <Root />
      </>
    ),
    errorElement: <Error404 />,
    children: [
      {
        path: "/home",
        element: (
          <ProtectedRoute>

            <Home />

          </ProtectedRoute>
        ),
      },
      {
        path: "/users",
        element: (
          <ProtectedRoute allowedRoles={["administrador"]}>
            <Users />
          </ProtectedRoute>
        ),
      },
      {
        path: "/products",
        element: (
          <ProtectedRoute allowedRoles={["administrador"]}>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "/cocina",
        element: (
          <ProtectedRoute allowedRoles={["cocinero", "administrador"]}>
            <VistaCocina />
          </ProtectedRoute>
        ),
      },
      {
        path: "/comandas",
        element: (
          <ProtectedRoute allowedRoles={["garzon", "administrador"]}>
            <Comandas />
          </ProtectedRoute>
        ),
      },
      {
        path: "/activeturno",
        element: <ActiveTurno />,
      },
      {
        path: "/finishturno",
        element: <FinishTurno />,
      },
      {
        path: "/adminTables",
        element: <AdminTables />,
      },
      {
        path: "/turnosAdmin",
        element: <TurnosAdmin />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
//renderiza el router en el root del html

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
    <GlobalNotifications />
  </React.StrictMode>
);
