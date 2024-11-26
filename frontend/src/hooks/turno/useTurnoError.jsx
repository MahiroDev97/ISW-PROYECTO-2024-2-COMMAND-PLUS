import { useState } from 'react';

const useTurnoError = () => {
    const [error, setError] = useState(null);

    // Función para manejar el error
    const handleError = (errorMessage) => {
        setError(errorMessage);

    };

    // Función para limpiar el error
    const clearError = () => {
        setError(null);
    };

    return { error, handleError, clearError };
};

export default useTurnoError;
