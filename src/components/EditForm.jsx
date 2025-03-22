import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import style from "../style/Home.module.css";

const EditForm = () => {
  const { formId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [inputs, setInputs] = useState([]);
  const [selectedInput, setSelectedInput] = useState(null);
  const [showInputs, setShowInputs] = useState(false);

  useEffect(() => {
    console.log("formId from useParams:", formId); 
    const fetchFormData = async () => {
      if (!formId) {
        console.error("formId is undefined!");
        return;
      }
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/forms/${formId}`);
        if (!res.ok) throw new Error("Failed to fetch form data");
        const data = await res.json();
        setTitle(data.title);
        setInputs(data.inputs);
      } catch (error) {
        console.error("Error fetching form data:", error.message);
      }
    };
    fetchFormData();
  }, [formId]);

  const toggleInputs = () => setShowInputs(!showInputs);

  const addInput = (type) => {
    const newInput = {
      id: Date.now(),
      type,
      label: "New Field",
      placeholder: "",
    };
    setInputs([...inputs, newInput]);
    setSelectedInput(newInput);
  };

  const updateSelectedInput = (field, value) => {
    setInputs((prevInputs) =>
      prevInputs.map((input) =>
        input.id === selectedInput.id ? { ...input, [field]: value } : input
      )
    );

    setSelectedInput((prevSelected) => ({ ...prevSelected, [field]: value }));
  };

  const handleUpdate = async () => {
    const formData = { title, inputs };
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/forms/update/${formId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to update form");
      }

      console.log("Form updated successfully");
      navigate("/");
    } catch (error) {
      console.error("Update error:", error.message);
    }
  };

  const deleteInput = (id) => {
    setInputs(inputs.filter((input) => input.id !== id));

    if (selectedInput && selectedInput.id === id) {
      setSelectedInput(null);
    }
  };

  return (
    <div className={style.container}>
      <h2>Edit Form</h2>
      <div className={style.former}>
        <div>
          <div className={style.formPreview}>
            <h3>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </h3>
            {inputs.map((input) => (
              <div key={input.id} onClick={() => setSelectedInput(input)}>
                <input
                  type="text"
                  value={input.label}
                  placeholder="Enter label"
                />
                <button
                  onClick={() => deleteInput(input.id)}
                  className="delete-btn"
                >
                  ❌
                </button>
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
                <label style={{ fontSize: "20px", fontWeight: "bold" }}>
                  {selectedInput.type}
                </label>
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
                  onChange={(e) =>
                    updateSelectedInput("placeholder", e.target.value)
                  }
                  style={{ fontSize: "16px", padding: "8px", width: "100%" }}
                />
              </>
            )}
          </div>
        </div>
      </div>

      <div className={style.btnContainer}>
        <button className={style.btn} type="submit" onClick={handleUpdate}>
          UPDATE FORM
        </button>
      </div>
    </div>
  );
};

export default EditForm;
