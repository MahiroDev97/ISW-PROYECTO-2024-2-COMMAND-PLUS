import "@styles/popup.css";
import CloseIcon from "@assets/XIcon.svg";
import Form from "./Form";

export default function Popup({ show, setShow, data, action }) {
  const ComandaData = data && data.length > 0 ? data[0] : {};

  const handleSubmit = (formData) => {
    action({ ...ComandaData, ...formData });
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
                  fieldType: "input",
                  type: "text",
                  required: true,
                  minLength: 1,
                  maxLength: 50,
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
              ]}
              onSubmit={handleSubmit}
              buttonText="Editar Comanda"
              backgroundColor="fff"
            />
          </div>
        </div>
      )}
    </div>
  );
}
