import { deleteProduct } from "@services/product.service.js"; 
import { deleteDataAlert, showErrorAlert, showSuccessAlert } from "@helpers/sweetAlert";

const useDeleteUser = (fetchProducts, setDataProduct) => {

    const handleDelete = async (dataProduct) => {
        if (dataProduct.length > 0) {
            try {
                const result = await deleteDataAlert();
                if (result.isConfirmed) {
                    const response = await deleteProduct(dataProduct[0].id);
                    if(response.status === 'Client error') {
                        return showErrorAlert('Error', response.details);
                    }
                    showSuccessAlert('¡Eliminado!','El producto ha sido eliminado correctamente.');
                    await fetchProducts();
                    setDataProduct([]);
                } else {
                    showErrorAlert('Cancelado', 'La operación ha sido cancelada.');
                }
            } catch (error) {
                console.error('Error al eliminar el producto:', error);
                showErrorAlert('Cancelado', 'Ocurrió un error al eliminar el producto.');
            }
        }
    };

    return {
        handleDelete
    };

};

export default useDeleteUser;