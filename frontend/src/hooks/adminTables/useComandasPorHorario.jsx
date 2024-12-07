import { useState, useEffect } from 'react';
import { getComandasPorMesAno } from '../../services/comanda.service';
import { getMesAnoDisponibles } from '../../services/productcomanda.service';

export default function useHorariosChart() {
    const [horariosData, setHorariosData] = useState({
        labels: [],
        datasets: []
    });
    const [mesAnoDisponibles, setMesAnoDisponibles] = useState([]);
    const [mesSeleccionado, setMesSeleccionado] = useState(new Date().getMonth() + 1);
    const [anoSeleccionado, setAnoSeleccionado] = useState(new Date().getFullYear());
    const [error, setError] = useState(null);

    const fetchMesAnoDisponibles = async () => {
        try {
            const response = await getMesAnoDisponibles();
            if (response.status === "Success") {
                const data = response.data.map(({ mes, ano }) => ({
                    mes,
                    ano,
                    label: `${mes}/${ano}`
                }));
                setMesAnoDisponibles(data);

                // Establecer el mes y año inicial
                if (data.length > 0) {
                    setMesSeleccionado(data[0].mes);
                    setAnoSeleccionado(data[0].ano);
                }
            }
        } catch (error) {
            setError('Error al obtener meses disponibles: ' + error);
        }
    };

    const cambiarMesAno = (mes, ano) => {
        setMesSeleccionado(mes);
        setAnoSeleccionado(ano);
    };

    // Efecto para cargar los meses disponibles
    useEffect(() => {
        fetchMesAnoDisponibles();
    }, []);

    // Efecto para cargar los datos cuando cambia el mes/año
    useEffect(() => {
        const fetchHorarios = async () => {
            try {
                const response = await getComandasPorMesAno(mesSeleccionado, anoSeleccionado);
                if (response.status === "Success") {
                    const chartData = procesarDatos(response.data);
                    setHorariosData(chartData);
                } else {
                    setError('Error al obtener datos de horarios');
                }
            } catch (error) {
                setError(`Error al obtener horarios: ${error}`);
            }
        };

        fetchHorarios();
    }, [mesSeleccionado, anoSeleccionado]);

    const procesarDatos = (comandas) => {
        // Crear franjas horarias (8am a 12am)
        const franjasHorarias = Array.from({ length: 8 }, (_, i) => {
            const hora = 8 + (i * 2);
            return `${hora}:00-${hora + 2}:00`;
        });

        // Inicializar contadores para cada día y franja
        const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
        const contadores = {};
        diasSemana.forEach(dia => {
            contadores[dia] = Array(8).fill(0);
        });

        // Procesar cada comanda
        comandas.forEach(({ fecha }) => {
            const date = new Date(fecha);
            const hora = date.getHours();
            const dia = diasSemana[date.getDay() === 0 ? 6 : date.getDay() - 1];

            const franjaIndex = Math.floor((hora - 8) / 2);
            if (franjaIndex >= 0 && franjaIndex < 8) {
                contadores[dia][franjaIndex]++;
            }
        });

        // Definir colores más vibrantes, destacando fin de semana
        const colores = {
            'Lunes': 'rgb(255, 99, 132)',    // Rosa
            'Martes': 'rgb(54, 162, 235)',   // Azul
            'Miércoles': 'rgb(75, 192, 192)', // Turquesa
            'Jueves': 'rgb(255, 206, 86)',   // Amarillo
            'Viernes': 'rgb(153, 102, 255)', // Morado
            'Sábado': 'rgb(255, 159, 64)',   // Naranja
            'Domingo': 'rgb(231, 233, 237)'  // Gris
        };

        // Crear datasets
        const datasets = diasSemana.map(dia => ({
            label: dia,
            data: contadores[dia],
            borderColor: colores[dia],
            backgroundColor: colores[dia],
            borderWidth: 2,
            tension: 0.1,

        }));

        return {
            labels: franjasHorarias,
            datasets
        };
    };

    return {
        horariosData,
        error,
        mesAnoDisponibles,
        mesSeleccionado,
        anoSeleccionado,
        cambiarMesAno
    };
}