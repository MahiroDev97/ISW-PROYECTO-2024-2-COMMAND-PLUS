import axios from 'axios';
import { useState, useEffect } from 'react';

const API_URL = 'http://127.0.0.1:3000/api';
//create hook to deal with state of AdminTable.jsx
// useEffect to fetch data from backend
// must to control mes, anio for the query
// must to control the state of the hook
// must to return the data to the component
// must to handle errors


const useTopProductos = () => {
    const [topProductos, setTopProductos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [mes, setMes] = useState(new Date().getMonth() + 1);
    const [ano, setAno] = useState(new Date().getFullYear());



    // fetch data from backend
    const fetchTopProductos = async () => {
        setLoading(true);
        const response = await axios.get(`${API_URL}/productcomanda/history/mes?mes=${mes}&ano=${ano}`);
        if (response.status === 200) {
            console.log('response.data', response.data);
            setTopProductos(response.data);
            // map data to get the month and year available
            //const monthsAvailable = response.data.map(item => item.month);
            //console.log('monthsAvailable', monthsAvailable);
            //setMes(monthsAvailable);
        } else {
            handleError(response.data.message);
        }
        setLoading(false);
    }



    // useEffect para llamar a la API cuando cambian mes o año
    useEffect(() => {
        fetchTopProductos();
    }, [mes, ano]);

    // Función para manejar errores
    const handleError = (error) => {
        console.error('Error fetching top productos:', error);
        setError('Error al cargar los productos.');
    }


    // Retornar los datos y el estado
    return { topProductos, loading, error, setMes, setAno };
}

export default useTopProductos;