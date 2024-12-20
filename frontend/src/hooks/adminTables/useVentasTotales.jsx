import { getVentasTotales } from '../../services/productcomanda.service';
import { useState, useEffect } from 'react';
import { getMesAnoDisponibles } from '../../services/productcomanda.service';

export default function useVentasTotales() {
    const [ventasTotales, setVentasTotales] = useState({
        labels: [],
        datasets: []
    });
    const [anoSeleccionado, setAnoSeleccionado] = useState(new Date().getFullYear());
    const [anosDisponiblesState, setAnosDisponiblesState] = useState([]);
    const [error, setError] = useState(null);

    // Efecto para cargar años disponibles solo una vez al montar el componente
    useEffect(() => {
        fetchAnosDisponibles();
    }, []);
    // Solo se ejecuta al montar el componente
    useEffect(() => {
        if (anoSeleccionado) {
            fetchVentasTotales();
        }
    }, [anoSeleccionado]);

    const fetchAnosDisponibles = async () => {
        try {
            const response = await getMesAnoDisponibles();
            if (response.status === "Success") {
                const anosUnicos = [...new Set(response.data.map(item => item.ano))]
                    .map(ano => ({ ano, label: ano }));

                setAnosDisponiblesState(anosUnicos);

                // Seleccionar el primer año disponible solo si no hay año seleccionado
                if (anosUnicos.length > 0 && !anoSeleccionado) {
                    setAnoSeleccionado(anosUnicos[0].ano);
                }
            } else {
                setError('Error al obtener años disponibles');
            }
        } catch (error) {
            setError(`Error al obtener años disponibles: ${error}`);
        }
    };

    const fetchVentasTotales = async () => {
        console.log('Iniciando fetchVentasTotales con año:', anoSeleccionado);
        if (!anoSeleccionado) {
            console.log('No hay año seleccionado, saltando fetch');
            return;
        }

        try {
            const response = await getVentasTotales(anoSeleccionado);
            console.log('Response ventas totales:', response);

            // Verificar que response sea un array
            if (Array.isArray(response)) {
                // Inicializar array con 12 ceros (uno para cada mes)
                const ventasPorMes = new Array(12).fill(0);

                // Llenar el array con los datos disponibles
                response.forEach(item => {
                    if (item.mes && item.totalVentas) { // Cambiado de item.total a item.totalVentas
                        // Restamos 1 porque los meses en el array son 0-based
                        const mesIndex = item.mes - 1;
                        if (mesIndex >= 0 && mesIndex < 12) {
                            ventasPorMes[mesIndex] = item.totalVentas;
                        }
                    }
                });

                const chartData = {
                    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                    datasets: [{
                        label: `Ventas ${anoSeleccionado}`,
                        data: ventasPorMes,
                        borderColor: 'rgb(75, 192, 192)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        tension: 0.1,
                        fill: true
                    }]
                };

                console.log('Datos procesados para el gráfico:', chartData);
                setVentasTotales(chartData);
            } else {
                console.error('Formato de respuesta inválido:', response);
                setError('Error: Datos de ventas no disponibles');
            }
        } catch (error) {
            console.error('Error en fetchVentasTotales:', error);
            setError(`Error al obtener ventas totales: ${error}`);
        }
    }

    return {
        ventasTotales,
        anosDisponiblesState,
        anoSeleccionado,
        setAnoSeleccionado,
        error
    };
}