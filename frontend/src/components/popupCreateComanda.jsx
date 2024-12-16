import "@styles/popup.css";
import CloseIcon from "@assets/XIcon.svg";
import Form from "./Form";
import { useState } from "react";

export default function Popup({ show, setShow, action, products }) {
  // Agregar console.log para debuggear
  console.log("Products received:", products);

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState({ id: "", cantidad: 1 });

  const handleAddProduct = () => {
    if (currentProduct.id) {
      setSelectedProducts([...selectedProducts, { ...currentProduct }]);
      setCurrentProduct({ id: "", cantidad: 1 });
    }
  };

  const handleRemoveProduct = (index) => {
    const newProducts = selectedProducts.filter((_, i) => i !== index);
    setSelectedProducts(newProducts);
  };

  const handleSubmit = (formData) => {
    const comandaData = {
      ...formData,
      productos: selectedProducts
    };
    action(comandaData);
    setSelectedProducts([]);
  };

  const getProductName = (productId) => {
    const product = products.find(p => p.id === parseInt(productId));
    return product ? product.nombre : '';
  };

  return (
    <div>
      {show && (
        <div className="bg">
          <div className="popup">
            <button className="close" onClick={() => setShow(false)}>
              <img src={CloseIcon} />
            </button>
            <Form
              title="Nueva Comanda"
              fields={[
                {
                  label: "mesa",
                  name: "mesa",
                  defaultValue: "",
                  placeholder: "mesa del local",
                  fieldType: "select",
                  options: Array.from({ length: 10 }, (_, i) => ({
                    value: (i + 1).toString(),
                    label: (i + 1).toString(),
                  })),
                  required: true,
                },
                {
                  label: "estado",
                  name: "estado",
                  defaultValue: "Abierta",
                  placeholder: "estado de la comanda",
                  fieldType: "select",
                  options: [
                    { value: "Abierta", label: "Abierta" },
                  ],
                  required: true,
                  readOnly: true,
                },
                {
                  label: "Productos",
                  name: "productos",
                  fieldType: "custom",
                  customContent: (
                    <div className="productos-container">
                      <div className="producto-selector">
                        <select
                          value={currentProduct.id}
                          onChange={(e) => setCurrentProduct({
                            ...currentProduct,
                            id: e.target.value
                          })}
                        >
                          <option value="">Seleccionar producto</option>
                          {Array.isArray(products) && products.map((product) => (
                            <option key={product.id} value={product.id}>
                              {product.nombre}
                            </option>
                          ))}
                        </select>
                        <input
                          type="number"
                          min="1"
                          value={currentProduct.cantidad}
                          onChange={(e) => setCurrentProduct({
                            ...currentProduct,
                            cantidad: parseInt(e.target.value)
                          })}
                        />
                        <button type="button" onClick={handleAddProduct}>
                          Agregar
                        </button>
                      </div>
                      <div className="productos-seleccionados">
                        {selectedProducts.map((product, index) => (
                          <div key={index} className="producto-item">
                            <span>{getProductName(product.id)} - Cantidad: {product.cantidad}</span>
                            <button type="button" onClick={() => handleRemoveProduct(index)}>
                              Eliminar
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                }
              ]}
              onSubmit={handleSubmit}
              buttonText="Crear Comanda"
              backgroundColor="fff"
            />
          </div>
        </div>
      )}
    </div>
  );
}
