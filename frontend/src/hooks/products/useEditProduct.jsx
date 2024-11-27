import { useState } from 'react';
import { updateProduct } from '@services/product.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import { formatPostUpdate } from '@helpers/formatData.js';

const useEditProduct = (setProducts) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [dataProduct, setDataProduct] = useState([]);

    const handleClickUpdate = () => {
        if (dataProduct.length > 0) {
            setIsPopupOpen(true);
        }
    };

    const handleUpdate = async (updatedProductData) => {
        if (updatedProductData) {
            try {
                const {id, ...dataProduct} = updatedProductData;
                const updatedProduct = await updateProduct(id, dataProduct);
                showSuccessAlert('¡Actualizado!','El producto ha sido actualizado correctamente.');
                setIsPopupOpen(false);
                const formattedProduct = formatPostUpdate(updatedProduct);

                setProducts(prevProducts => prevProducts.map(product => {
                    if (product.id === formattedProduct.id) {
                        return formattedProduct;
                    }
                    return product;
                }));

                setDataProduct([]);
            } catch (error) {
                console.error('Error al actualizar el producto:', error);
                showErrorAlert('Cancelado','Ocurrió un error al actualizar el producto.');
            }
        }
    };

    return {
        handleClickUpdate,
        handleUpdate,
        isPopupOpen,
        setIsPopupOpen,
        dataProduct,
        setDataProduct
    };
};

export default useEditProduct;
