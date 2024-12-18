import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { logout } from "@services/auth.service.js";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(sessionStorage.getItem("usuario")) || "";
  const userRole = user?.rol;
  const [isOpen, setIsOpen] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const hideNavbarRoutes = ['/activeturno', '/auth'];

  if (hideNavbarRoutes.includes(location.pathname)) {
    return null;
  }

  const handleLogoutClick = () => {
    setShowConfirmDialog(true);
  };

  const logoutSubmit = () => {
    try {
      logout();
      navigate("/auth");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
    setShowConfirmDialog(false);
  };

  const NavItem = ({ to, onClick, children }) => (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `block px-4 py-2 text-sm transition-all duration-200 ${isActive
          ? "bg-white/10 text-white font-medium"
          : "text-gray-100 hover:bg-white/10 hover:text-white"
        } rounded-md`
      }
    >
      {children}
    </NavLink>
  );

  return (
    <>
      <nav className="bg-[#003366] fixed w-full top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[9vh]">
            <div className="flex-shrink-0">
              <span className="text-white font-bold text-2xl">Command+</span>
            </div>

            {/* Botón de menú móvil */}
            <div className="flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-white 
                bg-blue-800 hover:bg-transparent transition-colors duration-200"
              >
                <span className="sr-only">Abrir menú principal</span>
                <svg
                  className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Menú de escritorio */}
            <div className="hidden md:flex md:items-center md:space-x-4">
              {userRole === "administrador" && (
                <>
                  <NavItem to="/adminTables">Dashboard</NavItem>
                  <NavItem to="/turnosadmin">Turnos</NavItem>
                  <NavItem to="/users">Usuarios</NavItem>
                  <NavItem to="/products">Productos</NavItem>
                </>
              )}

              {(userRole === "administrador" || userRole === "garzon") && (
                <NavItem to="/comandas">Comandas</NavItem>
              )}

              {(userRole === "administrador" || userRole === "cocinero") && (
                <NavItem to="/cocina">Cocina</NavItem>
              )}

              {userRole !== "administrador" && (
                <NavItem to="/finishturno">Terminar Turno</NavItem>
              )}

              <button
                onClick={handleLogoutClick}
                className="flex items-center px-4 py-2 text-sm text-white 
                bg-red-500 rounded-md transition-all duration-200 font-medium
                hover:bg-red-600 hover:shadow-md hover:-translate-y-0.5"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H3zm11 4.414L11.586 5H15v2.414zM5 5h4.586L7.414 7.414 5 9.828V5zm0 5.172l3-3 3 3 3-3V15H5v-4.828z"
                    clipRule="evenodd"
                  />
                </svg>
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>

        {/* Menú móvil */}
        <div
          className={`${isOpen ? "block" : "hidden"
            } md:hidden bg-[#003366] border-t border-blue-800 shadow-lg`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">

            {userRole === "administrador" && (
              <>
                <NavItem to="/adminTables" onClick={() => setIsOpen(false)}>
                  Dashboard
                </NavItem>
                <NavItem to="/users" onClick={() => setIsOpen(false)}>
                  Usuarios
                </NavItem>
                <NavItem to="/turnosadmin" onClick={() => setIsOpen(false)}>
                  Turnos
                </NavItem>
                <NavItem to="/products" onClick={() => setIsOpen(false)}>
                  Productos
                </NavItem>
              </>
            )}

            {(userRole === "administrador" || userRole === "garzon") && (
              <NavItem to="/comandas" onClick={() => setIsOpen(false)}>
                Comandas
              </NavItem>
            )}

            {(userRole === "administrador" || userRole === "cocinero") && (
              <NavItem to="/cocina" onClick={() => setIsOpen(false)}>
                Cocina
              </NavItem>
            )}

            {userRole !== "administrador" && (
              <NavItem to="/finishturno" onClick={() => setIsOpen(false)}>
                Terminar Turno
              </NavItem>
            )}

            <button
              onClick={handleLogoutClick}
              className="flex items-center w-full px-4 py-2 text-sm font-medium text-white 
              bg-red-500 rounded-md transition-all duration-200
              hover:bg-red-600 hover:shadow-md hover:-translate-y-0.5 mt-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H3zm11 4.414L11.586 5H15v2.414zM5 5h4.586L7.414 7.414 5 9.828V5zm0 5.172l3-3 3 3 3-3V15H5v-4.828z"
                  clipRule="evenodd"
                />
              </svg>
              Cerrar sesión
            </button>
          </div>
        </div>
      </nav>

      {/* Diálogo de confirmación */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              ¿Estás seguro que deseas cerrar sesión?
            </h3>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancelar
              </button>
              <button
                onClick={logoutSubmit}
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
