import { useState } from "react";
import { updateProductComanda } from "../../services/productcomanda.service";
import { toast } from 'react-toastify';

const useEditProductComanda = (initialProducts = []) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [productStatuses, setProductStatuses] = useState(
    initialProducts.reduce(
      (acc, product) => ({
        ...acc,
        [product.id]: product.estadoproductocomanda,
      }),
      {}
    )
  );

  const handleProductStatusUpdate = async (productId, newStatus) => {
    try {
      setLoading(true);
      setError(null);

      const product = {
        id: productId,
        estadoproductocomanda: newStatus,
      };

      const response = await updateProductComanda(product);

      setProductStatuses((prev) => ({
        ...prev,
        [productId]: newStatus,
      }));

      

      return response; // Return the full response
    } catch (err) {
      setError(err.message);
      toast.error(`Error al actualizar el producto: ${err.message}`, {
        position: "bottom-right",
        autoClose: 4000,
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const checkAllProductsReady = () => {
    return Object.values(productStatuses).every((status) => status === "listo");
  };

  return {
    loading,
    error,
    productStatuses,
    updateProductStatus: handleProductStatusUpdate,
    checkAllProductsReady,
  };
};

export default useEditProductComanda;
