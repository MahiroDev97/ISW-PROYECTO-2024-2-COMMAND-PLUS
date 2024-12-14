import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const SelectorDateCalendar = ({ datesAvailable, onDateSelect, selectedDate }) => {
    const [currentDate, setCurrentDate] = useState(new Date(selectedDate));

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

    // Generar días del mes
    const generateCalendar = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInMonth = getDaysInMonth(year, month);
        const firstDayOfMonth = getFirstDayOfMonth(year, month);
        const days = [];

        // Días vacíos al inicio
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className="h-10" />);
        }

        // Días del mes
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const isAvailable = isDateAvailable(date);
            const isSelected = isDateSelected(date);

            days.push(
                <button
                    key={day}
                    onClick={() => isAvailable && onDateSelect(date.toISOString().split('T')[0])}
                    disabled={!isAvailable}
                    className={`h-10 w-10 rounded-full flex items-center justify-center transition-all
                        ${isSelected ? 'bg-blue-500 text-white' : ''}
                        ${isAvailable && !isSelected
                            ? 'hover:bg-blue-500 hover:text-white cursor-pointer text-gray-700'
                            : 'text-gray-300 cursor-not-allowed hover:bg-gray-100'}`}
                    title={!isAvailable ? "No hay turnos en esta fecha" : ""}
                >
                    {day}
                </button>
            );
        }

        return days;
    };

    const monthNames = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    return (
        <div className="p-4 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
                <button
                    onClick={() => changeMonth(-1)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                >
                    <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
                </button>
                <h2 className="text-lg font-semibold text-gray-800">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <button
                    onClick={() => changeMonth(1)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                >
                    <ChevronRightIcon className="h-5 w-5 text-gray-600" />
                </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
                {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
                    <div key={day} className="h-10 flex items-center justify-center text-sm font-medium text-gray-500">
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
                {generateCalendar()}
            </div>
        </div>
    );
};

export default SelectorDateCalendar;
