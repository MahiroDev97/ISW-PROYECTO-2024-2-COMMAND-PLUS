import MonthSelector from "./MonthSelector";

export const TopProductosTable = ({
    products,
    loading,
    mesAnoDisponibles,
    mesSeleccionado,
    anoSeleccionado,
    onMesAnoChange
}) => {
    if (loading) {
        return (
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <p className="text-gray-500">Cargando productos...</p>
            </div>
        );
    }

    if (!products || products.length === 0) {
        return (
            <div className="w-full text-center py-12">
                <div className="text-gray-400 text-lg">
                    No hay productos para mostrar
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-4">
                <MonthSelector
                    mesesDisponibles={mesAnoDisponibles}
                    mesSeleccionado={mesSeleccionado}
                    anoSeleccionado={anoSeleccionado}
                    onMesAnoChange={onMesAnoChange}
                />
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                <table className="w-full text-sm">
                    <thead className="bg-gray-100/50 border-b">
                        <tr>
                            {['Producto', 'Precio', 'Unidades Vendidas', 'Total'].map((header) => (
                                <th
                                    key={header}
                                    className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {products?.map((product) => (
                            <tr
                                key={product.id}
                                className="hover:bg-gray-50/50 transition-colors duration-200"
                            >
                                <td className="px-4 py-4 font-medium text-gray-900">
                                    {product.nombre}
                                </td>
                                <td className="px-4 py-4 text-gray-600">
                                    ${product.precio.toLocaleString('es-CL', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                </td>
                                <td className="px-4 py-4 text-center text-gray-600">
                                    {product.cantidad}
                                </td>
                                <td className="px-4 py-4 font-semibold text-gray-800">
                                    ${(product.precio * product.cantidad).toLocaleString('es-CL', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TopProductosTable;

