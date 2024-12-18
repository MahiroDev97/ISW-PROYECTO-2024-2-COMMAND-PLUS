import { useState } from "react";
import useGetProducts from "@hooks/products/useGetProducts.jsx";
import useCreateProduct from "../hooks/products/UseCreateProduct";
import useEditProduct from "@hooks/products/useEditProduct";
import { UtensilsCrossed } from "lucide-react";
import AddIcon from "@assets/AddIcon.svg";
import Search from "../components/Search";
import PopupProducts from "../components/PopupProducts";
import PopupCreateProduct from "../components/PopupCreateProduct";
import { Select, MenuItem, Switch, FormControlLabel } from "@mui/material";
import Navbar from "@components/Navbar";
import { ProductCard } from "../components/ProductCard";

const Products = () => {
  const { products, loading, error, fetchProducts } = useGetProducts();
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("nombre");
  const [showUnavailable, setShowUnavailable] = useState(true);
  const uniqueCategories = [
    ...new Set(products.map((product) => product.categoria)),
  ];

  const {
    handleClickUpdate,
    handleUpdate,
    isPopupOpen,
    setIsPopupOpen,
    dataProduct,
  } = useEditProduct(fetchProducts);

  const {
    handleClickCreate,
    handleCreate,
    isPopupOpen: isPopupCreateOpen,
    setIsPopupOpen: setIsPopupCreateOpen,
  } = useCreateProduct(fetchProducts);

  const handleNameFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filterBySearch = (products) => {
    const lowerCaseFilter = filter.toLowerCase();
    return products.filter(
      (product) =>
        product.nombre.toLowerCase().includes(lowerCaseFilter) ||
        product.categoria.toLowerCase().includes(lowerCaseFilter) ||
        product.descripcion.toLowerCase().includes(lowerCaseFilter)
    );
  };

  const filterByAvailability = (products) => {
    if (showUnavailable) return products;
    return products.filter((product) => product.disponibilidad);
  };

  const sortProducts = (products) => {
    return [...products].sort((a, b) => {
      switch (sortBy) {
        case "nombre":
          return a.nombre.localeCompare(b.nombre);
        case "categoria":
          return a.categoria.localeCompare(b.categoria);
        case "precio":
          return a.precio - b.precio;
        default:
          return 0;
      }
    });
  };
  const filteredProducts = sortProducts(
    filterByAvailability(filterBySearch(products))
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <Navbar />
      <header className="fixed w-full left-0 top-[80px] bg-white shadow-md z-20">
        <div className="max-w-7xl mx-auto px-4 py-2 md:py-4">
          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center justify-center md:justify-start gap-2 md:gap-3">
              <UtensilsCrossed className="w-6 h-6 md:w-8 md:h-8 text-emerald-600" />
              <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
                Productos
              </h1>
            </div>

            <div className="grid grid-cols-[2fr_2fr] md:flex md:flex-row md:items-center md:space-x-4">
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                size="small"
                className="w-50 md:w-[220px] bg-white rounded-md border border-gray-300 text-center"
              >
                <MenuItem value="nombre">Ordenar por nombre</MenuItem>
                <MenuItem value="categoria">Ordenar por categoría</MenuItem>
                <MenuItem value="precio">Ordenar por precio</MenuItem>
              </Select>

              <FormControlLabel
                control={
                  <Switch
                    checked={showUnavailable}
                    onChange={(e) => setShowUnavailable(e.target.checked)}
                    color="primary"
                  />
                }
                label={showUnavailable ? "Todos" : "Solo Disponibles"}
                className="w-[220px] flex items-center justify-between px-2"
                sx={{
                  margin: 0,
                  "& .MuiFormControlLabel-label": {
                    minWidth: "120px",
                  },
                }}
              />
              <div className="w-full md:w-[200px]">
                <Search
                  value={filter}
                  onChange={handleNameFilterChange}
                  placeholder="Buscar producto"
                  className="w-50 text-center"
                />
              </div>

              <div className="w-full md:w-[200px]">
                <button
                  onClick={handleClickCreate}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
                >
                  <img src={AddIcon} alt="Agregar producto" />
                  <span>Producto</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="min-h-screen bg-gray-50 mt-[200px] md:mt-[160px]">
        <main className="max-w-7xl mx-auto px-4 py-8">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  producto={product}
                  onToggleAvailability={handleUpdate}
                  onClick={handleClickUpdate}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 py-12">
              <p className="text-xl text-gray-600">
                No se encontraron productos :(
              </p>
              <p className="text-gray-500">Prueba a agregar alguno</p>
            </div>
          )}
        </main>
      </div>
      <PopupProducts
        categories={uniqueCategories}
        show={isPopupOpen}
        setShow={setIsPopupOpen}
        producto={dataProduct}
        action={handleUpdate}
      />
      <PopupCreateProduct
        categories={uniqueCategories}
        show={isPopupCreateOpen}
        setShow={setIsPopupCreateOpen}
        action={handleCreate}
      />
    </>
  );
};

export default Products;
