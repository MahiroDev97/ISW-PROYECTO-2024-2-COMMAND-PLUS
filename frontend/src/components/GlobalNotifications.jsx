import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Bell } from 'lucide-react';
import { wsService } from '../services/websocket';

const GlobalNotifications = () => {
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("usuario"));
    
    const handleNotification = (data) => {
      if (data.type === 'COMANDA_READY') {
        // Notificación específica para garzones
        if (user?.rol === "garzon" || user?.rol === "administrador") {
          // Sonido de notificación
          const audio = new Audio('/notification.mp3');
          audio.play().catch(console.error);

          toast.success(
            <div className="flex items-center">
              <Bell className="w-6 h-6 mr-2" />
              <div className="flex flex-col">
                <span className="font-bold text-lg">¡Comanda Lista!</span>
                <span>Mesa #{data.data.mesa} está lista para servir</span>
              </div>
            </div>,
            {
              position: "top-right",
              autoClose: false,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: false,
              className: "bg-green-100 text-green-800",
            }
          );
        } else if (user?.rol === "cocinero") {
          // Notificación para cocineros
          toast.info(
            <div className="flex items-center">
              <Bell className="w-6 h-6 mr-2" />
              <div className="flex flex-col">
                <span>Comanda de Mesa #{data.data.mesa} marcada como lista</span>
              </div>
            </div>,
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              className: "bg-blue-100 text-blue-800",
            }
          );
        }
      } else if (data.type === 'COMANDA_UPDATE') {
        // Notificación general para todos los usuarios
        toast.info(
          <div className="flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            <span>
              Mesa #{data.data.mesa}: {data.data.productName || 'Producto'} actualizado a {data.data.newStatus}
            </span>
          </div>,
          {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            className: "bg-gray-100 text-gray-800",
          }
        );
      }
    };

    wsService.subscribe('COMANDA_UPDATE', handleNotification);
    wsService.subscribe('COMANDA_READY', handleNotification);

    return () => {
      wsService.unsubscribe('COMANDA_UPDATE', handleNotification);
      wsService.unsubscribe('COMANDA_READY', handleNotification);
    };
  }, []);

  return null;
};

export default GlobalNotifications;
