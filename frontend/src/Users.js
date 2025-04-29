import React, { useState, useEffect } from "react";

function Users() {
  const [formData, setFormData] = useState({ nom: "", prenom: "", affectation: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);

    fetch("http://localhost:5000/add_user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsSubmitting(false);
        setSuccessMessage("Utilisateur ajouté avec succès !");
        console.log("Réponse du serveur:", data);
        setTimeout(() => setSuccessMessage(null), 3000);
        setFormData({ nom: "", prenom: "", affectation: "" });
      })
      .catch((error) => {
        setIsSubmitting(false);
        console.error("Erreur lors de l'ajout:", error);
        alert("Erreur lors de l'ajout de l'utilisateur.");
      });
  }

  useEffect(() => {
    document.body.style.backgroundColor = "#f4f4f4"; 
    return () => {
      document.body.style.backgroundColor = ""; 
    };
  }, []);

  // Styles modérément compacts
  const enhancedStyles = {
    ...styles,
    container: {
      ...styles.container,
      minHeight: "80vh", // Un peu plus grand qu'ultra-minimaliste
    },
    form: {
      ...styles.form,
      position: "relative",
      backgroundColor: "#ffffff",
      padding: "30px", // Un peu plus grand
      boxShadow: "0 6px 20px rgba(0, 0, 0, 0.08)",
      width: "300px", // Un peu plus large
      border: "1px solid #f0f0f0",
      height: "auto",
    },
    input: {
      ...styles.input,
      marginBottom: "18px", // Un peu plus grand
      padding: "8px 10px", // Un peu plus grand
      borderRadius: "6px",
      border: "1px solid #e0e0e0",
      background: "#ffffff",
      boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.08)",
      height: "34px", // Un peu plus grand
      fontSize: "15px", // Un peu plus grand
    },
    button: {
      ...styles.button,
      marginTop: "10px", // Un peu plus grand
      padding: "8px 14px", // Un peu plus grand
      backgroundImage: "linear-gradient(135deg, rgb(2, 3, 129) 0%, rgb(40, 50, 180) 100%)",
      borderRadius: "6px",
      fontWeight: "bold",
      fontSize: "13px", // Un peu plus grand
      letterSpacing: "0.3px",
      boxShadow: "0 3px 6px rgba(2, 3, 129, 0.2)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "36px", // Un peu plus grand
    },
    label: {
      marginBottom: "4px", // Un peu plus grand
      fontWeight: "500",
      color: "#333",
      display: "flex",
      alignItems: "center",
      fontSize: "12px", // Un peu plus grand
    },
    title: {
      textAlign: "center",
      color: "rgb(2, 3, 129)",
      marginBottom: "12px", // Un peu plus grand
      fontWeight: "bold",
      fontSize: "24px", // Un peu plus grand
      position: "relative",
      paddingBottom: "5px", // Un peu plus grand
    },
    titleUnderline: {
      position: "absolute",
      bottom: "0",
      left: "50%",
      transform: "translateX(-50%)",
      width: "40px", // Un peu plus grand
      height: "2px",
      background: "linear-gradient(to right, transparent, rgb(2, 3, 129), transparent)",
    },
    formHeader: {
      display: "flex",
      justifyContent: "center",
      marginBottom: "8px", // Un peu plus grand
    },
    headerIcon: {
      width: "32px", // Un peu plus grand
      height: "32px", // Un peu plus grand
      marginBottom: "4px", // Un peu plus grand
      borderRadius: "50%",
      backgroundColor: "rgb(2, 3, 129)",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "14px", // Un peu plus grand
      fontWeight: "bold",
    },
    successMessage: {
      backgroundColor: "#4CAF50",
      color: "white",
      padding: "6px", // Un peu plus grand
      borderRadius: "5px",
      textAlign: "center",
      marginBottom: "10px", // Un peu plus grand
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      animation: "slideDown 0.3s ease-out",
      fontSize: "12px", // Un peu plus grand
    },
    iconPlaceholder: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "14px", // Un peu plus grand
      height: "14px", // Un peu plus grand
      backgroundColor: "rgb(2, 3, 129)",
      color: "white",
      borderRadius: "50%",
      fontSize: "8px", // Un peu plus grand
      marginRight: "5px", // Un peu plus grand
      fontWeight: "bold",
    },
    loadingIndicator: {
      display: "inline-block",
      width: "12px", // Un peu plus grand
      height: "12px", // Un peu plus grand
      marginLeft: "6px", // Un peu plus grand
      borderRadius: "50%",
      border: "1.5px solid rgba(255, 255, 255, 0.3)",
      borderTopColor: "white",
      animation: "spin 0.8s linear infinite",
    },
    addButtonIcon: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "14px", // Un peu plus grand
      height: "14px", // Un peu plus grand
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      borderRadius: "50%",
      marginRight: "5px", // Un peu plus grand
      fontSize: "9px", // Un peu plus grand
      fontWeight: "bold",
    }
  };

  return (
    <div style={enhancedStyles.container}>
      <form onSubmit={handleSubmit} style={enhancedStyles.form}>
        {/* En-tête légèrement plus grand */}
        <div style={enhancedStyles.formHeader}>
          <div 
            style={{
              ...enhancedStyles.headerIcon,
              animation: "bounce 1.5s infinite"
            }}
          >
            U
          </div>
        </div>
        
        {/* Titre légèrement plus grand */}
        <div style={enhancedStyles.title}>
          Ajouter Délégué
          <div style={enhancedStyles.titleUnderline}></div>
        </div>
        
        {/* Message de succès légèrement plus grand */}
        {successMessage && (
          <div style={enhancedStyles.successMessage}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ 
                width: "12px", // Un peu plus grand
                height: "12px", // Un peu plus grand
                backgroundColor: "white", 
                color: "#4CAF50",
                borderRadius: "50%",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "4px", // Un peu plus grand
                fontWeight: "bold",
                fontSize: "7px" // Un peu plus grand
              }}>✓</span>
              {successMessage}
            </div>
          </div>
        )}
        
        <label style={enhancedStyles.label}>
          <div style={enhancedStyles.iconPlaceholder}>N</div>
          Nom:
        </label>
        <input 
          type="text" 
          name="nom" 
          value={formData.nom} 
          onChange={handleChange} 
          style={enhancedStyles.input}
          placeholder="Entrez le nom"
        />
        
        <label style={enhancedStyles.label}>
          <div style={enhancedStyles.iconPlaceholder}>P</div>
          Prénom:
        </label>
        <input 
          type="text" 
          name="prenom" 
          value={formData.prenom} 
          onChange={handleChange} 
          style={enhancedStyles.input}
          placeholder="Entrez le prénom"
        />
        
        <label style={enhancedStyles.label}>
          <div style={enhancedStyles.iconPlaceholder}>A</div>
          Affectation:
        </label>
        <input 
          type="text" 
          name="affectation" 
          value={formData.affectation} 
          onChange={handleChange} 
          style={enhancedStyles.input}
          placeholder="Entrez l'affectation"
        />
        
        <button 
          type="submit" 
          style={enhancedStyles.button}
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
              Ajouter Délégué
            </>
          )}
        </button>
      </form>
      
      {/* CSS Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(15px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-5px); }
            to { opacity: 1; transform: translateY(0); }
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
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "76vh", 
    width: "100%", 
  },
  form: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    width: "300px",
    animation: "fadeIn 1s ease-in-out",
  },
  input: {
    marginBottom: "10px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    outline: "none",
    transition: "border-color 0.3s ease-in-out",
  },
  button: {
    padding: "10px",
    backgroundColor: "rgb(2, 3, 129)",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease-in-out, transform 0.2s",
  },
};

export default Users;