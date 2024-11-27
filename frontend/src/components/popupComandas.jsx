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
                  minLength: 3,
                  maxLength: 50,
                },
                {
                  label: "estado",
                  name: "estado",
                  defaultValue: ComandaData.estado || "",
                  placeholder: "estado de la comanda",
                  fieldType: "input",
                  type: "text",
                  required: true,
                  minLength: 3,
                  maxLength: 50,
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
