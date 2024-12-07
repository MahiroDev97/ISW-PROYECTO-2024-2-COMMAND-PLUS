import TopProductosTable from '../components/TopProductosTable';
import useTopProductos from '../hooks/adminTables/useTopProductos';
import ProtectedRoute from '../components/ProtectedRoute';
import Navbar from '../components/Navbar';
import MonthSelector from '../components/MonthSelector';
import VentasChart from '../components/VentasChart';
import HorariosChart from '../components/HorariosChart';
const AdminTables = () => {
    const {
        topProductos,
        loading,
        error,
        mesAnoDisponibles,
        mesSeleccionado,
        anoSeleccionado,
        cambiarMesAno
    } = useTopProductos();

    return (
        <ProtectedRoute allowedRoles={['administrador']}>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="mb-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
                                    Dashboard del Restaurante
                                </h1>
                                <p className="text-sm text-gray-600">
                                    Visualiza las estadísticas de ventas de productos
                                </p>
                            </div>
                            <div>
                                <MonthSelector
                                    mesesDisponibles={mesAnoDisponibles}
                                    mesSeleccionado={mesSeleccionado}
                                    anoSeleccionado={anoSeleccionado}
                                    onMesAnoChange={cambiarMesAno}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden h-[500px]">
                            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/50">
                                <h2 className="text-xl font-bold text-gray-900">
                                    Gráfico de Ventas
                                </h2>
                            </div>
                            <div className="p-4 h-[calc(500px-64px)]">
                                <VentasChart />
                            </div>
                        </div>

                        <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden h-[500px]">
                            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/50">
                                <h2 className="text-xl font-bold text-gray-900">
                                    Productos Más Vendidos
                                </h2>
                            </div>
                            <div className="p-4 h-[calc(500px-64px)] overflow-auto">
                                {error && (
                                    <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-4">
                                        {error}
                                    </div>
                                )}
                                <TopProductosTable
                                    products={topProductos}
                                    loading={loading}
                                />
                            </div>
                        </div>

                        <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden h-[500px]">
                            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/50">
                                <h2 className="text-xl font-bold text-gray-900">
                                    Panel 3
                                </h2>
                            </div>
                            <div className="p-4 h-[calc(500px-64px)] bg-gray-100/50">
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    Contenido Futuro
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden h-[500px]">
                            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/50">
                                <h2 className="text-xl font-bold text-gray-900">
                                    Panel 4
                                </h2>
                            </div>
                            <div className="p-4 h-[calc(500px-64px)] bg-gray-100/50">
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    Contenido Futuro
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <HorariosChart />
        </ProtectedRoute>
    );
};

export default AdminTables;