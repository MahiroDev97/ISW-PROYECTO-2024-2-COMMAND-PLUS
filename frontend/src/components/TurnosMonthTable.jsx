import { useEffect, useRef } from 'react';
import { TabulatorFull as Tabulator } from 'tabulator-tables';
import "tabulator-tables/dist/css/tabulator.min.css";

const TurnoMonthTable = ({ turnos }) => {
    const tableRef = useRef(null);

    const procesarDatos = () => {
        const usuariosMap = new Map();

        if (!turnos || !turnos.data) {
            return [];
        }

        const turnosData = turnos.data;

        if (!Array.isArray(turnosData) || turnosData.length === 0) {
            return [];
        }

        turnosData.forEach(turno => {
            const usuario = turno.user;
            const horaInicio = new Date(turno.datetimeInicio);
            const horaFin = new Date(turno.datetimeFin);
            const horasTrabajadas = (horaFin - horaInicio) / (1000 * 60 * 60);

            if (usuariosMap.has(usuario.id)) {
                const datos = usuariosMap.get(usuario.id);
                datos.totalTurnos += 1;
                datos.totalHoras += horasTrabajadas;
            } else {
                usuariosMap.set(usuario.id, {
                    nombre: usuario.nombreCompleto,
                    rol: usuario.rol,
                    totalTurnos: 1,
                    totalHoras: horasTrabajadas
                });
            }
        });

        return Array.from(usuariosMap.values());
    };

    useEffect(() => {
        const data = procesarDatos();

        if (tableRef.current) {
            const table = new Tabulator(tableRef.current, {
                data: data,
                layout: "fitColumns",
                columns: [
                    {
                        title: "Nombre",
                        field: "nombre",
                        sorter: "string",
                        headerFilter: true,
                        headerFilterPlaceholder: "Filtrar nombre...",
                        headerSort: true
                    },
                    {
                        title: "Total Turnos",
                        field: "totalTurnos",
                        sorter: "number",
                        hozAlign: "center",
                        headerSort: true
                    },
                    {
                        title: "Total Horas",
                        field: "totalHoras",
                        sorter: "number",
                        formatter: "number",
                        formatterParams: {
                            precision: 2
                        },
                        hozAlign: "center",
                        headerSort: true
                    },
                    {
                        title: "Rol",
                        field: "rol",
                        sorter: "string",
                        formatter: (cell) => {
                            const valor = cell.getValue();
                            return valor.charAt(0).toUpperCase() + valor.slice(1);
                        },
                        headerFilter: true,
                        headerFilterPlaceholder: "Filtrar rol...",
                        headerSort: true
                    }
                ],
                height: "550px",
                rowHeight: 50,
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
                },
                pagination: true,
                paginationSize: 8,
                movableColumns: true,
                placeholder: "No hay turnos disponibles para mostrar",
                responsiveLayout: "hide",
                responsiveLayoutCollapseStartOpen: false,
                responsiveLayoutCollapseFormatter: function (data) {
                    let list = document.createElement("ul");
                    for (let key in data) {
                        if (data[key] != null && data[key] != "") {
                            let row = document.createElement("li");
                            row.innerHTML = `<strong>${key}:</strong> ${data[key]}`;
                            list.appendChild(row);
                        }
                    }
                    return list;
                },
                columnDefaults: {
                    resizable: true,
                    tooltip: true
                },

                minWidth: 100
            });

            return () => {
                table.destroy();
            };
        }
    }, [turnos]);

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

export default TurnoMonthTable;
