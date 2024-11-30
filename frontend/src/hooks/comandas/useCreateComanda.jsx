import { useState } from "react";
import { createComanda } from "@services/comanda.service.js";
import { showErrorAlert, showSuccessAlert } from "@helpers/sweetAlert.js";

const useCreateComanda = (setComandas) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleClickCreate = () => {
    setIsPopupOpen(true);
  };

  const handleCreate = async (newComandaData) => {
    if (newComandaData) {
      try {
        const newComanda = await createComanda(newComandaData);
        showSuccessAlert("¡Creado!", "La Comanda ha sido creada correctamente.");
        setIsPopupOpen(false);
        setComandas((prevComandas) => [...prevComandas, newComanda]);
      } catch (error) {
        console.error("Error al intentar crear la Comanda:", error);
        showErrorAlert(
          "Cancelado",
          "Ha ocurrido un error al crear la comanda."
        );
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

export default useCreateComanda;
