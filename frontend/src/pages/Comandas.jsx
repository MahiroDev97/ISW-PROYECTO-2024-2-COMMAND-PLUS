import Table from "@components/Table";
import Search from "../components/Search";
import PopupComandas from "../components/popupComandas.jsx";
import PopupCreateComanda from "../components/popupCreateComanda.jsx";
import UpdateIcon from "../assets/updateIcon.svg";
import AddIcon from "../assets/AddIcon.svg";
import UpdateIconDisable from "../assets/updateIconDisabled.svg";
import { useCallback, useState } from "react";
import useComandas from "../hooks/comandas/UseGetComandas.jsx";
import useCreateComanda from "../hooks/comandas/useCreateComanda.jsx";
import useEditComanda from "../hooks/comandas/useEditComanda.jsx";
import Navbar from "../components/Navbar";


const Comandas = () => {
  const { comandas, setComandas, fetchComandas } = useComandas();

  const {
    handleClickUpdate,
    handleUpdate,
    isPopupOpen,
    setIsPopupOpen,
    dataComanda,
    setDataComanda,
  } = useEditComanda(fetchComandas);

  const [filterID, setFilterID] = useState("");

  const {
    handleClickCreate,
    handleCreate,
    isPopupOpen: isPopupCreateOpen,
    setIsPopupOpen: setIsPopupCreateOpen,
  } = useCreateComanda(fetchComandas);

  const handleIDFilterChange = (e) => {
    setFilterID(e.target.value);
  };

  const handleSelectionChange = useCallback(
    (selectedComandas) => {
      setDataComanda(selectedComandas);
    },
    [setDataComanda]
  );


  const columns = [
    { title: "id", field: "id", width: 150, responsive: 0 },
    { title: "fecha", field: "fecha", width: 300, responsive: 3 },
    { title: "mesa", field: "mesa", width: 350, responsive: 2 },
    { title: "estado", field: "estado", width: 200, responsive: 2 },
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
                  <Search
                    value={filterID}
                    onChange={handleIDFilterChange}
                    placeholder={"Filtrar por ID"}
                    className="bg-white rounded-lg shadow-sm"
                  />
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
                      src={dataComanda.length === 0 ? UpdateIconDisable : UpdateIcon}
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
                  filterBy={filterID}
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
      />
      <PopupCreateComanda
        show={isPopupCreateOpen}
        setShow={setIsPopupCreateOpen}
        action={handleCreate}
      />
    </>
  );
};

export default Comandas;
