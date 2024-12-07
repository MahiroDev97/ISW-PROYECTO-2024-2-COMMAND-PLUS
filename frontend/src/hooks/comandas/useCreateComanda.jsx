import { useState } from "react";
import { createComanda } from "@services/comanda.service.js";
import { showErrorAlert, showSuccessAlert } from "@helpers/sweetAlert.js";

const useCreateComanda = (fetchComandas) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleClickCreate = () => {
    setIsPopupOpen(true);
  };

  const handleCreate = async (newComandaData) => {
    const { mesa } = newComandaData;
    if (newComandaData) {
      try {
        const mesaInt= +mesa;
        const newComandaDataInt= {...newComandaData, mesa: mesaInt};
        const newComanda = await createComanda(newComandaDataInt);
        showSuccessAlert("¡Creado!", "La Comanda ha sido creada correctamente.");
        setIsPopupOpen(false);
        fetchComandas((prevComandas) => [...prevComandas, newComanda]);
        await fetchComandas();
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
