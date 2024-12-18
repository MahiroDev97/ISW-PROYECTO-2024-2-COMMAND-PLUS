import { useNavigate } from "react-router-dom";
import useUser from "../hooks/auth/useUser";
import { useEffect } from "react";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const navigate = useNavigate();
    const user = useUser();

    useEffect(() => {
        if (!user) {
            navigate('/auth');
            return;
        }

        if (!user.active && user.rol !== 'administrador') {
            navigate('/activeturno');
            return;
        }

        // Solo verificar roles si se especifican
        if (allowedRoles.length > 0 && !allowedRoles.includes(user.rol)) {
            // Si es admin y no tiene acceso, redirigir a adminTables
            if (user.rol === 'administrador') {
                navigate('/adminTables');
            } else {
                // Para otros roles, redirigir según corresponda
                user.rol === 'garzon' ? navigate('/comandas') : navigate('/cocina');
            }
            return;
        }
    }, [user, navigate, allowedRoles]);

    return children;
};

export default ProtectedRoute;
