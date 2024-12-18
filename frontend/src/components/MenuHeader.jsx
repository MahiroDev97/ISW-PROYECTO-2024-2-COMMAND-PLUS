import { Menu } from "lucide-react";

export const MenuHeader = ({ onToggleSidebar }) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="w-full px-4 h-16 flex items-center justify-between">
        <button
          onClick={onToggleSidebar}
          className="p-2 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        </button>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Menú
        </h1>
        <div className="w-10" />
      </div>
    </header>
  );
};
