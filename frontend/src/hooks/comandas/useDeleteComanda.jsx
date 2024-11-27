import { deleteComanda } from "@services/comanda.service.js"; 
import { deleteDataAlert, showErrorAlert, showSuccessAlert } from "@helpers/sweetAlert";

const useDeleteComanda = (fetchComanda, setDataComanda) => {

    const handleDelete = async (dataComanda) => {
        if (dataComanda.length > 0) {
            try {
                const result = await deleteDataAlert();
                if (result.isConfirmed) {
                    const response = await deleteComanda(dataComanda[0].id);
                    if(response.status === 'Client error') {
                        return showErrorAlert('Error', response.details);
                    }
                    showSuccessAlert('¡Eliminado!','La Comanda ha sido eliminada correctamente.');
                    await fetchComanda();
                    setDataComanda([]);
                } else {
                    showErrorAlert('Cancelado', 'La operación ha sido cancelada.');
                }
            } catch (error) {
                console.error('Error al eliminar la comanda:', error);
                showErrorAlert('Cancelado', 'Ocurrió un error al eliminar la comanda.');
            }
        }
    };

    return {
        handleDelete
    };

};

export default useDeleteComanda;