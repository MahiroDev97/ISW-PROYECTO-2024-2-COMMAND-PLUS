import { Line } from 'react-chartjs-2';
import useHorariosChart from '../hooks/adminTables/useComandasPorHorario';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function HorariosChart() {
    const { horariosData, fechaSeleccionada, setFechaSeleccionada, error } = useHorariosChart();

    // Calcular el máximo valor de los datos
    const maxValue = Math.max(
        ...horariosData.datasets.flatMap(dataset => dataset.data)
    );

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    usePointStyle: true,
                    padding: 20,
                    font: {
                        size: 12
                    }
                }
            },
            title: {
                display: true,
                text: 'Promedio de Comandas por Día y Horario',
                padding: 20
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: maxValue + 5,
                grid: {
                    display: false
                },
                ticks: {
                    stepSize: 5, // Mostrar incrementos de 5 en 5
                    display: true,
                    font: {
                        size: 12
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
                    font: {
                        size: 12
                    }
                }
            }
        },
        elements: {
            line: {
                tension: 0.4,
                borderWidth: 2,
            },
            point: {
                radius: 0,
                hitRadius: 8,
                hoverRadius: 4,
            }
        }
    };

    const modifiedData = {
        ...horariosData,
        datasets: horariosData.datasets.map((dataset, index) => ({
            ...dataset,
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(75, 192, 192)',
                'rgb(255, 206, 86)',
                'rgb(153, 102, 255)',
                'rgb(255, 159, 64)',
                'rgb(231, 233, 237)',
                'rgb(255, 206, 86)',
            ][index],

            borderWidth: 2,
        }))
    };

    return (
        <div>
            <div style={{ marginBottom: '20px' }}>
                <input
                    type="month"
                    value={fechaSeleccionada.split('/').reverse().join('-')}
                    onChange={(e) => {
                        const [year, month] = e.target.value.split('-');
                        setFechaSeleccionada(`${month}/${year}`);
                    }}
                />
            </div>
            {error ? (
                <div>Error: {error}</div>
            ) : (
                <Line options={options} data={modifiedData} />
            )}
        </div>
    );
}





