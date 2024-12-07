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
        error
    } = useVentasTotales();

    useEffect(() => {
        fetchAnosDisponibles();
    }, []);

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Ventas Totales por Mes',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Ventas ($)'
                }
            }
        }
    };

    return (
        <div className="h-full w-full flex flex-col">
            <div className="mb-2">
                <YearSelector
                    anos={anosDisponiblesState}
                    anoSeleccionado={anoSeleccionado}
                    onChange={setAnoSeleccionado}
                />
            </div>
            <div className="relative flex-1">
                {ventasTotales.datasets && (
                    <div className="absolute inset-0">
                        <Line
                            options={options}
                            data={ventasTotales}
                            className="h-full w-full"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

