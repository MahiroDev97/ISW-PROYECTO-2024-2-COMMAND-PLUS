import { useState, useMemo } from "react";
import useGetAvailableProducts from "../hooks/products/UseGetAvailableProducts";

export const Menu = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { products, loading, error } = useGetAvailableProducts();

  const categorias = useMemo(() => {
    if (!products) return [];
    return ["Todos", ...new Set(products.map((product) => product.categoria))];
  }, [products]);
  console.log("Categorias", categorias);

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <MenuHeader onToggleSidebar={() => setIsSidebarOpen(true)} />
      <MenuSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        categories={categorias}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <div className="flex-1 flex flex-col w-full">
        <main className="flex-1 overflow-auto">
          <MenuGrid products={filteredProducts} />
        </main>
      </div>
    </div>
  );
};
