import CloseIcon from "@assets/XIcon.svg";
import { useState } from "react";

export default function PopupCancelComanda({ show, setShow, onConfirm }) {
  const [reason, setReason] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reason.trim()) {
      alert("Por favor, ingrese un motivo de cancelación");
      return;
    }
    onConfirm(reason);
    setShow(false);
    setReason("");
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-96 relative">
        <button
          className="absolute top-2 right-2 p-1"
          onClick={() => setShow(false)}
        >
          <img src={CloseIcon} alt="close" />
        </button>

        <h2 className="text-xl font-bold mb-4">Cancelar Comanda</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Comentarios de cancelación
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full border rounded-md p-2 h-32"
              placeholder="Ingrese el comentario de la cancelación..."
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setShow(false)}
              className="px-4 py-2 border rounded-md hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Confirmar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
