import { useState } from 'react';
import { updateComanda } from '@services/comanda.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import { formatPostUpdate } from '@helpers/formatData.js';

const useEditComanda = (fetchComandas) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [dataComanda, setDataComanda] = useState([]);

    const handleClickUpdate = () => {
        if (dataComanda.length > 0) {
            setIsPopupOpen(true);
        }
    };

    const handleUpdate = async (updatedComandaData) => {
        if (updatedComandaData) {
          try {
            const { id, productcomandas, productos, ...dataComanda } = updatedComandaData;
            
            // se incluyen los productos al actualizar
            const commandaToUpdate = {
              ...dataComanda,
              productos: productos 
            };

            const updatedComanda = await updateComanda(id, commandaToUpdate);
            showSuccessAlert(
              "¡Actualizado!",
              "La Comanda ha sido actualizada correctamente."
            );
            setIsPopupOpen(false);
            await fetchComandas();
            setDataComanda([]);
          } catch (error) {
            console.error("Error al intentar actualizar la Comanda:", error);
            showErrorAlert(
              "Cancelado",
              "Ha ocurrido un error al actualizar la comanda."
            );
          }
        }
      };

    return {
        handleClickUpdate,
        handleUpdate,
        isPopupOpen,
        setIsPopupOpen,
        dataComanda,
        setDataComanda
    };
};

export default useEditComanda;
