import { OrderCard } from "../components/ComandaOrderCard";
import { useState, useEffect } from "react";
import useComandas from "../hooks/comandas/UseGetComandas";
import { ClipboardList } from "lucide-react";
import "../styles/VistaCocina.css"; // Importa el archivo CSS

const VistaCocina = () => {
  const { comandas, setComandas } = useComandas();
  const [filterID, setFilterID] = useState("");

  useEffect(() => {
    console.log(comandas); // Verifica que comandas tiene los datos correctos
  }, [comandas]);

  return (
    <div className="container">
      <header className="header">
        <div className="headerContent">
          <ClipboardList className="headerIcon" />
          <h1 className="headerTitle">Sistema de Comandas</h1>
        </div>
      </header>

      <main className="main">
        <div className="orderGrid">
          {comandas.map((comanda) => (
            <OrderCard key={comanda.id} comanda={comanda} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default VistaCocina;