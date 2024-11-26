import { Clock } from 'lucide-react';

export const ComandasTable = ({ comandas, onStatusUpdate, isUpdating }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'in-progress':
                return 'bg-blue-100 text-blue-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const handleStatusChange = async (comandaId, newStatus) => {
        if (onStatusUpdate && !isUpdating) {
            await onStatusUpdate(comandaId, newStatus);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Mesa
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Inicio
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Fin
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Demora
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Estado
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Productos
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {comandas.map((comanda) => (
                            <tr key={comanda.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {comanda.mesa}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {formatDate(comanda.fechahorarecepcion)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {comanda.fechahoraentrega ? formatDate(comanda.fechahoraentrega) : '-'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {comanda.fechahoraentrega ? (
                                        <span className="flex items-center gap-1">
                                            <Clock size={16} />
                                            {comanda.fechahoraentrega - comanda.fechahorarecepcion} min
                                        </span>
                                    ) : (
                                        '-'
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <select
                                        value={comanda.estado}
                                        onChange={(e) => handleStatusChange(comanda.id, e.target.value)}
                                        disabled={isUpdating}
                                        className={`px-2 text-xs leading-5 font-semibold rounded-full ${getStatusColor(comanda.status)} border-0 cursor-pointer disabled:opacity-50`}
                                    >
                                        <option value="pendiente">pendiente</option>
                                        <option value="en-preparacion">en preparación</option>
                                        <option value="completado">completado</option>
                                        <option value="cancelado">cancelado</option>
                                    </select>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    <div className="max-w-xs">
                                        {comanda.items.map((item, index) => (
                                            <div key={index} className="flex justify-between">
                                                <span>{item.quantity}x {item.productName}</span>
                                                <span>€{(item.price * item.quantity).toFixed(2)}</span>
                                            </div>
                                        ))}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};