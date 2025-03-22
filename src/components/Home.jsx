import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "../style/Home.module.css";

function Home() {
  const navigate = useNavigate();
  const [forms, setForms] = useState([]);
  useEffect(() => {
    const fetchForms = async () => {
      try {
        const res = await fetch(`https://pepper-cloud-back.onrender.com/api/forms`);
        if (!res.ok) {
          throw new Error("Failed to fetch forms");
        }
        const data = await res.json();
        setForms(data);
      } catch (error) {
        console.error("Error fetching forms:", error.message);
      }
    };

    fetchForms();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this form?")) return;

    try {
      const res = await fetch(`https://pepper-cloud-back.onrender.com/api/forms/delete/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to delete form");
      }

      setForms(forms.filter((form) => form._id !== id));
      console.log("Form deleted successfully");
    } catch (error) {
      console.error("Delete error:", error.message);
    }
  };

  return (
    <>
      <div className={style.container}>
        <h1>Pepper Cloud Form Builder</h1>
        <div className={style.btnContainer}>
          <button
            className={style.btn}
            type="submit"
            onClick={() => navigate("/form")}
          >
            Create New Form{" "}
          </button>
        </div>
      </div>
      <hr />

      <div className={style.forms}>
        <h2>Available Forms</h2>
        {forms.length === 0 ? (
          <p>No forms available</p>
        ) : (
          <div className={style.cardContainer}>
            {forms.map((form) => (
              <div key={form._id} className={style.card}>
                <h3>{form.title}</h3>
                <div className={style.cardButtons}>
                  <button onClick={() => navigate(`/form/${form._id}`)}>
                    View
                  </button>
                  <button onClick={() => navigate(`/form/edit/${form._id}`)}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(form._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
