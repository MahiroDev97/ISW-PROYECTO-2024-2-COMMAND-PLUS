import ProtectedRoute from '../components/ProtectedRoute';
import Navbar from '../components/Navbar';
import DayMonthSelector from '../components/DayMonthSelector';
import TurnosDayTable from '../components/TurnosDayTable';
import SelectorDateCalendar from '../components/SelectorDateCalendar';
import MonthSelector from '../components/MonthSelector';
import TurnoMonthTable from '../components/TurnosMonthTable';
import { useTurnosCharts } from '../hooks/adminTables/useTurnosChart';

const AdminTurnos = () => {
    const {
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
    } = useTurnosCharts();

    // Crear el array de mesesDisponibles a partir de monthsAvailable y yearsAvailable
    const mesesDisponibles = monthsAvailable.map(({ mes, ano }) => {
        const nombresMeses = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];
        return {
            mes: mes,
            ano: ano,
            label: `${nombresMeses[mes - 1]} ${ano}`
        };
    });




    return (
        <ProtectedRoute allowedRoles={['administrador']}>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-[9vh]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
                    <div className="mb-4 sm:mb-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
                                    Gestión de Turnos
                                </h1>
                                <p className="text-sm text-gray-600">
                                    Visualiza y administra los turnos del personal
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
                                <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 bg-gray-50/50">
                                    <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                                        Calendario
                                    </h2>
                                </div>
                                <div className="p-4">
                                    <DayMonthSelector
                                        currentMode={viewMode}
                                        onModeChange={handleViewModeChange}
                                    />
                                    {viewMode === 'day' ? (
                                        <SelectorDateCalendar
                                            datesAvailable={datesAvailable}
                                            selectedDate={dateSelected}
                                            onDateSelect={handleDateChange}
                                        />
                                    ) : (
                                        <MonthSelector
                                            mesesDisponibles={mesesDisponibles}
                                            mesSeleccionado={monthSelected}
                                            anoSeleccionado={yearSelected}
                                            onMesAnoChange={handleMonthYearChange}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-3">
                            <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
                                <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 bg-gray-50/50">
                                    <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                                        {viewMode === 'day' ? 'Turnos del Día' : 'Turnos del Mes'}
                                    </h2>
                                </div>
                                <div className="p-4">
                                    {viewMode === 'day' ? (
                                        <TurnosDayTable data={turnos} />
                                    ) : (
                                        <TurnoMonthTable turnos={turnos} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default AdminTurnos;
