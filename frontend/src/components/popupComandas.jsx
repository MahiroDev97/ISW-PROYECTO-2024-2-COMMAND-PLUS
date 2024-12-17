import "@styles/popup.css";
import CloseIcon from "@assets/XIcon.svg";
import Form from "./Form";
import { useState, useEffect } from "react";

export default function Popup({ show, setShow, data, action, products }) {
  const ComandaData = data && data.length > 0 ? data[0] : {};
  
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState({ id: "", cantidad: 1 });

  useEffect(() => {
    if (ComandaData.productcomandas) {
      // Agregar el nombre del producto al mapear los productos existentes
      const productosIndividuales = ComandaData.productcomandas.map(item => {
        const producto = products?.find(p => p.id === item.productId);
        return {
          id: item.productId,
          cantidad: 1,
          uniqueId: item.id,
          nombre: producto ? producto.nombre : 'Producto no encontrado' // Agregar nombre del producto
        };
      });
      
      setSelectedProducts(productosIndividuales);
    }
  }, [ComandaData, products]); // Agregar products como dependencia

  const handleAddProduct = () => {
    if (currentProduct.id) {
      const productoSeleccionado = products?.find(p => p.id === currentProduct.id);
      const newProducts = Array(currentProduct.cantidad).fill().map(() => ({
        id: currentProduct.id,
        cantidad: 1,
        uniqueId: Date.now() + Math.random(),
        nombre: productoSeleccionado ? productoSeleccionado.nombre : 'Producto no encontrado' // Agregar nombre al crear nuevo producto
      }));
      
      setSelectedProducts([...selectedProducts, ...newProducts]);
      setCurrentProduct({ id: "", cantidad: 1 });
    }
  };

  const handleRemoveProduct = (uniqueId) => {
    setSelectedProducts(selectedProducts.filter(product => product.uniqueId !== uniqueId));
  };

  const handleSubmit = (formData) => {
    // Convertir los productos individuales al formato esperado por el backend
    const productosAgrupados = selectedProducts.reduce((acc, item) => {
      const existingProduct = acc.find(p => p.id === item.id);
      if (existingProduct) {
        existingProduct.cantidad += 1;
      } else {
        acc.push({ id: item.id, cantidad: 1 });
      }
      return acc;
    }, []);

    action({
      ...ComandaData,
      ...formData,
      productos: productosAgrupados
    });
  };

  const getProductName = (productId) => {
    const product = products?.find(p => p.id === parseInt(productId));
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
              title="Editar Comanda"
              fields={[
                {
                  label: "mesa",
                  name: "mesa",
                  defaultValue: ComandaData.mesa || "",
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
                  defaultValue: ComandaData.estado || "",
                  placeholder: "estado de la comanda",
                  fieldType: "select",
                  options: [
                    { value: "Abierta", label: "Abierta" },
                    { value: "En Proceso", label: "En Proceso" },
                    { value: "Cerrada", label: "Cerrada" },
                  ],
                  required: true,
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
                            id: parseInt(e.target.value)
                          })}
                        >
                          <option value="">Seleccionar producto</option>
                          {products?.map((product) => (
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
                        {selectedProducts.map((product) => (
                          <div key={product.uniqueId} className="producto-item">
                            <span>{product.nombre}</span> {/* Usar el nombre guardado directamente */}
                            <button 
                              type="button" 
                              onClick={() => handleRemoveProduct(product.uniqueId)}
                              className="eliminar-producto"
                            >
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
              buttonText="Guardar Cambios"
              backgroundColor="fff"
            />
          </div>
        </div>
      )}
    </div>
  );
}
