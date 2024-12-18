import { useState } from 'react';

const useCalendar = (selectedDate, datesAvailable) => {

    const [currentDate, setCurrentDate] = useState(new Date(selectedDate));
    const [showMonthSelector, setShowMonthSelector] = useState(false);
    const [showYearSelector, setShowYearSelector] = useState(false);

    const monthNames = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    // Obtener años únicos de las fechas disponibles
    const availableYears = [...new Set(datesAvailable.map(date =>
        new Date(date).getFullYear()
    ))].sort((a, b) => a - b);

    // Funciones auxiliares
    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    // Convertir fechas disponibles a formato YYYY-MM-DD para comparación
    const availableDatesSet = new Set(datesAvailable);

    const isDateAvailable = (date) => {
        const dateString = date.toISOString().split('T')[0];
        return availableDatesSet.has(dateString);
    };

    const isDateSelected = (date) => {
        return date.toISOString().split('T')[0] === selectedDate;
    };

    const changeMonth = (increment) => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + increment, 1));
    };

    const selectMonth = (monthIndex) => {
        setCurrentDate(new Date(currentDate.getFullYear(), monthIndex, 1));
        setShowMonthSelector(false);
    };

    const selectYear = (year) => {
        setCurrentDate(new Date(year, currentDate.getMonth(), 1));
        setShowYearSelector(false);
    };



    return {
        currentDate,
        monthNames,
        availableYears,
        showMonthSelector,
        showYearSelector,
        setShowMonthSelector,
        setShowYearSelector,
        changeMonth,
        selectMonth,
        selectYear,
        getDaysInMonth,
        getFirstDayOfMonth,
        isDateAvailable,
        isDateSelected,
    };
};

export default useCalendar;