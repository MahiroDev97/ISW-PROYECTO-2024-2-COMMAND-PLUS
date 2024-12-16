import React from 'react';

export const OrderStatus = ({ onStatusChange, isUpdating, id }) => {
  const getStatusClassName = (status) => {
    const baseClasses = "px-3 py-1 rounded-full text-sm font-medium cursor-pointer transition-all duration-200 hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed";
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

  const statusOptions = [
    { status: "pendiente", label: "Pendiente" },
    { status: "en-preparacion", label: "En preparación" },
    { status: "completado", label: "Completado" },
    { status: "cancelado", label: "Cancelado" }
  ];

  return (
    <div className="flex gap-2 flex-wrap justify-center">
      {statusOptions.map(({ status, label }) => (
        <button
          key={status}
          onClick={() => handleClick(status)}
          className={getStatusClassName(status)}
          disabled={isUpdating}
        >
          {label}
        </button>
      ))}
    </div>
  );
};