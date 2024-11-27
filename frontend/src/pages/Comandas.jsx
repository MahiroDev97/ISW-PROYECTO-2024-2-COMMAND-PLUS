import { useEffect,useState } from "react";
import { getComandas, deleteComanda } from "@services/comanda.service.js";
import { deleteDataAlert, showSuccessAlert } from "../helpers/sweetAlert";


export default function Comandas() {
    const [comandas, setComandas] = useState([]);

    const fetchComandas = async () => {
        try {
            const response = await getComandas();
            setComandas(response);
        } catch (error) {
            console.error('Error', error);
        }
    };

    const handleDelete = async (id) => {
        try{
           const result = await deleteDataAlert();
           if(result.isConfirmed){
               const response=await deleteComanda(id);
               console.log(response);
               showSuccessAlert('Comanda eliminada', 'La comanda fue eliminada correctamente');
               await fetchComandas();
        }
        }catch(error){
            console.error('Error', error);
        }
    };

    useEffect(() => {
        fetchComandas();
    }, []);

    return (
        <div>
            <h1>Comandas</h1>
            {comandas.length > 0 ? ( 
                <ul>
                    {comandas.map((comandas) => (
                        <li key={comandas.id}>
                            <p>{comandas.id}</p>
                            <p>{comandas.mesa}</p>
                            <p>{comandas.estado}</p>
                            <p>{comandas.total}</p>
                            <button onClick={() => handleDelete(comandas.id)}>Eliminar</button>
                            </li>
                        ))}
                    </ul>
            ) : <p>No hay comandas</p>}
        </div>
    );
}