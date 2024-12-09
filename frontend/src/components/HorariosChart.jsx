import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { AlertCircle } from 'lucide-react';
import useHorariosChart from '../hooks/adminTables/useComandasPorHorario';
import MonthSelector from './MonthSelector';

// Chart.js registration
ChartJS.register(
    CategoryScale,

    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function HorariosChart() {
    const {
        horariosData,
        error,
        mesAnoDisponibles,
        mesSeleccionado,
        anoSeleccionado,
        cambiarMesAno
    } = useHorariosChart();

    // Calcular el máximo valor de los datos
    const maxValue = Math.max(
        ...horariosData.datasets.flatMap(dataset => dataset.data)
    );

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    usePointStyle: true,
                    padding: 15,
                    font: {
                        size: 12,
                        family: 'Inter, sans-serif'
                    }
                }
            },
            title: {
                display: false
            },
            tooltip: {
                backgroundColor: 'rgba(0,0,0,0.8)',
                titleFont: {
                    size: 14,
                    weight: 'bold'
                },
                bodyFont: {
                    size: 12
                },
                padding: 10
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: maxValue + 5,
                grid: {
                    color: 'rgba(0,0,0,0.05)',
                    borderDash: [5, 5]
                },
                ticks: {
                    stepSize: 5,
                    color: 'rgba(0,0,0,0.6)',
                    font: {
                        size: 12,
                        family: 'Inter, sans-serif'
                    },
                    callback: function (value) {
                        return Math.round(value);
                    }
                }
            },
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    color: 'rgba(0,0,0,0.6)',
                    font: {
                        size: 12,
                        family: 'Inter, sans-serif'
                    }
                }
            }
        },
        elements: {
            line: {
                tension: 0.4,
                borderWidth: 3,
                borderCapStyle: 'round'
            },
            point: {
                radius: 4,
                hoverRadius: 6,
                backgroundColor: 'white',
                borderWidth: 2,
                hoverBorderWidth: 3
            }
        }
    };

    const modifiedData = {
        ...horariosData,
        datasets: horariosData.datasets.map((dataset, index) => ({
            ...dataset,
            borderColor: [
                'rgb(255, 99, 132)',   // Rojo suave
                'rgb(54, 162, 235)',   // Azul
                'rgb(75, 192, 192)',   // Verde azulado
                'rgb(255, 206, 86)',   // Amarillo
                'rgb(153, 102, 255)',  // Púrpura
                'rgb(255, 159, 64)',   // Naranja
                'rgb(231, 233, 237)',  // Gris claro
                'rgb(255, 206, 86)',   // Amarillo
            ][index],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(231, 233, 237, 0.2)',
                'rgba(255, 206, 86, 0.2)',
            ][index],
            borderWidth: 3,
            borderCapStyle: 'round',
            fill: true
        }))
    };

    // Función para formatear la fecha

    return (
        <div className="h-full flex flex-col">
            <div className="flex-shrink-0 mb-4">
                <MonthSelector
                    mesesDisponibles={mesAnoDisponibles}
                    mesSeleccionado={mesSeleccionado}
                    anoSeleccionado={anoSeleccionado}
                    onMesAnoChange={cambiarMesAno}
                />
            </div>
            <div className="flex-1 min-h-[300px]">
                {error ? (
                    <div className="flex items-center justify-center p-4 bg-red-50 rounded-lg h-full">
                        <AlertCircle className="mr-2 text-red-500" size={20} />
                        <span className="text-red-700 text-sm">Error: {error}</span>
                    </div>
                ) : (
                    <Line
                        options={{
                            ...chartOptions,
                            maintainAspectRatio: false
                        }}
                        data={modifiedData}
                    />
                )}
            </div>
        </div>
    );
}