import React, { useState, useEffect } from "react";

const AdminDashboard = () => {
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    confirmPassword: "", // Added confirmPassword state
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null); // To handle error messages

  useEffect(() => {
    document.body.style.backgroundColor = "#f4f4f4";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddUser = async () => {
    if (form.password !== form.confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    setIsSubmitting(true);
    const response = await fetch("http://localhost:5000/user/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const result = await response.json();
    setIsSubmitting(false);

    if (response.ok) {
      setSuccessMessage("Utilisateur ajouté avec succès !");
      setForm({ nom: "", prenom: "", email: "", password: "", confirmPassword: "" });
      setTimeout(() => setSuccessMessage(null), 3000);
    } else {
      alert(result.message || "Erreur lors de l'ajout de l'utilisateur");
    }
  };

  return (
    <div style={enhancedStyles.container}>
      <form style={enhancedStyles.form} onSubmit={(e) => e.preventDefault()}>
        <div style={enhancedStyles.formHeader}>
          <div style={{ ...enhancedStyles.headerIcon, animation: "bounce 1.5s infinite" }}>A</div>
        </div>
        <div style={enhancedStyles.title}>
          Ajouter un utilisateur
          <div style={enhancedStyles.titleUnderline}></div>
        </div>

        {successMessage && (
          <div style={enhancedStyles.successMessage}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span
                style={{
                  width: "12px",
                  height: "12px",
                  backgroundColor: "white",
                  color: "#4CAF50",
                  borderRadius: "50%",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "4px",
                  fontWeight: "bold",
                  fontSize: "7px",
                }}
              >
                ✓
              </span>
              {successMessage}
            </div>
          </div>
        )}

        {errorMessage && (
          <div style={enhancedStyles.errorMessage}>
            {errorMessage}
          </div>
        )}

        {["nom", "prenom", "email", "password", "confirmPassword"].map((field, index) => (
          <React.Fragment key={field}>
            <label style={enhancedStyles.label}>
              <div style={enhancedStyles.iconPlaceholder}>{field.charAt(0).toUpperCase()}</div>
              {field.charAt(0).toUpperCase() + field.slice(1)}:
            </label>
            <input
              type={field === "password" || field === "confirmPassword" ? "password" : "text"}
              name={field}
              value={form[field]}
              onChange={handleChange}
              style={enhancedStyles.input}
              placeholder={`Entrez le ${field}`}
            />
          </React.Fragment>
        ))}

        <button
          type="submit"
          style={enhancedStyles.button}
          onClick={handleAddUser}
          disabled={isSubmitting}
          onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
          onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
        >
          {isSubmitting ? (
            <>
              Traitement...
              <div style={enhancedStyles.loadingIndicator}></div>
            </>
          ) : (
            <>
              <div style={enhancedStyles.addButtonIcon}>+</div>
              Ajouter utilisateur
            </>
          )}
        </button>

        <style>
          {`
            @keyframes bounce {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-5px); }
            }
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            input:focus {
              border-color: rgb(2, 3, 129) !important;
              box-shadow: 0 0 0 2px rgba(2, 3, 129, 0.15) !important;
            }
            button:hover {
              background-image: linear-gradient(135deg, rgb(2, 3, 129) 0%, rgb(60, 70, 200) 100%) !important;
              box-shadow: 0 4px 8px rgba(2, 3, 129, 0.3) !important;
            }
          `}
        </style>
      </form>
    </div>
  );
};

// Styles for the AdminDashboard
const enhancedStyles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "80vh",
    width: "100%",
  },
  form: {
    backgroundColor: "#ffffff",
    padding: "30px",
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.08)",
    width: "300px",
    border: "1px solid #f0f0f0",
    height: "auto",
    display: "flex",
    flexDirection: "column",
  },
  input: {
    marginBottom: "18px",
    padding: "8px 10px",
    borderRadius: "6px",
    border: "1px solid #e0e0e0",
    background: "#ffffff",
    boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.08)",
    height: "34px",
    fontSize: "15px",
  },
  button: {
    marginTop: "10px",
    padding: "8px 14px",
    backgroundImage: "linear-gradient(135deg, rgb(2, 3, 129) 0%, rgb(40, 50, 180) 100%)",
    borderRadius: "6px",
    fontWeight: "bold",
    fontSize: "13px",
    letterSpacing: "0.3px",
    boxShadow: "0 3px 6px rgba(2, 3, 129, 0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    height: "36px",
    border: "none",
    cursor: "pointer",
  },
  label: {
    marginBottom: "4px",
    fontWeight: "500",
    color: "#333",
    display: "flex",
    alignItems: "center",
    fontSize: "12px",
  },
  title: {
    textAlign: "center",
    color: "rgb(2, 3, 129)",
    marginBottom: "12px",
    fontWeight: "bold",
    fontSize: "24px",
    position: "relative",
    paddingBottom: "5px",
  },
  titleUnderline: {
    position: "absolute",
    bottom: "0",
    left: "50%",
    transform: "translateX(-50%)",
    width: "40px",
    height: "2px",
    background: "linear-gradient(to right, transparent, rgb(2, 3, 129), transparent)",
  },
  formHeader: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "8px",
  },
  headerIcon: {
    width: "32px",
    height: "32px",
    marginBottom: "4px",
    borderRadius: "50%",
    backgroundColor: "rgb(2, 3, 129)",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    fontWeight: "bold",
  },
  successMessage: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "6px",
    borderRadius: "5px",
    textAlign: "center",
    marginBottom: "10px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    animation: "slideDown 0.3s ease-out",
    fontSize: "12px",
  },
  errorMessage: {
    backgroundColor: "#F44336",
    color: "white",
    padding: "6px",
    borderRadius: "5px",
    textAlign: "center",
    marginBottom: "10px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    fontSize: "12px",
  },
  iconPlaceholder: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "14px",
    height: "14px",
    backgroundColor: "rgb(2, 3, 129)",
    color: "white",
    borderRadius: "50%",
    fontSize: "8px",
    marginRight: "5px",
    fontWeight: "bold",
  },
  loadingIndicator: {
    display: "inline-block",
    width: "12px",
    height: "12px",
    marginLeft: "6px",
    borderRadius: "50%",
    border: "1.5px solid rgba(255, 255, 255, 0.3)",
    borderTopColor: "white",
    animation: "spin 0.8s linear infinite",
  },
  addButtonIcon: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "14px",
    height: "14px",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: "50%",
    marginRight: "5px",
    fontSize: "9px",
    fontWeight: "bold",
  },
};

export default AdminDashboard;
