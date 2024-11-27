import { MonthSelector } from '../components/MonthSelector';
import { TopProductsTable } from '../components/TopProductosTable';
import { ComandasTable } from '../components/OrderTable';
import useTopProductos from '../hooks/adminTables/useTopProductos';

const AdminTables = () => {
    const { topProductos, loading, error, setMes, setAno } = useTopProductos();

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;

    const resumenVentas = topProductos?.data?.resumenVentas || [];
    const productos = topProductos?.data?.productos || [];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <MonthSelector
                    selectedMonth={`${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`}
                    availableMonths={[`${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`]}
                    onMonthChange={(value) => {
                        const [year, month] = value.split('-');
                        setAno(parseInt(year));
                        setMes(parseInt(month));
                    }}
                />
            </div>

            <div className="grid gap-8">
                <div>
                    <h2 className="text-2xl font-bold mb-4">Productos Más Vendidos</h2>
                    <TopProductsTable products={resumenVentas} />
                </div>

                <div>
                    <h2 className="text-2xl font-bold mb-4">Comandas del Mes</h2>
                    <ComandasTable
                        comandas={transformProductosToComandas(productos)}
                        onStatusUpdate={async (id, status) => {
                            console.log(id, status);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

const transformProductosToComandas = (productos) => {
    if (!Array.isArray(productos)) {
        console.warn('productos no es un array:', productos);
        return [];
    }

    const comandasByID = productos.reduce((acc, producto) => {
        if (!acc[producto.comandaId]) {
            acc[producto.comandaId] = {
                id: producto.comandaId,
                mesa: `Mesa ${producto.comandaId}`,
                fechahorarecepcion: producto.fechahorarecepcion,
                fechahoraentrega: producto.fechahoraentrega,
                estado: producto.estadoproductocomanda,
                items: []
            };
        }

        acc[producto.comandaId].items.push({
            quantity: 1,
            productName: producto.product.nombre,
            price: producto.product.precio
        });

        return acc;
    }, {});

    return Object.values(comandasByID);
};

export default AdminTables;