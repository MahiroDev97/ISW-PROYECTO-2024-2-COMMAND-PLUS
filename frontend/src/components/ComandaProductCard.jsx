import { useState } from "react";
import { Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { wsService } from '../services/websocket';
import Modal from 'react-modal';

const OrderStatus = {
  RECEIVED: "recibido",
  PENDING: "pendiente",
  IN_PREPARATION: "en preparación",
  READY: "listo",
};

const statusColors = {
  [OrderStatus.RECEIVED]: "bg-gray-100 text-gray-800",
  [OrderStatus.PENDING]: "bg-yellow-100 text-yellow-800",
  [OrderStatus.IN_PREPARATION]: "bg-blue-100 text-blue-800",
  [OrderStatus.READY]: "bg-green-100 text-green-800",
};

const statusOptions = Object.values(OrderStatus);

const statusOrder = [
  OrderStatus.RECEIVED,
  OrderStatus.PENDING,
  OrderStatus.IN_PREPARATION,
  OrderStatus.READY
];

const getProgressPercentage = (currentStatus) => {
  const index = statusOrder.indexOf(currentStatus);
  return ((index + 1) / statusOrder.length) * 100;
};

export const ProductCard = ({ productcomandas, comanda, updateComandaStatus, currentStatus, loading }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newStatus, setNewStatus] = useState(null);

  const openModal = (status) => {
    setNewStatus(status);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setNewStatus(null);
  };

  const checkUserRole = () => {
    const user = JSON.parse(sessionStorage.getItem("usuario"));
    // Permitir edición a cocineros, garzones y administradores
    return ["cocinero", "administrador"].includes(user?.rol);
  };

  const handleStatusChange = async () => {
    if (newStatus) {
      try {
        // Verificar si el usuario tiene permiso
        if (!checkUserRole()) {
          toast.error('No tienes permisos para actualizar el estado');
          return;
        }

        await updateComandaStatus(productcomandas.id, newStatus);
        
        wsService.send({
          type: 'PRODUCT_STATUS_UPDATE',
          data: {
            comandaId: comanda.id,
            mesa: comanda.mesa,
            productId: productcomandas.id,
            productName: productcomandas.product.nombre,
            newStatus: newStatus,
            oldStatus: currentStatus,
            updatedBy: JSON.parse(sessionStorage.getItem("usuario"))?.rol,
            timestamp: new Date().toISOString()
          }
        });

        closeModal();
      } catch (error) {
        toast.error('Error al actualizar el estado');
        console.error('Error:', error);
      }
    }
  };

  const getNextStatus = (currentStatus) => {
    const currentIndex = statusOrder.indexOf(currentStatus);
    if (currentIndex === -1 || currentIndex === statusOrder.length - 1) {
      return statusOrder[0];
    }
    return statusOrder[currentIndex + 1];
  };

  const getPreviousStatus = (currentStatus) => {
    const currentIndex = statusOrder.indexOf(currentStatus);
    if (currentIndex <= 0) {
      return statusOrder[statusOrder.length - 1];
    }
    return statusOrder[currentIndex - 1];
  };

  const handleStatusNavigation = (direction) => {
    if (!checkUserRole()) {
      toast.error('No tienes permisos para actualizar el estado');
      return;
    }
    const nextStatus = direction === 'forward' 
      ? getNextStatus(currentStatus)
      : getPreviousStatus(currentStatus);
    openModal(nextStatus);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-3 mb-2">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-semibold text-gray-800">
            {productcomandas.product.nombre}
          </h3>
          <p className="text-xs text-gray-600 mt-1">
            {productcomandas.product.descripcion}
          </p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleStatusNavigation('backward')}
              className={`p-1 rounded-full hover:bg-gray-100
                ${!checkUserRole() ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading || !checkUserRole()}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="relative">
              <button
                onClick={() => handleStatusNavigation('forward')}
                className={`relative w-20 h-20 rounded-lg text-xs font-bold flex items-center justify-center p-2
                  ${!checkUserRole() ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80'}
                  ${statusColors[currentStatus]}`}
                disabled={loading || !checkUserRole()}
              >
                <span className="text-center leading-tight">
                  {currentStatus === OrderStatus.RECEIVED ? 'Recibido' :
                   currentStatus === OrderStatus.PENDING ? 'Pendiente' :
                   currentStatus === OrderStatus.IN_PREPARATION ? 'En\nPreparación' :
                   currentStatus === OrderStatus.READY ? 'Listo' : ''}
                </span>
              </button>
            </div>

            <button
              onClick={() => handleStatusNavigation('forward')}
              className={`p-1 rounded-full hover:bg-gray-100
                ${!checkUserRole() ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading || !checkUserRole()}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="w-full bg-gray-200 h-1 rounded-full overflow-hidden">
            <div 
              className={`h-full ${statusColors[currentStatus]}`}
              style={{ 
                width: `${getProgressPercentage(currentStatus)}%`,
                transition: 'width 0.3s ease-in-out'
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center mt-2 text-xs text-gray-500">
        <Clock className="w-3.5 h-3.5 mr-1" />
        <span>
          {new Date(productcomandas.fechahorarecepcion).toLocaleTimeString()}
        </span>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Confirmar Cambio de Estado"
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl w-11/12 max-w-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75"
        ariaHideApp={false}
      >
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Confirmar Cambio de Estado</h2>
          <p className="text-gray-600">¿Está seguro que desea cambiar el estado a {newStatus}?</p>
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => {
                toast.dismiss();
                handleStatusChange();
              }}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Actualizando...' : 'Aceptar'}
            </button>
            <button
              onClick={closeModal}
              disabled={loading}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};