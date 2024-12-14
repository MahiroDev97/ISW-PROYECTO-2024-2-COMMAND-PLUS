import { useTurnosCharts } from '../hooks/adminTables/useTurnosChart';
import SelectorDateCalendar from '../components/SelectorDateCalendar';
import DayMonthSelector from '../components/DayMonthSelector';
import TurnosDayTable from '../components/TurnosDayTable';

const TurnosAdmin = () => {
    const {
        viewMode,
        turnos,
        dateSelected,
        datesAvailable,
        handleViewModeChange,
        handleDateChange,
    } = useTurnosCharts();

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
                {/* Encabezado con animación suave */}
                <div className="mb-8 text-center animate-fade-in">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Panel de Turnos
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Gestiona y monitorea los turnos del personal de manera eficiente
                    </p>
                </div>

                {/* Contenedor principal con diseño de tarjetas */}
                <div className="space-y-6">
                    {/* Selector de vista mejorado */}
                    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 p-5">
                        <DayMonthSelector
                            currentMode={viewMode}
                            onModeChange={handleViewModeChange}
                            className="max-w-md mx-auto"
                        />
                    </div>

                    {viewMode === "day" ? (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                                {/* Panel principal izquierdo */}
                                <div className="xl:col-span-8">
                                    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
                                        <div className="p-6 border-b border-gray-100">
                                            <h2 className="text-2xl font-semibold text-gray-800">
                                                Calendario de Turnos
                                            </h2>
                                        </div>
                                        <div className="p-6">
                                            <SelectorDateCalendar
                                                datesAvailable={datesAvailable}
                                                onDateSelect={handleDateChange}
                                                selectedDate={dateSelected}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Panel lateral derecho */}
                                <div className="xl:col-span-4">
                                    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6">
                                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                                            Resumen del Día
                                        </h2>

                                        {/* Tarjeta de fecha */}
                                        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                                            <p className="text-sm font-medium text-gray-600 mb-2">
                                                Fecha Actual
                                            </p>
                                            <p className="text-lg font-medium text-gray-900 capitalize">
                                                {new Date(dateSelected).toLocaleDateString('es-ES', {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>

                                        {/* Estadísticas */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="p-4 bg-green-50 rounded-xl">
                                                <p className="text-sm font-medium text-green-600 mb-1">
                                                    Turnos Activos
                                                </p>
                                                <p className="text-3xl font-bold text-green-700">
                                                    {turnos?.data?.filter(t => t.estado === 'activo').length || 0}
                                                </p>
                                            </div>
                                            <div className="p-4 bg-purple-50 rounded-xl">
                                                <p className="text-sm font-medium text-purple-600 mb-1">
                                                    Total Turnos
                                                </p>
                                                <p className="text-3xl font-bold text-purple-700">
                                                    {turnos?.data?.length || 0}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tabla de turnos mejorada */}
                            <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
                                <div className="p-6 border-b border-gray-100">
                                    <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                                        <span>Detalle de Turnos</span>
                                        <span className="ml-3 text-sm font-normal text-gray-500">
                                            ({turnos?.data?.length || 0} registros)
                                        </span>
                                    </h2>
                                </div>
                                <div className="overflow-hidden">
                                    <TurnosDayTable data={turnos} />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 p-8">
                            <div className="text-center py-12">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                    Vista Mensual
                                </h2>
                                <p className="text-gray-600">
                                    Estamos trabajando en esta funcionalidad...
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TurnosAdmin;