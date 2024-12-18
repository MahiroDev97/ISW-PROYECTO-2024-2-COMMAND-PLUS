import { useState, useMemo } from "react";
import { Search, X, Menu as MenuIcon } from "lucide-react";
import useGetAvailableProducts from "../hooks/products/UseGetAvailableProducts";

const formatPrice = (price) => {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  }).format(price);
};

export const Menu = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { products, loading, error } = useGetAvailableProducts();

  const categorias = useMemo(() => {
    if (!products) return [];
    return ["Todos", ...new Set(products.map((product) => product.categoria))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    return products.filter((product) => {
      const matchesSearch =
        product.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.descripcion.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "" ||
        selectedCategory === "Todos" ||
        product.categoria === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="min-h-screen w-screen bg-gray-50 dark:bg-gray-900">
      <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="w-full px-4 h-16 flex items-center justify-between">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors bg-transparent"
            aria-label="Abrir menú"
          >
            <MenuIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </button>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Menú
          </h1>
          <div className="w-10" />
        </div>
      </header>
      <>
        <div
          className="fixed inset-0 bg-black/50 transition-opacity z-40"
          style={{
            opacity: isSidebarOpen ? "1" : "0",
            pointerEvents: isSidebarOpen ? "auto" : "none",
          }}
          onClick={() => setIsSidebarOpen(false)}
        />
        <aside
          className="fixed left-0 top-0 h-full w-72 bg-white dark:bg-gray-900 shadow-xl z-50 transition-transform duration-300"
          style={{
            transform: isSidebarOpen ? "translateX(0)" : "translateX(-100%)",
          }}
        >
          <div className="p-4 flex flex-col h-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold dark:text-white">Filtrar</h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 rounded-full text-gray-500 dark:text-gray-400 transition-colors hover:bg-gray-100/80 dark:hover:bg-gray-800/80 bg-transparent"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            <div className="space-y-2">
              {categorias.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors
                    ${
                      selectedCategory === category
                        ? "bg-gray-100/80 dark:bg-gray-800/80 text-gray-900 dark:text-white"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 bg-transparent"
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </aside>
      </>
      <div className="flex-1 flex flex-col w-full">
        <main className="flex-1 overflow-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6 w-full max-w-screen-xl mx-auto">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] w-full min-w-[250px]"
              >
                <div className="aspect-video overflow-hidden">
                  {product.imagen ? (
                    <img
                      src={product.imagen}
                      alt={product.nombre}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = "/placeholder-image.png";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                        Sin imagen disponible
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-4 w-full">
                  <div className="text-sm text-blue-500 dark:text-blue-400 mb-1 w-full">
                    {product.categoria}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 truncate w-full">
                    {product.nombre}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                    {product.descripcion}
                  </p>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">
                    {formatPrice(product.precio)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};
