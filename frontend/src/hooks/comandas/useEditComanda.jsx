import { useState } from 'react';
import { updateComanda } from '@services/comanda.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import { formatPostUpdate } from '@helpers/formatData.js';

const useEditComanda = (setComandas) => {
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
                const { id, ...dataComanda } = updatedComandaData;
                const updatedComanda = await updateComanda(id, dataComanda);
                showSuccessAlert('¡Actualizado!', 'La Comanda ha sido actualizada correctamente.');
                setIsPopupOpen(false);
                const formattedComanda = formatPostUpdate(updatedComanda);

                setComandas(prevComandas => prevComandas.map(comanda => {
                    if (comanda.id === formattedComanda.id) {
                        return formattedComanda;
                    }
                    return comanda;
                }));

                setDataComanda([]);
            } catch (error) {
                console.error('Error al intentar actualizar la Comanda:', error);
                showErrorAlert('Cancelado', 'Ha ocurrido un error al actualizar la comanda.');
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
