import { useState, useEffect } from "react";
import { getComanda } from "@services/comanda.service.js";

const useComandas = () => {
  const [comandas, setComandas] = useState([]);

  const fetchComandas = async () => {
    try {
      const response = await getComanda();
      const formattedData = response.data.map((comanda) => ({
        id: comanda.id,
        mesa: comanda.mesa,
        total: comanda.total,
        estado: comanda.estado,
        fecha: comanda.fecha,
      }));
      dataLogged(formattedData);
      setComandas(formattedData);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    fetchComandas();
  }, []);

  const dataLogged = (formattedData) => {
    try {
      const { rut } = JSON.parse(sessionStorage.getItem("usuario"));
      for (let i = 0; i < formattedData.length; i++) {
        if (formattedData[i].rut === rut) {
          formattedData.splice(i, 1);
          break;
        }
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };
  return { comandas, fetchComandas, setComandas };
}

export default useComandas;