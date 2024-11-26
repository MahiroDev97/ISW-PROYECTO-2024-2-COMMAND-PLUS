import { useState } from 'react';
import { updateProductComandaByComanda } from '../services/updateProductComandaByComanda.service.js';

const useUpdateProductComandaByComanda = () => {  
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState(null);

    const updateComanda = async (id, status) => {
        try {
            setIsUpdating(true);
            setError(null);
            const response = await updateProductComandaByComanda(id, status);
            return response;
        } catch (error) {
            setError(error.message);
            console.error("Error: ", error);
            throw error;
        } finally {
            setIsUpdating(false);
        }
    };

    return { updateComanda, isUpdating, error };
};

export default useUpdateProductComandaByComanda;