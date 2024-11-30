import React from "react";
import { Clock } from "lucide-react";
import "../styles/ComandaProductCard.css"; // Asegúrate de importar el archivo CSS

const statusColors = {
  pendiente: "bg-yellow-100 text-yellow-800",
  "en preparación": "bg-blue-100 text-blue-800",
  listo: "bg-green-100 text-green-800",
  recibido: "bg-gray-100 text-gray-800",
};

export const ProductCard = ({ productcomandas }) => {
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
        <span
          className={`product-card-status ${
            statusColors[productcomandas.estadoproductocomanda]
          }`}
        >
          {productcomandas.estadoproductocomanda}
        </span>
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