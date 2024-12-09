import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,

} from 'chart.js';
import { Line } from 'react-chartjs-2';
import useVentasTotales from '../hooks/adminTables/useVentasTotales';
import YearSelector from './YearSelector';
import { useEffect } from 'react';
ChartJS.register(
    CategoryScale,
    LinearScale,

);


export default function VentasChart() {
    const {
        ventasTotales,
        anosDisponiblesState,
        anoSeleccionado,
        setAnoSeleccionado,
        fetchAnosDisponibles,
        error,
        loading
    } = useVentasTotales();

    useEffect(() => {
        fetchAnosDisponibles();
    }, [fetchAnosDisponibles]);

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 190,
            easing: 'easeOutQuad',
        },
        transitions: {
            active: {
                animation: {
                    duration: 500,
                    easing: 'easeOutCubic'
                }
            }
        },
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    boxWidth: 12,
                    padding: 10,
                    font: {
                        size: 11,
                        family: 'Inter, sans-serif'
                    }
                }
            },
            title: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    font: {
                        size: 11
                    }
                }
            },
            x: {
                ticks: {
                    font: {
                        size: 11
                    }
                }
            }
        }
    };

    return (
        <div className="h-full w-full flex flex-col">
            <div className="mb-2 flex-shrink-0">
                <YearSelector
                    anos={anosDisponiblesState}
                    anoSeleccionado={anoSeleccionado}
                    onChange={setAnoSeleccionado}
                />
            </div>
            <div className="flex-1 h-[400px]">
                {loading ? (
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="animate-pulse text-gray-400">Cargando...</div>
                    </div>
                ) : ventasTotales.datasets && (
                    <Line
                        options={options}
                        data={ventasTotales}
                        className="h-full w-full"
                    />
                )}
            </div>
        </div>
    );
}

