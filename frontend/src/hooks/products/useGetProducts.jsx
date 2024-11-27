import { useState, useEffect } from "react";
import { getProducts } from "@services/product.service.js";

const useProducts = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      const formattedData = response.data.map((product) => ({
        id: product.id,
        categoria: product.categoria,
        nombre: product.nombre,
        descripcion: product.descripcion,
        precio: product.precio,
        disponibilidad: product.disponibilidad ? "Sí" : "No",
      }));
      dataLogged(formattedData);
      setProducts(formattedData);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const dataLogged = (formattedData) => {
    try {
      const { rut } = JSON.parse(sessionStorage.getItem("usuario"));
      for (let i = 0; i < formattedData.length; i++) {
        if (formattedData[i].rut === rut) {
          formattedData.splice(i, 1);
          break;
        }
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return { products, fetchProducts, setProducts };
};

export default useProducts;
