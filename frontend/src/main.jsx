import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
import VistaCocina from "./pages/VistaCocina";
const user = JSON.parse(sessionStorage.getItem("usuario"));
console.log("user", user);
//funcion que crea el router y lo renderiza en el root del html en pocas palabras es el punto de entrada de la aplicacion
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error404 />,
    children: [
      {
        path: "/home",
        element: <Home />,
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
          <ProtectedRoute allowedRoles={["administrador", "cocinero"]}>
            <VistaCocina />
          </ProtectedRoute>
        ),
      },
      {
        path: "/comandas",
        element: (
          <ProtectedRoute allowedRoles={["administrador", "garzon"]}>
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
  <RouterProvider router={router} />
);
