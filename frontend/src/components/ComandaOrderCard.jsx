import React, { useState } from "react";
import { Utensils, Calendar } from "lucide-react";
import { ProductCard } from "./ComandaProductCard";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/ComandaOrderCard.css"; // Importa el archivo CSS

const ComandStatus = {
  PENDING: "pendiente",
  READY: "listo"
};

const statusColors = {
  [ComandStatus.PENDING]: "bg-orange-500 text-white",
  [ComandStatus.READY]: "bg-emerald-500 text-white",
};

const statusOptions = Object.values(ComandStatus);

export const OrderCard = ({ comanda }) => {
  const [estado, setEstado] = useState(comanda.estado);

  const handleStatusChange = (e) => {
    setEstado(e.target.value);
    console.log(`Status changed to: ${e.target.value}`);
  };

  const updateComandaStatus = async (productId, newStatus) => {
    try {
      // Aquí puedes agregar la lógica para actualizar el estado en el backend si es necesario
      console.log(`Updating product ${productId} to status ${newStatus}`);
      // Simulación de una llamada a la API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('¡Estado actualizado correctamente!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
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
    }
  };

  return (
    <div className="order-card">
      <div className="order-card-header">
        <div className="header-content">
          <div className="title">
            <Utensils className="text-white w-5 h-5 mr-2" />
            <span>Comanda</span>
          </div>
          <div className={`status ${statusColors[estado]}`}>
            {estado}
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
                updateComandaStatus={updateComandaStatus}
              />
            ))
          ) : (
            <p>No hay productos en esta comanda.</p>
          )}
        </div>
      </div>
    </div>
  );
};