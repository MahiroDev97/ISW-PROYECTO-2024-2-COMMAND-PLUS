import { useState, useEffect, useCallback } from 'react';
import { getProductComandaHistory } from '../../services/productcomanda.service';
import { getMesAnoDisponibles } from '../../services/comanda.service';

const useTopProductos = () => {
    const [state, setState] = useState({
        topProductos: [],
        loading: false,
        error: null,
        mesAnoDisponibles: [],
        mesSeleccionado: new Date().getMonth() + 1,
        anoSeleccionado: new Date().getFullYear()
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
                const topProductosFormateados = response.data.resumenVentas.map(({
                    id, nombre, categoria, precio, cantidad
                }) => ({
                    id, nombre, categoria, precio, cantidad
                }));

                console.log("Top productos formateados", topProductosFormateados);

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