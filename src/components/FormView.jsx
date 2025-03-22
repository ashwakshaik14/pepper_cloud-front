import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import style from "../style/Home.module.css";

function FormView() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/forms/${id}`);
        if (!res.ok) {
          throw new Error("Form not found");
        }
        const data = await res.json();
        setForm(data);

        const initialFormData = {};
        data.inputs.forEach((input) => {
          initialFormData[input.label] = "";
        });
        setFormData(initialFormData);
      } catch (error) {
        console.error("Error fetching form:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchForm();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
  };

  if (loading) return <p>Loading...</p>;
  if (!form) return <p>Form not found</p>;

  return (
      <div className={style.container}>
      <h1>{form.title}</h1>
      <form onSubmit={handleSubmit}>
        <div className={style.formGrid}>
          {form.inputs.map((input, index) => (
            <div key={index} className={style.inputContainer}>
              <label>{input.label}</label>
              <input
                type={input.type}
                name={input.label}
                placeholder={input.placeholder}
                value={formData[input.label] || ""}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>

        <div className={style.btnContainer}>
          <button className={style.btn} type="submit">
            Submit
          </button>
        </div>
      </form>

      <button onClick={() => navigate("/")} className={style.btn2 }>Back</button>
    </div>
  );
}

export default FormView;
