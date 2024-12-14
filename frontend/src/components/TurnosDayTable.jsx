import { useEffect, useRef } from 'react';
import { TabulatorFull as Tabulator } from 'tabulator-tables';
import "tabulator-tables/dist/css/tabulator.min.css";

const TurnosDayTable = ({ data }) => {
    const tableRef = useRef(null);

    const columns = [
        {
            title: "Nombre",
            field: "user.nombreCompleto",
            headerFilter: true,
            headerFilterPlaceholder: "Filtrar nombre..."
        },
        {
            title: "Hora Inicio",
            field: "datetimeInicio",
            formatter: (cell) => {
                const date = new Date(cell.getValue());
                return date.toLocaleTimeString('es-ES', {
                    hour: '2-digit',
                    minute: '2-digit'
                });
            }
        },
        {
            title: "Hora Fin",
            field: "datetimeFin",
            formatter: (cell) => {
                const date = new Date(cell.getValue());
                return date.toLocaleTimeString('es-ES', {
                    hour: '2-digit',
                    minute: '2-digit'
                });
            }
        },
        {
            title: "Horas Totales",
            field: "horasTotales",
            formatter: (cell) => {
                const inicio = new Date(cell.getRow().getData().datetimeInicio);
                const fin = new Date(cell.getRow().getData().datetimeFin);
                const diff = (fin - inicio) / (1000 * 60 * 60); // Diferencia en horas
                return diff.toFixed(2);
            },
            bottomCalc: "sum",
            bottomCalcFormatter: "money",
            bottomCalcFormatterParams: {
                decimal: ".",
                thousand: ",",
                precision: 2
            }
        },
        {
            title: "Rol",
            field: "user.rol",
            headerFilter: true,
            headerFilterPlaceholder: "Filtrar rol...",
            formatter: (cell) => {
                const rol = cell.getValue();
                return rol.charAt(0).toUpperCase() + rol.slice(1);
            }
        }
    ];

    useEffect(() => {
        // Inicializar tabla
        if (tableRef.current && data?.data) {
            const table = new Tabulator(tableRef.current, {
                data: data.data, // Accedemos al array dentro de data.data
                columns: columns,
                layout: "fitColumns",
                responsiveLayout: "collapse",
                pagination: "local",
                paginationSize: 10,
                paginationSizeSelector: [5, 10, 20, 50],
                movableColumns: true,
                placeholder: "No hay turnos para mostrar",
                locale: true,
                langs: {
                    "es-es": {
                        "pagination": {
                            "first": "Primera",
                            "first_title": "Primera Página",
                            "last": "Última",
                            "last_title": "Última Página",
                            "prev": "Anterior",
                            "prev_title": "Página Anterior",
                            "next": "Siguiente",
                            "next_title": "Página Siguiente",
                        },
                    }
                }
            });

            // Cleanup
            return () => {
                table.destroy();
            };
        }
    }, [data]);

    return (
        <div className="card bg-white rounded-lg shadow-lg p-4">
            <div className="card-body">
                <div ref={tableRef} className="w-full"></div>
            </div>
        </div>
    );
};

export default TurnosDayTable;
