import Table from "@components/Table";
import useProducts from "@hooks/products/useGetProducts.jsx";
import Search from "../components/Search";
import PopupProducts from "../components/PopupProducts";
import PopupCreateProduct from "../components/PopupCreateProduct";
import UpdateIcon from "../assets/updateIcon.svg";
import AddIcon from "../assets/AddIcon.svg";
import UpdateIconDisable from "../assets/updateIconDisabled.svg";
import { useCallback, useState } from "react";
import useEditProduct from "@hooks/products/useEditProduct";
import useCreateProduct from "../hooks/products/UseCreateProduct";

const Products = () => {
  const { products, fetchProducts, setProducts } = useProducts();
  const [filterName, setFilterName] = useState("");

  const {
    handleClickUpdate,
    handleUpdate,
    isPopupOpen,
    setIsPopupOpen,
    dataProduct,
    setDataProduct,
  } = useEditProduct(setProducts);

  const {
    handleClickCreate,
    handleCreate,
    isPopupOpen: isPopupCreateOpen,
    setIsPopupOpen: setIsPopupCreateOpen,
  } = useCreateProduct(setProducts);

  const handleNameFilterChange = (e) => {
    setFilterName(e.target.value);
  };

  const handleSelectionChange = useCallback(
    (selectedProducts) => {
      setDataProduct(selectedProducts);
    },
    [setDataProduct]
  );

  const columns = [
    { title: "Categoria", field: "categoria", width: 150, responsive: 0 },
    { title: "Nombre", field: "nombre", width: 300, responsive: 3 },
    { title: "Descripción", field: "descripcion", width: 350, responsive: 2 },
    { title: "Precio", field: "precio", width: 200, responsive: 2 },
    {
      title: "Disponibilidad",
      field: "disponibilidad",
      width: 200,
      responsive: 2,
    },
  ];

  return (
    <div className="main-container">
      <div className="table-container">
        <div className="top-table">
          <h1 className="title-table">Productos</h1>
          <div className="filter-actions">
            <Search
              value={filterName}
              onChange={handleNameFilterChange}
              placeholder={"Filtrar por nombre"}
            />

            <button onClick={handleClickCreate}>
              <img src={AddIcon} alt="add" />
            </button>

            <button
              onClick={handleClickUpdate}
              disabled={dataProduct.length === 0}
            >
              {dataProduct.length === 0 ? (
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
          filterBy={filterName}
        />
      </div>
      <PopupProducts
        show={isPopupOpen}
        setShow={setIsPopupOpen}
        data={dataProduct}
        action={handleUpdate}
      />
      <PopupCreateProduct
        show={isPopupCreateOpen}
        setShow={setIsPopupCreateOpen}
        action={handleCreate}
      />
    </div>
  );
};

export default Products;
