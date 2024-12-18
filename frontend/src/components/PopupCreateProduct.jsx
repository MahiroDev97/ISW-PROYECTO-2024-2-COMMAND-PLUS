import CloseIcon from "@assets/XIcon.svg";
import { useState } from "react";
import { Autocomplete, InputAdornment, TextField } from "@mui/material";
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/jpg", "image/png"];
const MAX_FILE_SIZE = 5 * 1024 * 1024;
export default function Popup({ show, setShow, categories, action }) {
  const [formData, setFormData] = useState({
    categoria: "",
    nombre: "",
    descripcion: "",
    precio: "",
    disponibilidad: true,
    imagen: null,
  });
  const [options, setOptions] = useState(
    categories.map((category) => ({
      label: category,
      value: category,
    }))
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^\d+$/.test(formData.precio)) {
      alert("El precio debe ser un número válido");
      return;
    }
    action(formData);
  };

  const validateFile = (file) => {
    if (!file) return false;
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      alert("Solo se permiten archivos JPEG, JPG y PNG");
      return false;
    }
    if (file.size > MAX_FILE_SIZE) {
      alert("El archivo debe ser menor a 5MB");
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "imagen") {
      const file = files[0];
      if (!validateFile(file)) {
        e.target.value = "";
        return;
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const formatPrice = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handlePriceChange = (e) => {
    const rawValue = e.target.value.replace(/\./g, "");
    if (/^\d*$/.test(rawValue)) {
      setFormData((prev) => ({
        ...prev,
        precio: rawValue,
      }));
    }
  };

  return (
    <div>
      {show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96 relative">
            <button
              className="absolute top-2 right-2 p-1"
              onClick={() => setShow(false)}
            >
              <img src={CloseIcon} alt="close" />
            </button>

            <h2 className="text-xl font-bold mb-4">Nuevo Producto</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Autocomplete
                  freeSolo
                  value={formData.categoria}
                  options={options.map((option) => option.label)}
                  filterOptions={(options, params) => {
                    const filtered = options.filter((option) =>
                      option
                        .toLowerCase()
                        .includes(params.inputValue.toLowerCase())
                    );

                    const inputValue = params.inputValue.trim().toLowerCase();
                    const exists = options.some(
                      (option) => option.toLowerCase() === inputValue
                    );

                    if (inputValue !== "" && !exists) {
                      filtered.push(`Añadir "${params.inputValue}"`);
                    }

                    return filtered;
                  }}
                  renderOption={(props, option) => (
                    <li {...props}>
                      {option.startsWith('Añadir "') ? (
                        <span className="text-blue-600">{option}</span>
                      ) : (
                        option
                      )}
                    </li>
                  )}
                  onChange={(event, newValue) => {
                    if (newValue && newValue.startsWith('Añadir "')) {
                      const newCategory = newValue.slice(8, -1).trim();
                      const exists = options.some(
                        (option) =>
                          option.label.toLowerCase() ===
                          newCategory.toLowerCase()
                      );

                      if (!exists) {
                        setOptions((prev) => [
                          ...prev,
                          { label: newCategory, value: newCategory },
                        ]);
                      }
                      setFormData((prev) => ({
                        ...prev,
                        categoria: newCategory,
                      }));
                    } else {
                      setFormData((prev) => ({
                        ...prev,
                        categoria: newValue || "",
                      }));
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Categoría"
                      required
                      fullWidth
                      name="categoria"
                    />
                  )}
                />
              </div>
              <div>
                <TextField
                  name="nombre"
                  label="Nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  fullWidth
                  inputProps={{ minLength: 3, maxLength: 50 }}
                />
              </div>
              <div>
                <TextField
                  name="descripcion"
                  label="Descripción"
                  value={formData.descripcion}
                  onChange={handleChange}
                  required
                  fullWidth
                  multiline
                  rows={3}
                  inputProps={{ minLength: 10 }}
                />
              </div>
              <div>
                <TextField
                  name="precio"
                  label="Precio"
                  type="text"
                  value={formData.precio ? formatPrice(formData.precio) : ""}
                  onChange={handlePriceChange}
                  required
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  inputProps={{
                    inputMode: "numeric",
                  }}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Imagen del producto (JPEG, JPG, PNG)
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="file"
                    name="imagen"
                    onChange={handleChange}
                    accept="image/jpeg,image/jpg,image/png"
                    className="hidden"
                    id="image-input"
                  />
                  <label
                    htmlFor="image-input"
                    className="cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Seleccionar imagen
                  </label>
                  {formData.imagen && (
                    <div className="relative w-20 h-20">
                      <img
                        src={URL.createObjectURL(formData.imagen)}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, imagen: null }))
                        }
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center text-xs"
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
              >
                Crear Producto
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
