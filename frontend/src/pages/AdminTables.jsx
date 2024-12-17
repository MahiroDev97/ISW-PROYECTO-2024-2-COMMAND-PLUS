import { TopProductosTable } from '../components/TopProductosTable';
import useTopProductos from '../hooks/adminTables/useTopProductos';
import ProtectedRoute from '../components/ProtectedRoute';
import Navbar from '../components/Navbar';
import VentasChart from '../components/VentasChart';
import HorariosChart from '../components/HorariosChart';
import ProductsChart from '../components/ProductsChart';
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
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-[9vh]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
                    <div className="mb-4 sm:mb-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
                                    Dashboard del Restaurante
                                </h1>
                                <p className="text-sm text-gray-600">
                                    Visualiza las estadísticas de ventas de productos
                                </p>
                            </div>

                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                        <ChartContainer title="Gráfico de Ventas">
                            <VentasChart />
                        </ChartContainer>

                        <ChartContainer title="Productos Más Vendidos">
                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-4">
                                    {error}
                                </div>
                            )}
                            <TopProductosTable
                                products={topProductos}
                                loading={loading}
                                mesAnoDisponibles={mesAnoDisponibles}
                                mesSeleccionado={mesSeleccionado}
                                anoSeleccionado={anoSeleccionado}
                                onMesAnoChange={cambiarMesAno}
                            />
                        </ChartContainer>

                        <ChartContainer title="Horarios de Mayor Actividad">
                            <HorariosChart />
                        </ChartContainer>

                        <ChartContainer title="Distribución de Productos">
                            <ProductsChart />
                        </ChartContainer>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
};

// Componente contenedor para las gráficas
const ChartContainer = ({ title, children }) => (
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden min-h-[400px] sm:min-h-[500px]">
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 bg-gray-50/50">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                {title}
            </h2>
        </div>
        <div className="p-4 h-[calc(100%-56px)] sm:h-[calc(100%-64px)]">
            {children}
        </div>
    </div>
);

export default AdminTables;