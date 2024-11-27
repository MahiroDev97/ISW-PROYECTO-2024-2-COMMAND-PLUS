
import Table from "@components/Table";
import useComandas from "@hooks/Comandas/useGetComandas.jsx";
import Search from "../components/Search";
import PopupComandas from "../components/popupComandas.jsx/index.js";
import PopupCreateComanda from "../components/popupCreateComanda.jsx";
import UpdateIcon from "../assets/updateIcon.svg";
import AddIcon from "../assets/addIcon.svg";
import UpdateIconDisable from "../assets/updateIconDisabled.svg";
import { useCallback, useState } from "react";
import useEditComanda from "@hooks/Comandas/useEditComanda";
import useCreateComanda from "../hooks/Comandas/UseCreateComanda";

const Comandas = () => {
    const { products, setComandas } = useComandas();
    const [filterID, setFilterID] = useState("");
  
    const {
      handleClickUpdate,
      handleUpdate,
      isPopupOpen,
      setIsPopupOpen,
      dataComanda,
      setDataComanda,
    } = useEditComanda(setComandas);
  
    const {
      handleClickCreate,
      handleCreate,
      isPopupOpen: isPopupCreateOpen,
      setIsPopupOpen: setIsPopupCreateOpen,
    } = useCreateComanda(setComandas);
  
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
      { title: "id", field: "Numero", width: 150, responsive: 0 },
      { title: "fecha", field: "fecha", width: 300, responsive: 3 },
      { title: "mesa", field: "mesa", width: 350, responsive: 2 },
      { title: "estado", field: "estado", width: 200, responsive: 2 },
    ];
  
    return (
      <div className="main-container">
        <div className="table-container">
          <div className="top-table">
            <h1 className="title-table">Comandas</h1>
            <div className="filter-actions">
              <Search
                value={filterID}
                onChange={handleIDFilterChange}
                placeholder={"Filtrar por ID"}
              />
  
              <button onClick={handleClickCreate}>
                <img src={AddIcon} alt="add" />
              </button>
  
              <button
                onClick={handleClickUpdate}
                disabled={dataComanda.length === 0}
              >
                {dataComanda.length === 0 ? (
                  <img src={UpdateIconDisable} alt="edit-disabled" />
                ) : (
                  <img src={UpdateIcon} alt="edit" />
                )}
              </button>
            </div>
          </div>
          <Table
            columns={columns}
            data={products}
            onSelectionChange={handleSelectionChange}
            filterBy={filterID}
          />
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
      </div>
    );
  };
  
  export default Comandas;
  