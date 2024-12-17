const MonthSelector = ({
    mesesDisponibles,
    mesSeleccionado,
    anoSeleccionado,
    onMesAnoChange
}) => {
    const nombresMeses = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    const handleMonthChange = (event) => {
        const [mes, ano] = event.target.value.split('/');
        onMesAnoChange(parseInt(mes), parseInt(ano));
    };

    const mesesFormateados = mesesDisponibles.map(({ mes, ano }) => ({
        mes,
        ano,
        label: `${nombresMeses[mes - 1]} ${ano}`
    }));

    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3 px-4 py-2">
                <label
                    htmlFor="monthSelector"
                    className="text-sm font-medium text-gray-700"
                >
                    Período:
                </label>
                <select
                    id="monthSelector"
                    value={`${mesSeleccionado}/${anoSeleccionado}`}
                    onChange={handleMonthChange}
                    className="
                        form-select 
                        w-full 
                        border-transparent 
                        focus:border-blue-500 
                        focus:ring-2 
                        focus:ring-blue-200 
                        rounded-md 
                        text-sm 
                        text-gray-700
                    "
                >
                    {mesesFormateados.map(({ mes, ano, label }) => (
                        <option key={`${mes}-${ano}`} value={`${mes}/${ano}`}>
                            {label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default MonthSelector;