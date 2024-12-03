// year selector for ventas totales

import useVentasTotales from '../hooks/adminTables/useVentasTotales';


export default function YearSelector() {
    const { anosDisponiblesState, anoSeleccionado, setAnoSeleccionado } = useVentasTotales();

    return (
        <select value={anoSeleccionado} onChange={(e) => setAnoSeleccionado(e.target.value)}>
            {anosDisponiblesState.map((ano) => (
                <option key={ano} value={ano}>{ano}</option>
            ))}
        </select>
    );
}