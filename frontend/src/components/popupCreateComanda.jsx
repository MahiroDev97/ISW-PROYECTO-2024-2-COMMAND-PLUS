import "@styles/popup.css";
import CloseIcon from "@assets/XIcon.svg";
import Form from "./Form";

export default function Popup({ show, setShow, data, action }) {
  const ComandaData = data && data.length > 0 ? data[0] : {};

  const handleSubmit = (formData) => {
    action(formData);
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
                  defaultValue: ComandaData.mesa || "",
                  placeholder: "mesa del local",
                  fieldType: "input",
                  type: "int",
                  required: true,
                  min: 1,
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
