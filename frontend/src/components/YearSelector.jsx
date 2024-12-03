// year selector for ventas totales



export default function YearSelector({ anos, anoSeleccionado, onChange }) {
    return (
        <select
            value={anoSeleccionado}
            onChange={(e) => onChange(e.target.value)}
        >
            {anos.map(({ ano, label }) => (
                <option key={ano} value={ano}>
                    {label}
                </option>
            ))}
        </select>
    );
}