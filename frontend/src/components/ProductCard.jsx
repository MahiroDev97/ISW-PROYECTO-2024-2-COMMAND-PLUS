import { UtensilsCrossed } from "lucide-react";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";

const CustomSwitch = styled(Switch)(() => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "green",
    "&:hover": {
      backgroundColor: "rgba(0, 128, 0, 0.08)",
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "green",
  },
  "& .MuiSwitch-switchBase": {
    color: "red",
    "&:hover": {
      backgroundColor: "rgba(255, 0, 0, 0.08)",
    },
  },
  "& .MuiSwitch-track": {
    backgroundColor: "red",
  },
}));

export function ProductCard({ producto, onToggleAvailability, onClick }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(price);
  };

  const handleToggleAvailability = (producto) => {
    const updatedProduct = {
      ...producto,
      disponibilidad: !producto.disponibilidad,
    };
    onToggleAvailability(updatedProduct);
  };

  return (
    <div
      onClick={() => onClick(producto)}
      style={{ cursor: "pointer" }}
      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]"
    >
      <div className="relative h-48">
        {producto.imagen ? (
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <UtensilsCrossed size={48} className="text-gray-400" />
            <p>Producto sin Imagen</p>
          </div>
        )}
        <span className="absolute top-2 right-2 px-2 py-1 text-sm rounded-full bg-gray-900 text-white">
          {producto.categoria}
        </span>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-800">
            {producto.nombre}
          </h3>
          <span className="text-lg font-bold text-emerald-600">
            {formatPrice(producto.precio)}
          </span>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">
          {producto.descripcion}
        </p>

        <div
          onClick={(e) => e.stopPropagation()}
          className="flex items-center "
        >
          <CustomSwitch
            checked={producto.disponibilidad}
            onChange={() => handleToggleAvailability(producto)}
          />
          <span
            className={`text-sm font-bold ${
              producto.disponibilidad ? "text-green-600" : "text-red-600"
            }`}
          >
            {producto.disponibilidad ? "Disponible" : "No disponible"}
          </span>
        </div>
      </div>
    </div>
  );
}
