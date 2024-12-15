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
            headerFilterPlaceholder: "Filtrar nombre...",
            headerSort: true
        },
        {
            title: "Hora Inicio",
            field: "datetimeInicio",
            headerSort: true,
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
            headerSort: true,
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
            headerSort: true,
            formatter: (cell) => {
                const inicio = new Date(cell.getRow().getData().datetimeInicio);
                const fin = new Date(cell.getRow().getData().datetimeFin);
                const diff = (fin - inicio) / (1000 * 60 * 60);
                return diff.toFixed(2);
            }
        },
        {
            title: "Rol",
            field: "user.rol",
            headerFilter: true,
            headerFilterPlaceholder: "Filtrar rol...",
            headerSort: true,
            formatter: (cell) => {
                const rol = cell.getValue();
                return rol.charAt(0).toUpperCase() + rol.slice(1);
            }
        }
    ];

    useEffect(() => {
        if (tableRef.current && data?.data) {
            const table = new Tabulator(tableRef.current, {
                data: data.data,
                columns: columns,
                layout: "fitColumns",
                responsiveLayout: "collapse",
                pagination: "local",
                paginationSize: 8,
                movableColumns: true,
                placeholder: "No hay turnos para mostrar",
                height: "550px",
                rowHeight: 50,
                headerSort: true,
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
                        }
                    }
                }
            });

            return () => {
                table.destroy();
            };
        }
    }, [data]);

    return (
        <div className="w-full bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-4 sm:p-6">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden border-2 border-gray-200 rounded-lg">
                            <div ref={tableRef} className="min-w-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TurnosDayTable;
