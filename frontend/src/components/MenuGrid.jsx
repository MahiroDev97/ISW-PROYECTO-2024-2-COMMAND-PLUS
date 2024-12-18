export const MenuGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6 w-full max-w-full">
      {products.map((product) => (
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
              ${product.precio.toFixed(2)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
