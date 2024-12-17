import { OrderCard } from "../components/ComandaOrderCard";
import { useState, useEffect } from "react";
import useComandas from "../hooks/comandas/UseGetComandas";
import { ClipboardList } from "lucide-react";

const VistaCocina = () => {
  const { comandas, setComandas } = useComandas();
  const [filterID, setFilterID] = useState("");

  useEffect(() => {
    console.log(comandas); // Verifica que comandas tiene los datos correctos
  }, [comandas]);

  return (
    <div className="min-h-screen bg-gray-50 overflow-auto">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center">
          <ClipboardList className="w-8 h-8 text-indigo-600 mr-4" />
          <h1 className="text-xl font-bold text-gray-900">Sistema de Comandas</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {comandas.map((comanda) => (
            <OrderCard key={comanda.id} comanda={comanda} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default VistaCocina;