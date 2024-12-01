import { useState, useEffect } from "react";
import { getComandas } from "@services/comanda.service.js";

const useComandas = () => {
  const [comandas, setComandas] = useState([]);

  const fetchComandas = async () => {
    try {
      const response = await getComandas();

      const formattedData = response.map((comanda) => ({
        id: comanda.id,
        mesa: comanda.mesa,
        estado: comanda.estado,
        fecha: comanda.fecha,
        productcomandas: comanda.productcomandas,
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
};

export default useComandas;