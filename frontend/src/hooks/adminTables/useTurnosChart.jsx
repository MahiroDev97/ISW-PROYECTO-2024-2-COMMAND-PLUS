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
    const [monthSelected, setMonthSelected] = useState(new Date().getMonth() + 1);
    const [yearSelected, setYearSelected] = useState(new Date().getFullYear());

    // Obtener fechas disponibles al iniciar
    const initializeDates = async () => {
        const response = await getTurnosDate();
        console.log("response", response);

        const uniqueDates = response.data;
        console.log("uniqueDates", uniqueDates);

        const datesAvailable = uniqueDates.map(date => new Date(date).toISOString().split('T')[0]);
        console.log("datesAvailable", datesAvailable);
        setDatesAvailable(datesAvailable);
        setDateSelected(datesAvailable[0]);
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
        const [data, error] = await getTurnosMesAno(month, year);
        if (error) {
            console.error("Error al obtener datos del mes:", error);
            return;
        }
        setTurnos(data);
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

        // Manejadores
        handleViewModeChange,
        handleDateChange,
        handleMonthYearChange,
    };
};