import { Search, X } from "lucide-react";

export const MenuSidebar = ({
  isOpen,
  onClose,
  categories,
  selectedCategory,
  onCategorySelect,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity z-40 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      <aside
        className={`fixed left-0 top-0 h-full w-72 bg-white dark:bg-gray-900 shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold dark:text-white">Filters</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
            >
              <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search menu..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
            />
          </div>

          <div className="space-y-2">
            <button
              onClick={() => onCategorySelect("")}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === ""
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
              }`}
            >
              All Items
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategorySelect(category)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};
