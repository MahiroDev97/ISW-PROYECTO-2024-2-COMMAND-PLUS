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
        showSuccessAlert(
          "¡ComandaCreada!",
          "La Comanda ha sido creada correctamente."
        );
        setIsPopupOpen(false);
        setComandas((prevComandas) => [...prevComandas, newComanda]);
      } catch (error) {
        console.error("Error al crear la comanda:", error);
        showErrorAlert(
          "Cancelado",
          "Ha Ocurrido un error al crear la comanda."
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
