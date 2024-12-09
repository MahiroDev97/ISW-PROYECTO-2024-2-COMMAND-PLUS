import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import useProducts from '../hooks/adminTables/useProducts';
import { useEffect } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

const ProductsChart = () => {
    const { products, loading, error, fetchProducts } = useProducts();

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) return <div className="flex justify-center items-center h-full">Cargando...</div>;
    if (error) return <div className="text-red-500">Error: {error.message}</div>;

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
            <div className="flex-1 min-h-[300px]">
                <Pie
                    data={{
                        labels: products.labels,
                        datasets: products.datasets
                    }}
                    options={{
                        ...options,
                        maintainAspectRatio: false
                    }}
                />
            </div>
        </div>
    );
};

export default ProductsChart;


