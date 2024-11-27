import { useState } from "react";
import { createProduct } from "@services/product.service.js";
import { showErrorAlert, showSuccessAlert } from "@helpers/sweetAlert.js";

const useCreateProduct = (setProducts) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleClickCreate = () => {
    setIsPopupOpen(true);
  };

  const handleCreate = async (newProductData) => {
    if (newProductData) {
      try {
        const newProduct = await createProduct(newProductData);
        showSuccessAlert(
          "¡Creado!",
          "El producto ha sido creado correctamente."
        );
        setIsPopupOpen(false);
        setProducts((prevProducts) => [...prevProducts, newProduct]);
      } catch (error) {
        console.error("Error al crear el producto:", error);
        showErrorAlert("Cancelado", "Ocurrió un error al crear el producto.");
      }
    }
  };

  return {
    handleClickCreate,
    handleCreate,
    isPopupOpen,
    setIsPopupOpen,
  };
};

export default useCreateProduct;
