import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import useCalendar from '../hooks/adminTables/useCalendar';

const SelectorDateCalendar = ({ datesAvailable, onDateSelect, selectedDate }) => {
    const {
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
    } = useCalendar(selectedDate, datesAvailable);

    // Agregar generateCalendar
    const generateCalendar = (onDateSelect) => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInMonth = getDaysInMonth(year, month);
        const firstDayOfMonth = getFirstDayOfMonth(year, month);
        const days = [];

        // Días vacíos al inicio
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className="h-10" />);
        }

        // Días del mes, si no esta disponible la fecha, se imposibilita el boton con disabled={!isAvailable}

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

    return (
        <div className="p-4 bg-white rounded-lg shadow w-[280px]">
            <div className="flex items-center justify-between mb-4">
                <button
                    onClick={() => changeMonth(-1)}
                    className="p-1 hover:bg-gray-100 rounded-full"
                >
                    <ChevronLeftIcon className="h-4 w-4 text-gray-600" />
                </button>

                <div className="flex gap-1">
                    {/* Selector de Mes */}
                    <div className="relative">
                        <button
                            onClick={() => {
                                setShowMonthSelector(!showMonthSelector);
                                setShowYearSelector(false);
                            }}
                            className="text-base font-semibold text-gray-800 hover:bg-gray-100 px-1 rounded"
                        >
                            {monthNames[currentDate.getMonth()]}
                        </button>

                        {showMonthSelector && (
                            <div className="absolute left-0 top-full mt-1 bg-white border rounded-lg shadow-lg z-10 w-36">
                                <div className="grid grid-cols-1 max-h-48 overflow-y-auto">
                                    {monthNames.map((month, index) => (
                                        <button
                                            key={month}
                                            onClick={() => selectMonth(index)}
                                            className="px-3 py-2 text-left hover:bg-gray-100 text-sm"
                                        >
                                            {month}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Selector de Año */}
                    <div className="relative">
                        <button
                            onClick={() => {
                                setShowYearSelector(!showYearSelector);
                                setShowMonthSelector(false);
                            }}
                            className="text-base font-semibold text-gray-800 hover:bg-gray-100 px-1 rounded"
                        >
                            {currentDate.getFullYear()}
                        </button>

                        {showYearSelector && (
                            <div className="absolute left-0 top-full mt-1 bg-white border rounded-lg shadow-lg z-10 w-20">
                                <div className="grid grid-cols-1 max-h-48 overflow-y-auto">
                                    {availableYears.map(year => (
                                        <button
                                            key={year}
                                            onClick={() => selectYear(year)}
                                            className="px-3 py-2 text-left hover:bg-gray-100 text-sm"
                                        >
                                            {year}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <button
                    onClick={() => changeMonth(1)}
                    className="p-1 hover:bg-gray-100 rounded-full"
                >
                    <ChevronRightIcon className="h-4 w-4 text-gray-600" />
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
                {generateCalendar(onDateSelect)}
            </div>
        </div>
    );
};

export default SelectorDateCalendar;
