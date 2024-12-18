import { Navigate } from "react-router-dom";
import useUser from "../hooks/auth/useUser";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const user = useUser();

    // Verificar si hay usuario
    if (!user) {
        return <Navigate to="/auth" replace />;
    }

    // Verificar roles permitidos
    if (!allowedRoles.includes(user.rol)) {
        return <Navigate to="/home" replace />;
    }

    // Verificar si el usuario necesita activar su turno
    // Excluimos al administrador de esta verificación
    if (!user.active && user.rol !== "administrador") {
        return <Navigate to="/activeturno" replace />;
    }

    return children;
};

export default ProtectedRoute;
