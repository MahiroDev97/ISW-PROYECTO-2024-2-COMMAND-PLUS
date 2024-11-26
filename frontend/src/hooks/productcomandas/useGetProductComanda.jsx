import { useState, useEffect } from 'react';
import { getProductComandaByComanda } from '../services/getProductComandaByComanda.service.js';

const useGetProductComandaByComanda = (id) => {
    const [productComanda, setProductComanda] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProductComanda = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await getProductComandaByComanda(id);
            setProductComanda(response);
        } catch (error) {
            setError(error.message);
            console.error("Error: ", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchProductComanda();
        }
    }, [id]);

    return { productComanda, isLoading, error, fetchProductComanda, setProductComanda };
}; 

export default useGetProductComandaByComanda;