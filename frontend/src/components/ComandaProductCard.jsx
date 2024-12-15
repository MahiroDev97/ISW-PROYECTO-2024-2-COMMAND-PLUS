import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/ComandaProductCard.css";
import Modal from 'react-modal';

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

export const ProductCard = ({ productcomandas, updateComandaStatus }) => {
  const [status, setStatus] = useState(() => {
    const savedStatus = localStorage.getItem(`status-${productcomandas.id}`);
    return savedStatus || productcomandas.estadoproductocomanda;
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newStatus, setNewStatus] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false); 
  useEffect(() => {
    localStorage.setItem(`status-${productcomandas.id}`, status);
  }, [status, productcomandas.id]);

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
        setStatus(newStatus);
        toast.success('¡Estado actualizado correctamente!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        closeModal();
      } catch (error) {
        toast.error('Error al actualizar el estado', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        console.error('Error al actualizar el estado:', error);
        closeModal();
      }
    }
  };

  return (
    <div className="product-card">
      <div className="product-card-header">
        <div>
          <h3 className="product-card-title">
            {productcomandas.product.nombre}
          </h3>
          <p className="product-card-description">
            {productcomandas.product.descripcion}
          </p>
        </div>
        <div className="product-card-status">
          <div className="status-buttons">
            {statusOptions.map((option) => (
              <button
                key={option}
                onClick={() => openModal(option)}
                className={`status-btn ${status === option ? 'active' : ''} ${statusColors[option]}`}
              >
                {option === OrderStatus.PENDING ? 'P' : 
                 option === OrderStatus.IN_PREPARATION ? 'EP' :
                 option === OrderStatus.READY ? 'L' : 'R'}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="product-card-footer">
        <Clock className="clock-icon" />
        <span>
          {new Date(productcomandas.fechahorarecepcion).toLocaleTimeString()}
        </span>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Confirmar Cambio de Estado"
        className="modal"
        overlayClassName="overlay"
        ariaHideApp={false} // Fix react-modal warning
      >
        <div className="modal-content">
          <h2 className="modal-title">Confirmar Cambio de Estado</h2>
          <p className="modal-message">¿Está seguro que desea cambiar el estado a {newStatus}?</p>
          <div className="modal-buttons">
            <button
              onClick={() => {
                toast.dismiss(); // Dismiss any existing toasts
                handleStatusChange();
              }}
              className="accept-button"
              disabled={isUpdating}
            >
              {isUpdating ? 'Actualizando...' : 'Aceptar'}
            </button>
            <button
              onClick={closeModal}
              className="cancel-button"
              disabled={isUpdating}
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};