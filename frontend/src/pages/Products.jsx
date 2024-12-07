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
import Navbar from "@components/Navbar";

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
    { title: "Categoria", field: "categoria", width: 120, responsive: 0 },
    { title: "Nombre", field: "nombre", width: 200, responsive: 3 },
    { title: "Descripción", field: "descripcion", width: 250, responsive: 2 },
    { title: "Precio", field: "precio", width: 100, responsive: 2 },
    {
      title: "Disponibilidad",
      field: "disponibilidad",
      width: 120,
      responsive: 2,
    },
  ];

  return (
    <>
      <Navbar />
      <div className="h-[91vh] bg-gradient-to-br from-gray-50 to-gray-100 pt-[9vh]">
        <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col h-full">
            <div className="mb-2">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-extrabold text-gray-900 mb-1">
                    Gestión de Productos
                  </h1>
                  <p className="text-xs text-gray-600">
                    Administra los productos del restaurante
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <Search
                    value={filterName}
                    onChange={handleNameFilterChange}
                    placeholder={"Filtrar por nombre"}
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
                    disabled={dataProduct.length === 0}
                    className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
                  >
                    <img
                      src={dataProduct.length === 0 ? UpdateIconDisable : UpdateIcon}
                      alt="edit"
                      className="w-5 h-5"
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden flex flex-col h-[calc(91vh-140px)]">
              <div className="px-4 py-2 border-b border-gray-200 bg-gray-50/50">
                <h2 className="text-lg font-bold text-gray-900">
                  Lista de Productos
                </h2>
              </div>
              <div className="flex-1 p-2">
                <Table
                  columns={columns}
                  data={products}
                  onSelectionChange={handleSelectionChange}
                  filterBy={filterName}
                  className="text-sm h-full"
                />
              </div>
            </div>
          </div>
        </div>
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
    </>
  );
};

export default Products;
