import { useState } from "react";
import { cancelComanda } from "@services/comanda.service.js";
import { toast } from "react-toastify";

const useCancelComanda = (fetchComandas) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleCancel = async (selectedComandas, reason) => {
    try {
      if (!selectedComandas || selectedComandas.length === 0) {
        toast.error("No hay comanda seleccionada");
        return;
      }

      const comandaId = selectedComandas[0].id;
      await cancelComanda(comandaId, { reason });
      toast.success("Comanda cancelada exitosamente");
      setIsPopupOpen(false);
      await fetchComandas();
    } catch (error) {
      console.error("Error al cancelar la comanda:", error);
      toast.error("Error al cancelar la comanda");
    }
  };

  return { handleCancel, isPopupOpen, setIsPopupOpen };
};

export default useCancelComanda;
