import Table from "@components/Table";
import PopupComandas from "../components/popupComandas.jsx";
import PopupCreateComanda from "../components/popupCreateComanda.jsx";
import UpdateIcon from "../assets/updateIcon.svg";
import AddIcon from "../assets/AddIcon.svg";
import UpdateIconDisable from "../assets/updateIconDisabled.svg";
import { useCallback, useEffect } from "react";
import useComandas from "../hooks/comandas/UseGetComandas.jsx";
import useCreateComanda from "../hooks/comandas/useCreateComanda.jsx";
import useEditComanda from "../hooks/comandas/useEditComanda.jsx";
import Navbar from "../components/Navbar";
import useGetProducts from "../hooks/products/useGetProducts.jsx";
import { wsService } from "../services/websocket";
import { Bell } from "lucide-react";
import { toast } from "react-toastify";

const Comandas = () => {
  const { comandas, fetchComandas } = useComandas();

  const { products, fetchProducts } = useGetProducts();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const {
    handleClickUpdate,
    handleUpdate,
    isPopupOpen,
    setIsPopupOpen,
    dataComanda,
    setDataComanda,
  } = useEditComanda(fetchComandas);

  const {
    handleClickCreate,
    handleCreate,
    isPopupOpen: isPopupCreateOpen,
    setIsPopupOpen: setIsPopupCreateOpen,
  } = useCreateComanda(fetchComandas);

  const handleSelectionChange = useCallback(
    (selectedComandas) => {
      setDataComanda(selectedComandas);
    },
    [setDataComanda]
  );

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("usuario"));
    const handleComandaUpdate = (data) => {
      if (user?.role === "garzon" || user?.role === "administrador") {
        if (data.type === "COMANDA_UPDATE") {
          toast.info(
            <div className="flex items-center">
              <Bell className="mr-2" />
              <span>
                Mesa #{data.data.mesa}: Producto actualizado a{" "}
                {data.data.newStatus}
              </span>
            </div>,
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              className: "bg-blue-100 text-blue-800 font-bold",
            }
          );
        } else if (data.type === "COMANDA_READY") {
          toast.success(
            <div className="flex items-center">
              <Bell className="mr-2" />
              <span>
                ¡ATENCIÓN! Comanda de Mesa #{data.data.mesa} está lista para
                servir
              </span>
            </div>,
            {
              position: "top-center",
              autoClose: false,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: false,
              className: "bg-green-100 text-green-800 font-bold text-lg",
            }
          );
          new Audio("/notification.mp3").play().catch(console.error);
        }
        fetchComandas();
      }
    };

    wsService.subscribe("COMANDA_UPDATE", handleComandaUpdate);
    wsService.subscribe("COMANDA_READY", handleComandaUpdate);

    return () => {
      wsService.unsubscribe("COMANDA_UPDATE", handleComandaUpdate);
      wsService.unsubscribe("COMANDA_READY", handleComandaUpdate);
    };
  }, [fetchComandas]);

  const columns = [
    {
      title: "Fecha",
      field: "fecha",
      width: 300,
      responsive: 3,
      formatter: (cell) => {
        const date = new Date(cell.getValue());
        return date.toLocaleString("es-ES", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      },
    },
    { title: "Mesa", field: "mesa", width: 350, responsive: 2 },
    { title: "Estado", field: "estado", width: 200, responsive: 2 },
  ];

  return (
    <>
      <Navbar />
      <div className="h-[91vh] bg-gradient-to-br from-gray-50 to-gray-100 pt-[9vh]">
        <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col h-full">
            <div className="mb-2">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-extrabold text-gray-900 mb-1">
                    Gestión de Comandas
                  </h1>
                  <p className="text-xs text-gray-600">
                    Administra las comandas del restaurante
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleClickCreate}
                    className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <img src={AddIcon} alt="add" className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleClickUpdate}
                    disabled={dataComanda.length === 0}
                    className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
                  >
                    <img
                      src={
                        dataComanda.length === 0
                          ? UpdateIconDisable
                          : UpdateIcon
                      }
                      alt="edit"
                      className="w-5 h-5"
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden flex flex-col max-h-[calc(91vh-130px)]">
              <div className="px-4 py-2 border-b border-gray-200 bg-gray-50/50">
                <h2 className="text-lg font-bold text-gray-900">
                  Lista de Comandas
                </h2>
              </div>
              <div className="flex-1 p-3">
                <Table
                  columns={columns}
                  data={comandas}
                  onSelectionChange={handleSelectionChange}
                  className="text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <PopupComandas
        show={isPopupOpen}
        setShow={setIsPopupOpen}
        data={dataComanda}
        action={handleUpdate}
        products={products}
      />
      <PopupCreateComanda
        show={isPopupCreateOpen}
        setShow={setIsPopupCreateOpen}
        action={handleCreate}
        products={products}
      />
    </>
  );
};

export default Comandas;
