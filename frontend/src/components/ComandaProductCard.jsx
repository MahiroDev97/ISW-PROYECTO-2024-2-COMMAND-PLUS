import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import "../styles/ComandaProductCard.css"; // Asegúrate de importar el archivo CSS

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

  useEffect(() => {
    localStorage.setItem(`status-${productcomandas.id}`, status);
  }, [status, productcomandas.id]);

  const handleStatusChange = async (event) => {
    const newStatus = event.target.value;
    setStatus(newStatus);
    await updateComandaStatus(productcomandas.id, newStatus);
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
          <select
            value={status}
            onChange={handleStatusChange}
            className={`status-select ${statusColors[status]}`}
          >
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="product-card-footer">
        <Clock className="clock-icon" />
        <span>
          {new Date(productcomandas.fechahorarecepcion).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
};