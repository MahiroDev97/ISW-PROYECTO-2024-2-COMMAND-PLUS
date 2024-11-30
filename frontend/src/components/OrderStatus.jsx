export const OrderStatus = ({ onStatusChange, isUpdating, id }) => {
  const getStatusClassName = (status) => {
    const baseClasses = "px-3 py-1 rounded-full text-sm font-medium cursor-pointer";
    switch (status) {
      case "pendiente":
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case "en-preparacion":
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case "completado":
        return `${baseClasses} bg-green-100 text-green-800`;
      case "cancelado":
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return baseClasses;
    }
  };

  const handleClick = (newStatus) => {
    onStatusChange({ target: { value: newStatus } }, id);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => handleClick("pendiente")}
        className={getStatusClassName("pendiente")}
        disabled={isUpdating}
      >
        Pendiente
      </button>
      <button
        onClick={() => handleClick("en-preparacion")}
        className={getStatusClassName("en-preparacion")}
        disabled={isUpdating}
      >
        En preparación
      </button>
      <button
        onClick={() => handleClick("completado")}
        className={getStatusClassName("completado")}
        disabled={isUpdating}
      >
        Completado
      </button>
      <button
        onClick={() => handleClick("cancelado")}
        className={getStatusClassName("cancelado")}
        disabled={isUpdating}
      >
        Cancelado
      </button>
    </div>
  );
};