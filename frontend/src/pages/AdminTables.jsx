import TopProductosTable from '../components/TopProductosTable';
import useTopProductos from '../hooks/adminTables/useTopProductos';
import ProtectedRoute from '../components/ProtectedRoute';
import Navbar from '../components/Navbar';
import MonthSelector from '../components/MonthSelector';

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
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div>
                            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
                                Dashboard del Restaurante
                            </h1>
                            <p className="text-sm text-gray-600">
                                Visualiza las estadísticas de ventas de productos
                            </p>
                        </div>
                        <div className="flex justify-end items-center">
                            <MonthSelector
                                mesesDisponibles={mesAnoDisponibles}
                                mesSeleccionado={mesSeleccionado}
                                anoSeleccionado={anoSeleccionado}
                                onMesAnoChange={cambiarMesAno}
                            />
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
                        <div className="px-6 py-5 border-b border-gray-200 bg-gray-50/50 flex items-center space-x-3">

                            <h2 className="text-xl font-bold text-gray-900">
                                Productos Más Vendidos
                            </h2>
                        </div>

                        <div className="p-6">
                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
                                    {error}
                                </div>
                            )}

                            <TopProductosTable
                                products={topProductos}
                                loading={loading}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default AdminTables;