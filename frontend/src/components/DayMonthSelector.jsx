const DayMonthSelector = ({ currentMode, onModeChange }) => {
    return (
        <div className="flex items-center gap-4 p-2">
            <button
                className={`px-4 py-2 rounded-lg transition-all ${currentMode === "day"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                    }`}
                onClick={() => onModeChange("day")}
            >
                Ver por Día
            </button>
            <button
                className={`px-4 py-2 rounded-lg transition-all ${currentMode === "month"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                    }`}
                onClick={() => onModeChange("month")}
            >
                Ver por Mes
            </button>
        </div>
    );
};

export default DayMonthSelector;

