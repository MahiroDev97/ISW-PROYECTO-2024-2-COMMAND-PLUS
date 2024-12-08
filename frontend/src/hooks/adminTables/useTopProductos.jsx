import { useState, useEffect, useCallback } from 'react';
import { getProductComandaHistory, getMesAnoDisponibles } from '../../services/productcomanda.service';

const useTopProductos = () => {
    const [state, setState] = useState({
        topProductos: [],
        loading: false,
        error: null,
        mesAnoDisponibles: [],
        mesSeleccionado: null,
        anoSeleccionado: null
    });

    const handleError = (errorMessage) => {
        console.error(errorMessage);
        setState(prev => ({ ...prev, error: errorMessage }));
    };

    const fetchMesAnoDisponibles = async () => {
        try {
            const response = await getMesAnoDisponibles();
            if (response.status === "Success") {
                const data = response.data.map(({ mes, ano }) => ({
                    mes,
                    ano,
                    label: `${mes}/${ano}`
                }));

                setState(prev => ({
                    ...prev,
                    mesAnoDisponibles: data,
                    mesSeleccionado: data[0]?.mes || prev.mesSeleccionado,
                    anoSeleccionado: data[0]?.ano || prev.anoSeleccionado
                }));

            } else {
                handleError('Error al obtener meses y años disponibles');
            }
        } catch (error) {
            handleError(`Error al obtener meses y años disponibles: ${error}`);
        }
    };

    const fetchTopProductos = useCallback(async () => {
        const { mesSeleccionado, anoSeleccionado } = state;
        if (!mesSeleccionado || !anoSeleccionado) return;

        setState(prev => ({ ...prev, loading: true }));
        try {
            const response = await getProductComandaHistory(mesSeleccionado, anoSeleccionado);

            if (response.status === "Success") {
                const topProductosFormateados = response.data.resumenVentas
                    .sort((a, b) => b.cantidad - a.cantidad)
                    .slice(0, 5)
                    .map(({
                        id, nombre, categoria, precio, cantidad
                    }) => ({
                        id, nombre, categoria, precio, cantidad
                    }));

                console.log("Top 5 productos formateados", topProductosFormateados);

                setState(prev => {
                    const newState = {
                        ...prev,
                        topProductos: topProductosFormateados,
                        loading: false
                    };
                    console.log("Nuevo estado a establecer:", newState);
                    return newState;
                });
            } else {
                handleError('Error al obtener los productos top');
            }
        } catch (error) {
            handleError(`Error al obtener los productos top: ${error}`);
        }
    }, [state.mesSeleccionado, state.anoSeleccionado]);

    // Efecto para monitorear cambios en topProductos
    useEffect(() => {
        console.log("Estado actualizado - topProductos:", state.topProductos);
    }, [state.topProductos]);

    const cambiarMesAno = (mes, ano) => {
        setState(prev => ({
            ...prev,
            mesSeleccionado: mes,
            anoSeleccionado: ano,
            loading: true
        }));
    };

    useEffect(() => {
        fetchMesAnoDisponibles();
    }, []);

    useEffect(() => {
        fetchTopProductos();
    }, [fetchTopProductos]);

    return {
        ...state,
        cambiarMesAno
    };
};

export default useTopProductos;