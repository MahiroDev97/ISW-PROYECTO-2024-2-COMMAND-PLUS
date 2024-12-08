import { useState } from 'react';
import { getProducts } from '../../services/product.service';




const useProducts = () => {
    const [products, setProducts] = useState({
        labels: [],
        datasets: []
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await getProducts();
            const productos = Array.isArray(response.data) ? response.data : Array.isArray(response) ? response : [];

            // Agrupar productos por categoría y disponibilidad
            const productosPorCategoria = {};
            productos.forEach(product => {
                console.log('product disponibilidad', product.disponibilidad);
                if (!productosPorCategoria[product.categoria]) {
                    productosPorCategoria[product.categoria] = {
                        total: 0,
                        disponible: 0,
                        noDisponible: 0
                    };
                }
                productosPorCategoria[product.categoria].total += 1;
                if (product.disponibilidad) {
                    productosPorCategoria[product.categoria].disponible += 1;
                } else {
                    productosPorCategoria[product.categoria].noDisponible += 1;
                }
            });

            setProducts({
                labels: Object.keys(productosPorCategoria),
                datasets: [{
                    label: 'Total Productos',
                    data: Object.values(productosPorCategoria).map(cat => cat.total),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(255, 206, 86, 0.8)',
                        'rgba(75, 192, 192, 0.8)',
                        'rgba(153, 102, 255, 0.8)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                    ],
                    borderWidth: 1,
                }],
                disponibilidad: productosPorCategoria // Guardamos la información de disponibilidad
            });
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    return { products, loading, error, fetchProducts };
}

export default useProducts;