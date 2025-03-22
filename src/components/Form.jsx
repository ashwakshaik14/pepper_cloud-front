import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "../style/Home.module.css";

const Form = () => {
  const [title, setTitle] = useState("");
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const [inputs, setInputs] = useState([]);
  const [selectedInput, setSelectedInput] = useState(null);
  const [showInputs, setShowInputs] = useState(false);

  const navigate = useNavigate();

  const toggleInputs = () => {
    setShowInputs(!showInputs);
  };

  const addInput = (type) => {
    const newInput = { id: Date.now(), type, label: "", placeholder: "" };
    setInputs([...inputs, newInput]);
    setSelectedInput(newInput);
  };

  const updateSelectedInput = (field, value) => {
    setInputs((prevInputs) =>
      prevInputs.map((input) =>
        input.id === selectedInput.id ? { ...input, [field]: value } : input
      )
    );
    setSelectedInput({ ...selectedInput, [field]: value });
  };

  const deleteInput = (id) => {
    setInputs(inputs.filter((input) => input.id !== id));
    setSelectedInput(null);
  };

  const handleSubmit = async () => {
    const formData = {
      title,
      inputs,
    };

    try {
      const res = await fetch("http://localhost:3000/api/forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.error || "Failed to create form");
        throw new Error(errorData.error || "Failed to create form");
      }

      const data = await res.json();
      console.log("Form created:", data);
      navigate("/");
    } catch (error) {
      console.error("Submission error:", error.message);
    }
  };

  return (
    <div className={style.container}>
      <h2>Create New Form</h2>
      <div className={style.former}>
        <div>
          <div className={style.formPreview}>
            <h3>
              {isEditingTitle ? (
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onBlur={() => setIsEditingTitle(false)}
                  onKeyDown={(e) => e.key === "Enter" && setIsEditingTitle(false)}
                  autoFocus
                  style={{ fontSize: "18px", padding: "8px" }}
                />
              ) : (
                <span onClick={() => setIsEditingTitle(true)}>
                  {title || "Enter your Title"} ✏️
                </span>
              )}
            </h3>
            {inputs.map((input) => (
              <div
                key={input.id}
                onClick={() => setSelectedInput(input)}
                className="input-item"
              >
                <label>{input.label || "Untitled"}</label>
                <input 
                  type={input.type} 
                  placeholder={input.placeholder} 
                  readOnly 
                  style={{ fontSize: "16px", padding: "7px", width: "90%" }}
                />
                <button onClick={() => deleteInput(input.id)}  className="delete-btn">🗑️</button>
              </div>
            ))}
          </div>

          <div className={style.formControls}>
            <button className={style.submitBtn} onClick={toggleInputs}>
              {showInputs ? "Close Add Inputs" : "Add Inputs"}
            </button>

            {showInputs && (
              <div className={style.inputButtons}>
                <button onClick={() => addInput("text")}>TEXT</button>
                <button onClick={() => addInput("number")}>NUMBER</button>
                <button onClick={() => addInput("email")}>EMAIL</button>
                <button onClick={() => addInput("password")}>PASSWORD</button>
                <button onClick={() => addInput("date")}>DATE</button>
              </div>
            )}
          </div>
        </div>

        <div className={style.formEditor}>
          <h3>Form Editor</h3>
          <div className={style.ipedit}>
            {selectedInput && (
              <>
                <label style={{ fontSize: "20px", fontWeight: "bold" }}>{selectedInput.type}</label>
                <br />
                <label>Title</label>
                <input
                  type="text"
                  value={selectedInput.label}
                  onChange={(e) => updateSelectedInput("label", e.target.value)}
                  style={{ fontSize: "16px", padding: "8px", width: "100%" }}
                />
                <label>Placeholder</label>
                <input
                  type="text"
                  value={selectedInput.placeholder}
                  onChange={(e) => updateSelectedInput("placeholder", e.target.value)}
                  style={{ fontSize: "16px", padding: "8px", width: "100%" }}
                />
              </>
            )}
          </div>
        </div>
      </div>
      <button className="create-form-btn" onClick={handleSubmit}>
        CREATE FORM
      </button>
    </div>
  );
};

export default Form;