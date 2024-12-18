import { useEffect, useState } from "react";
import { getTurnosDia, getTurnosMesAno, getTurnosDate } from "../../services/turno.service";

export const useTurnosCharts = () => {
    const [viewMode, setViewMode] = useState("day"); // "day" o "month"
    const [turnos, setTurnos] = useState([]);
    const [datesAvailable, setDatesAvailable] = useState([]);
    const [dateSelected, setDateSelected] = useState(new Date().toISOString().split('T')[0]);
    const [monthsAvailable, setMonthsAvailable] = useState([]);
    const [monthSelected, setMonthSelected] = useState(new Date().getMonth() + 1);
    const [yearSelected, setYearSelected] = useState(new Date().getFullYear());

    // Obtener fechas disponibles al iniciar
    const initializeDates = async () => {
        const response = await getTurnosDate();

        if (response.data) {
            const uniqueDates = response.data;

            // Configurar fechas disponibles para vista diaria
            const datesAvailable = uniqueDates
                .map(date => new Date(date).toISOString().split('T')[0])
                .sort(); // Ordenar fechas cronológicamente

            setDatesAvailable(datesAvailable);

            // Seleccionar la última fecha disponible
            const lastAvailableDate = datesAvailable[datesAvailable.length - 1];
            setDateSelected(lastAvailableDate);

            // Crear array de meses/años únicos para vista mensual
            const mesAnoSet = new Set();
            const mesAnoArray = [];

            uniqueDates.forEach(date => {
                const fecha = new Date(date);
                const mes = fecha.getMonth() + 1;
                const ano = fecha.getFullYear();
                const mesAnoKey = `${mes}-${ano}`;

                if (!mesAnoSet.has(mesAnoKey)) {
                    mesAnoSet.add(mesAnoKey);
                    mesAnoArray.push({ mes, ano });
                }
            });

            // Ordenar por año y mes
            mesAnoArray.sort((a, b) => {
                if (a.ano !== b.ano) return a.ano - b.ano;
                return a.mes - b.mes;
            });

            setMonthsAvailable(mesAnoArray);

            // Establecer el último mes disponible como seleccionado
            if (mesAnoArray.length > 0) {
                const ultimoMes = mesAnoArray[mesAnoArray.length - 1];
                setMonthSelected(ultimoMes.mes);
                setYearSelected(ultimoMes.ano);
            }

            // Cargar datos iniciales según el modo de vista
            if (viewMode === "day") {
                fetchDayData(lastAvailableDate);
            } else {
                const ultimoMes = mesAnoArray[mesAnoArray.length - 1];
                fetchMonthData(ultimoMes.mes, ultimoMes.ano);
            }
        }
    };

    // Cambiar modo de visualización
    const handleViewModeChange = (mode) => {
        setViewMode(mode);
        if (mode === "day") {
            fetchDayData(dateSelected);
        } else {
            fetchMonthData(monthSelected, yearSelected);
        }
    };

    // Obtener datos por día
    const fetchDayData = async (date) => {

        const data = await getTurnosDia(date);

        setTurnos(data);
    };

    // Obtener datos por mes
    const fetchMonthData = async (month, year) => {
        try {
            const data = await getTurnosMesAno(month, year);
            setTurnos(data);
        } catch (error) {
            console.error("Error al obtener datos del mes:", error);
            setTurnos([]);
        }
    };

    // Manejadores de cambios
    const handleDateChange = (newDate) => {
        setDateSelected(newDate);
        if (viewMode === "day") {
            fetchDayData(newDate);
        }
    };

    const handleMonthYearChange = (month, year) => {
        setMonthSelected(month);
        setYearSelected(year);
        if (viewMode === "month") {
            fetchMonthData(month, year);
        }
    };

    // Efectos
    useEffect(() => {
        initializeDates();
    }, []);

    useEffect(() => {
        if (viewMode === "day") {
            fetchDayData(dateSelected);
        } else {
            fetchMonthData(monthSelected, yearSelected);
        }
    }, [viewMode]);

    useEffect(() => {


        fetchDayData(dateSelected);

    }, [dateSelected, datesAvailable]);

    return {
        viewMode,
        turnos,
        dateSelected,
        monthSelected,
        yearSelected,
        datesAvailable,
        monthsAvailable,
        handleViewModeChange,
        handleDateChange,
        handleMonthYearChange,
    };
};