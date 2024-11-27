import "@styles/popup.css";
import CloseIcon from "@assets/XIcon.svg";
import Form from "./Form";

export default function Popup({ show, setShow, data, action }) {
  const productData = data && data.length > 0 ? data[0] : {};

  const handleSubmit = (formData) => {
    action(formData);
  };

  const patternPrice = new RegExp(/^[0-9]+$/);
  return (
    <div>
      {show && (
        <div className="bg">
          <div className="popup">
            <button className="close" onClick={() => setShow(false)}>
              <img src={CloseIcon} />
            </button>
            <Form
              title="Editar producto"
              fields={[
                {
                  name: "id",
                  defaultValue: productData.id || "",
                  fieldType: "input",
                  type: "hidden",
                },
                {
                  label: "Categoría",
                  name: "categoria",
                  defaultValue: productData.categoria || "",
                  placeholder: "Categoría del producto",
                  fieldType: "input",
                  type: "text",
                  required: true,
                  minLength: 3,
                  maxLength: 50,
                },
                {
                  label: "Nombre",
                  name: "nombre",
                  defaultValue: productData.nombre || "",
                  placeholder: "Nombre del producto",
                  fieldType: "input",
                  type: "text",
                  required: true,
                  minLength: 3,
                  maxLength: 50,
                },
                {
                  label: "Descripción",
                  name: "descripcion",
                  defaultValue: productData.descripcion || "",
                  placeholder: "Descripción del producto",
                  fieldType: "input",
                  type: "text",
                  required: true,
                  minLength: 10,
                  maxLength: 100,
                },
                {
                  label: "Precio",
                  name: "precio",
                  defaultValue: productData.precio || "",
                  placeholder: "10000",
                  fieldType: "input",
                  type: "text",
                  pattern: patternPrice,
                  patternMessage:
                    "Debe ser un número entero o decimal con dos decimales",
                  required: true,
                },
                {
                  label: "Disponibilidad",
                  name: "disponibilidad",
                  defaultValue: productData.disponibilidad,
                  fieldType: "select",
                  options: [
                    { value: true, label: "Sí" },
                    { value: false, label: "No" },
                  ],
                  required: true,
                },
              ]}
              onSubmit={handleSubmit}
              buttonText="Editar producto"
              backgroundColor="fff"
            />
          </div>
        </div>
      )}
    </div>
  );
}
