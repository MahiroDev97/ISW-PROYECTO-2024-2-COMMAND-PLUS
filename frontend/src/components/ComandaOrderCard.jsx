import { useState, useEffect } from "react";
import { Utensils, Calendar, Bell, CheckCircle } from "lucide-react";
import { ProductCard } from "./ComandaProductCard";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useEditProductComanda from '../hooks/productComanda/useEditProductComanda';

export const OrderCard = ({ comanda, onUpdateComanda }) => {
  const [estado, setEstado] = useState(comanda.estado);
  const [isNotified, setIsNotified] = useState(false);
  const [hasBeenServed, setHasBeenServed] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  
  const { 
    updateProductStatus, 
    productStatuses, 
    loading, 
    checkAllProductsReady 
  } = useEditProductComanda(comanda.productcomandas);

  useEffect(() => {
    const isAuthorizedUser = checkUserRole();
    const allReady = checkAllProductsReady();

    if (allReady && estado !== "listo" && !isNotified && isAuthorizedUser) {
      const user = JSON.parse(sessionStorage.getItem("usuario"));
      const roleText = user?.role === "administrador" ? "Administrador" : "cocinero";

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


      setEstado("listo");
      setIsNotified(true);
    }
  }, [productStatuses, estado, isNotified]);

  const checkUserRole = () => {
    const user = JSON.parse(sessionStorage.getItem("usuario"));
    return user?.role === "garzon" || user?.role === "administrador";
  };

  const handleStatusChange = async (e, comandaId) => {
    const newStatus = e.target.value;
    setIsUpdating(true);

    try {
      await updateComandaStatus(comandaId, newStatus);

      setEstado(newStatus);
      if (newStatus === "servido") {
        setHasBeenServed(true);
      }

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

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
      <div className="bg-indigo-600 p-4">
        <div className="flex justify-between items-center flex-wrap">
          <div className="flex items-center">
            <Utensils className="text-white w-5 h-5 mr-2" />
            <span className="text-white text-sm font-semibold">Comanda #{comanda.id}</span>
            {checkAllProductsReady() && !hasBeenServed && (
              <div className="flex items-center ml-2 bg-green-100 text-green-800 px-2 py-1 rounded-full">
                <CheckCircle className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">¡Lista para servir!</span>
              </div>
            )}
          </div>
          <div className="flex items-center text-indigo-100">
            <Calendar className="w-4 h-4 mr-1" />
            <span className="text-xs">{new Date(comanda.fecha).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex flex-col gap-3">
          {comanda.productcomandas?.map((productComanda) => (
            <ProductCard
              key={productComanda.id}
              productcomandas={productComanda}
              comanda={comanda}
              updateComandaStatus={updateProductStatus}
              currentStatus={productStatuses[productComanda.id]}
              loading={loading}
            />
          ))}
        </div>
        <div className="mt-4">
          {checkAllProductsReady() && !hasBeenServed && checkUserRole() && (
            <button
              onClick={handleServeOrder}
              disabled={isUpdating || loading}
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