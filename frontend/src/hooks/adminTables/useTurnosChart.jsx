import { useEffect, useState } from "react";
import { getTurnosDia, getTurnosMesAno, getTurnosDate } from "../../services/turno.service";

export const useTurnosCharts = () => {
    // Estados básicos
    const [viewMode, setViewMode] = useState("day"); // "day" o "month"
    const [turnos, setTurnos] = useState([]);

    // Estados para el modo día
    const [datesAvailable, setDatesAvailable] = useState([]);
    const [dateSelected, setDateSelected] = useState(new Date().toISOString().split('T')[0]);

    // Estados para el modo mes
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
        console.log("date", date);

        const data = await getTurnosDia(date);
        console.log("data", data);
        setTurnos(data);
    };

    // Obtener datos por mes
    const fetchMonthData = async (month, year) => {
        try {
            const data = await getTurnosMesAno(month, year);
            console.log("Datos del mes:", data);
            setTurnos(data);
        } catch (error) {
            console.error("Error al obtener datos del mes:", error);
            setTurnos([]); // Establecer un array vacío en caso de error
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
        console.log("dateSelected", dateSelected);
        console.log("datesAvailable", datesAvailable);

        fetchDayData(dateSelected);

    }, [dateSelected, datesAvailable]);

    return {
        // Estados
        viewMode,
        turnos,
        dateSelected,
        monthSelected,
        yearSelected,
        datesAvailable,
        monthsAvailable,

        // Manejadores
        handleViewModeChange,
        handleDateChange,
        handleMonthYearChange,
    };
};