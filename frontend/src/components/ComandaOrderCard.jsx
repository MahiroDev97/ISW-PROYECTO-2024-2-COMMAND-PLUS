import React from "react";
import { Utensils, Calendar } from "lucide-react";
import { ProductCard } from "./ComandaProductCard";
import "../styles/ComandaOrderCard.css"; // Importa el archivo CSS

export const OrderCard = ({ comanda }) => {
  return (
    <div className="order-card">
      <div className="order-card-header">
        <div className="header-content">
          <div className="title">
            <Utensils className="text-white w-5 h-5 mr-2" />
            <h2>Mesa {comanda.mesa}</h2>
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
              />
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
      </div>
    </div>
  );
};