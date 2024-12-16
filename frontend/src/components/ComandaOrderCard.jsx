import React, { useState, useEffect } from "react";
import { Utensils, Calendar, Bell, CheckCircle } from "lucide-react";
import { ProductCard } from "./ComandaProductCard";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/ComandaOrderCard.css";

// Funciones helper para manejar el estado persistente
const getStoredOrderState = (comandaId) => {
  const key = `orderState_${comandaId}`;
  const storedState = localStorage.getItem(key);
  return storedState ? JSON.parse(storedState) : null;
};

const setStoredOrderState = (comandaId, state) => {
  const key = `orderState_${comandaId}`;
  localStorage.setItem(key, JSON.stringify(state));
};

export const OrderCard = ({ comanda, onUpdateComanda }) => {
  const [estado, setEstado] = useState(() => {
    const storedState = getStoredOrderState(comanda.id);
    return storedState?.estado || comanda.estado;
  });

  const [isUpdating, setIsUpdating] = useState(false);
  const [productStatuses, setProductStatuses] = useState(() => {
    const storedState = getStoredOrderState(comanda.id);
    return storedState?.productStatuses || comanda.productcomandas.map(product => product.estadoproductocomanda);
  });

  const [isNotified, setIsNotified] = useState(false);
  const [allProductsReady, setAllProductsReady] = useState(() => {
    const storedState = getStoredOrderState(comanda.id);
    return storedState?.allProductsReady || false;
  });

  const [hasBeenServed, setHasBeenServed] = useState(() => {
    const storedState = getStoredOrderState(comanda.id);
    return storedState?.hasBeenServed || false;
  });

  const checkUserRole = () => {
    const user = JSON.parse(sessionStorage.getItem("usuario"));
    return user?.role === "garzon" || user?.role === "administrador";
  };

  // Efecto para verificar si todos los productos están listos
  useEffect(() => {
    const areAllProductsReady = productStatuses.every(status => status === "listo");
    const newAllProductsReady = areAllProductsReady && !hasBeenServed;
    setAllProductsReady(newAllProductsReady);

    // Guardar el estado actual en localStorage
    setStoredOrderState(comanda.id, {
      estado,
      productStatuses,
      allProductsReady: newAllProductsReady,
      hasBeenServed
    });

    const isAuthorizedUser = checkUserRole();

    if (areAllProductsReady && estado !== "listo" && !isNotified && isAuthorizedUser) {
      const user = JSON.parse(sessionStorage.getItem("usuario"));
      const roleText = user?.role === "administrador" ? "Administrador" : "Garzón";

      toast.info(
        <div className="flex items-center">
          <Bell className="mr-2" />
          <span>
            {roleText}: ¡Comanda {comanda.id} para Mesa #{comanda.mesa} lista para servir!
          </span>
        </div>,
        {
          position: "top-center",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className: "bg-green-100 text-green-800 font-bold",
        }
      );

      handleStatusChange({ target: { value: "listo" } }, comanda.id);
      setIsNotified(true);
    }
  }, [productStatuses, estado, comanda.id, isNotified, hasBeenServed]);

  const handleStatusChange = async (e, comandaId) => {
    const newStatus = e.target.value;
    setIsUpdating(true);

    try {
      await updateComandaStatus(comandaId, newStatus);

      setEstado(newStatus);
      if (newStatus === "servido") {
        setHasBeenServed(true);
        setAllProductsReady(false);
      }

      // Actualizar el estado en localStorage
      setStoredOrderState(comandaId, {
        estado: newStatus,
        productStatuses,
        allProductsReady,
        hasBeenServed: newStatus === "servido"
      });

      if (onUpdateComanda) {
        onUpdateComanda(comandaId, newStatus);
      }
    } catch (error) {
      console.error('Error al actualizar el estado de la comanda:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleServeOrder = async () => {
    const isAuthorizedUser = checkUserRole();
    if (!isAuthorizedUser) {
      toast.error("Solo los garzones y administradores pueden marcar comandas como servidas");
      return;
    }
    await handleStatusChange({ target: { value: "servido" } }, comanda.id);
  };

  const updateComandaStatus = async (comandaId, newStatus) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Updating comanda ${comandaId} to status ${newStatus}`);
        resolve();
      }, 1000);
    });
  };

  const updateProductStatus = (productId, newStatus) => {
    const updatedStatuses = productStatuses.map((status, index) =>
      comanda.productcomandas[index].id === productId ? newStatus : status
    );
    setProductStatuses(updatedStatuses);

    // Actualizar el estado en localStorage
    setStoredOrderState(comanda.id, {
      estado,
      productStatuses: updatedStatuses,
      allProductsReady,
      hasBeenServed
    });
  };

  return (
    <div className={`order-card`}>
      <div className="order-card-header">
        <div className="header-content">
          <div className="title">
            <Utensils className="text-white w-5 h-5 mr-2" />
            <span>Comanda #{comanda.id}</span>
            {allProductsReady && (
              <div className="flex items-center ml-2 bg-green-100 text-green-800 px-2 py-1 rounded-full">
                <CheckCircle className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">¡Lista para servir!</span>
              </div>
            )}
          </div>
          <div className="date">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{new Date(comanda.fecha).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
      <div className="order-card-body">
        <div className="products">
          {comanda.productcomandas && comanda.productcomandas.length > 0 ? (
            comanda.productcomandas.map((productComanda) => (
              <ProductCard
                key={productComanda.id}
                productcomandas={productComanda}
                comanda={comanda} // Añadimos esta prop
                updateComandaStatus={async (productId, newStatus) => {
                  await updateComandaStatus(productId, newStatus);
                  updateProductStatus(productId, newStatus);
                }}
              />
            ))
          ) : (
            <p>No hay productos en esta comanda.</p>
          )}
        </div>
        <div className="status-controls mt-4">
          {allProductsReady && checkUserRole() && (
            <button
              onClick={handleServeOrder}
              disabled={isUpdating}
              className="ml-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Marcar como Servida
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
