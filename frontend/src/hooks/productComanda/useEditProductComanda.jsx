import { useState } from "react";
import { updateProductComanda } from "../../services/productcomanda.service";

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
