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
import { Line } from 'react-chartjs-2';
import useVentasTotales from '../hooks/adminTables/useVentasTotales';
import YearSelector from './YearSelector';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


export default function VentasChart() {
    const { ventasTotales, anosDisponiblesState, anoSeleccionado, setAnoSeleccionado } = useVentasTotales();

    return (
        <div>
            <YearSelector />
            <Line data={ventasTotales} />
        </div>
    );

}

