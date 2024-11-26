import { ChevronDown } from 'lucide-react';

export const MonthSelector = ({ selectedMonth, availableMonths, onMonthChange }) => {
    return (
        <div className="relative">
            <select
                value={selectedMonth}
                onChange={(e) => onMonthChange(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
                {availableMonths.map((month) => (
                    <option key={month} value={month}>
                        {new Date(month).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
                    </option>
                ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />
        </div>
    );
}