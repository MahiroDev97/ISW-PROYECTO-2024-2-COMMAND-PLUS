import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import useProducts from '../hooks/adminTables/useProducts';
import { useEffect } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

const ProductsChart = () => {
    const { products, loading, fetchProducts } = useProducts();

    useEffect(() => {
        fetchProducts();
    }, []);

    const options = {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        const disponibilidad = products.disponibilidad[label];

                        return [
                            `Total: ${value}`,
                            `Disponibles: ${disponibilidad.disponible}`,
                            `No Disponibles: ${disponibilidad.noDisponible}`
                        ];
                    }
                }
            },
            legend: {
                position: 'bottom',
                labels: {
                    boxWidth: 12,
                    padding: 15
                }
            }
        }
    };

    return (
        <div className="h-full flex flex-col">
            <h3 className="text-center text-sm font-semibold mb-4 flex-shrink-0">
                Productos por Categoría
            </h3>
            <div className="flex-1 h-[400px]"> {/* Altura fija */}
                {loading ? (
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="animate-pulse text-gray-400">Cargando...</div>
                    </div>
                ) : (
                    <Pie
                        data={{
                            labels: products.labels,
                            datasets: products.datasets
                        }}
                        options={options}
                    />
                )}
            </div>
        </div>
    );
};

export default ProductsChart;


