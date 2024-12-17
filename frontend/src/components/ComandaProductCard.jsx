import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { wsService } from '../services/websocket';
import Modal from 'react-modal';
import useEditProductComanda from '../hooks/productComanda/useEditProductComanda';

const OrderStatus = {
  PENDING: "pendiente",
  IN_PREPARATION: "en preparación",
  READY: "listo",
  RECEIVED: "recibido",
};

const statusColors = {
  [OrderStatus.PENDING]: "bg-yellow-100 text-yellow-800",
  [OrderStatus.IN_PREPARATION]: "bg-blue-100 text-blue-800",
  [OrderStatus.READY]: "bg-green-100 text-green-800",
  [OrderStatus.RECEIVED]: "bg-gray-100 text-gray-800",
};

const statusOptions = Object.values(OrderStatus);

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

  const handleStatusChange = async () => {
    if (newStatus) {
      try {
        await updateComandaStatus(productcomandas.id, newStatus);
        
        wsService.send({
          type: 'COMANDA_UPDATE',
          data: {
            comandaId: comanda.id,
            mesa: comanda.mesa,
            productId: productcomandas.id,
            productName: productcomandas.product.nombre,
            newStatus: newStatus,
            timestamp: new Date().toISOString()
          }
        });

        toast.success(`Estado del producto "${productcomandas.product.nombre}" actualizado a ${newStatus}`, {
          position: "top-right",
          autoClose: 3000,
        });

        closeModal();
      } catch (error) {
        toast.error('Error al actualizar el estado');
        console.error('Error:', error);
      }
    }
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
        <div>
          <div className="flex gap-1 flex-wrap">
            {statusOptions.map((option) => (
              <button
                key={option}
                onClick={() => openModal(option)}
                className={`px-2 py-1 rounded text-xs font-bold min-w-[2rem] 
                  ${currentStatus === option ? 'ring-2 ring-current' : ''} 
                  ${statusColors[option]}`}
                disabled={loading}
              >
                {option === OrderStatus.PENDING ? 'P' : 
                 option === OrderStatus.IN_PREPARATION ? 'EP' :
                 option === OrderStatus.READY ? 'L' : 'R'}
              </button>
            ))}
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