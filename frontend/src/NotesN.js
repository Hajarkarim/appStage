import React, { useState, useEffect } from "react";  
import { FaStar, FaRegStar } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom"; 
import axios from "axios";

function NotesN() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: "",
    rating: 0,
    description: ""
  });

  const [selectedUser, setSelectedUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  // Styles identiques au composant Notes
  const enhancedStyles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "40vh",
      width: "100%",
    },
    form: {
      position: "relative",
      backgroundColor: "#ffffff",
      padding: "15px",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
      width: "350px",
      border: "1px solid #f0f0f0",
      borderRadius: "10px",
      animation: "fadeIn 1s ease-in-out",
    },
    input: {
      marginBottom: "10px",
      padding: "10px",
      borderRadius: "8px",
      border: "1px solid #e0e0e0",
      background: "#ffffff",
      boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
    },
    button: {
        marginTop: "12px",
        padding: "12px 18px",
        backgroundImage: "linear-gradient(135deg, rgb(2, 3, 129) 0%, rgb(40, 50, 180) 100%)",
        borderRadius: "8px",
        fontWeight: 700,
        letterSpacing: "0.6px",
        boxShadow: "0 4px 12px rgba(2, 3, 129, 0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        border: "none",
        cursor: "pointer",
        transition: "transform 0.2s, box-shadow 0.2s",
        fontSize: "15px",
        width: "100%",
    },
    label: {
      marginBottom: "5px",
      fontWeight: "500",
      color: "#333",
      display: "flex",
      alignItems: "center",
      fontSize: "14px",
    },
    title: {
      textAlign: "center",
      color: "rgb(2, 3, 129)",
      marginBottom: "15px",
      fontWeight: "bold",
      fontSize: "22px",
      position: "relative",
      paddingBottom: "8px",
    },
    titleUnderline: {
      position: "absolute",
      bottom: "0",
      left: "50%",
      transform: "translateX(-50%)",
      width: "60px",
      height: "3px",
      background: "linear-gradient(to right, transparent, rgb(2, 3, 129), transparent)",
    },
    formHeader: {
      display: "flex",
      justifyContent: "center",
      marginBottom: "10px",
    },
    headerIcon: {
      width: "45px",
      height: "45px",
      marginBottom: "5px",
      borderRadius: "50%",
      backgroundColor: "rgb(2, 3, 129)",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "20px",
      fontWeight: "bold",
      animation: "bounce 2s infinite"
    },
    successMessage: {
      backgroundColor: "#4CAF50",
      color: "white",
      padding: "8px",
      borderRadius: "8px",
      textAlign: "center",
      marginBottom: "12px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      animation: "slideDown 0.5s ease-out",
      fontSize: "14px",
    },
    rating: {
      display: "flex",
      justifyContent: "center",
      marginBottom: "10px",
      padding: "5px 0",
    },
    star: {
      fontSize: "24px",
      cursor: "pointer",
      margin: "0 5px",
      transition: "transform 0.2s",
    },
    textarea: { 
      marginBottom: "10px",
      padding: "10px",
      borderRadius: "8px",
      border: "1px solid #e0e0e0",
      background: "#ffffff",
      boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
      minHeight: "60px",
      resize: "none",
      fontSize: "14px",
      width:"95%",
    },
    iconPlaceholder: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "16px",
      height: "16px",
      backgroundColor: "rgb(2, 3, 129)",
      color: "white",
      borderRadius: "50%",
      fontSize: "9px",
      marginRight: "6px",
      fontWeight: "bold",
    },
    loadingIndicator: {
      display: "inline-block",
      width: "14px",
      height: "14px",
      marginLeft: "8px",
      borderRadius: "50%",
      border: "2px solid rgba(255, 255, 255, 0.3)",
      borderTopColor: "white",
      animation: "spin 1s linear infinite",
    },
    userDisplay: {
      marginBottom: "1rem",
      fontWeight: "bold",
      padding: "10px",
      borderRadius: "8px",
      background: "#f8f8f8",
      border: "1px solid #e0e0e0",
    }
  };

  useEffect(() => {
    document.body.style.backgroundColor = "#f4f4f4"; 
    document.body.style.overflowX = "hidden";
    document.documentElement.style.overflowX = "hidden";

    return () => {
      document.body.style.backgroundColor = "";
      document.body.style.overflowX = "";
      document.documentElement.style.overflowX = "";
    };
  }, []);

  useEffect(() => {
    if (userId) {
      axios.get("http://localhost:5000/users")
        .then(response => {
          const foundUser = response.data.find(user => user.id === parseInt(userId));
          if (foundUser) {
            setSelectedUser(foundUser);
            setFormData({
              id: foundUser.id.toString(),
              rating: foundUser.note || 0,
              description: foundUser.description || ""
            });
          } else {
            navigate("/home");
          }
        })
        .catch(error => {
          console.error("Erreur lors du chargement des utilisateurs:", error);
          navigate("/home");
        });
    }
  }, [userId, navigate]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleRating(rating) {
    setFormData({ ...formData, rating });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    
    axios.post("http://localhost:5000/add_rating", {
      id: parseInt(formData.id),
      rating: formData.rating,
      description: formData.description
    })
    .then(response => {
      setIsSubmitting(false);
      setSuccessMessage("Évaluation soumise avec succès!");
      setTimeout(() => setSuccessMessage(null), 3000);
    })
    .catch(error => {
      setIsSubmitting(false);
      console.error("Erreur lors de l'envoi de l'évaluation:", error);
      alert("Erreur lors de l'envoi de l'évaluation.");
    });
  }

  return (
    <div style={enhancedStyles.container}>
      <form onSubmit={handleSubmit} style={enhancedStyles.form}>
        <div style={enhancedStyles.formHeader}>
          <div style={enhancedStyles.headerIcon}>⭐</div>
        </div>

        <div style={enhancedStyles.title}>
          Évaluer un utilisateur
          <div style={enhancedStyles.titleUnderline}></div>
        </div>

        {successMessage && (
          <div style={enhancedStyles.successMessage}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ 
                width: "14px", 
                height: "14px", 
                backgroundColor: "white", 
                color: "#4CAF50",
                borderRadius: "50%",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "6px",
                fontWeight: "bold",
                fontSize: "9px"
              }}>✓</span>
              {successMessage}
            </div>
          </div>
        )}

        {userId && selectedUser ? (
          <>
            <label style={enhancedStyles.label}>
              <div style={enhancedStyles.iconPlaceholder}>U</div>
              Utilisateur:
            </label>
            <div style={enhancedStyles.userDisplay}>
              {selectedUser.nom} {selectedUser.prenom}
            </div>
          </>
        ) : (
          <div style={{ color: "#ff4444", textAlign: "center", marginBottom: "1rem" }}>
            Veuillez sélectionner un utilisateur pour évaluer.
          </div>
        )}

        <label style={enhancedStyles.label}>
          <div style={enhancedStyles.iconPlaceholder}>N</div>
          Note:
        </label>
        <div style={enhancedStyles.rating}>
          {[1, 2, 3, 4, 5].map((star) => (
            <span 
              key={star} 
              onClick={() => handleRating(star)}
              style={{
                ...enhancedStyles.star,
                transform: formData.rating === star ? "scale(1.2)" : "scale(1)"
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.1)"}
              onMouseOut={(e) => e.currentTarget.style.transform = formData.rating === star ? "scale(1.2)" : "scale(1)"}
            >
              {formData.rating >= star ? <FaStar color="gold" /> : <FaRegStar color="gray" />}
            </span>
          ))}
        </div>

        <label style={enhancedStyles.label}>
          <div style={enhancedStyles.iconPlaceholder}>D</div>
          Description:
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          style={enhancedStyles.textarea}
          placeholder="Décrivez votre évaluation..."
          required
        />

        <button 
          type="submit" 
          style={enhancedStyles.button}
          disabled={isSubmitting || !selectedUser}
          onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
          onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
        >
          {isSubmitting ? (
            <>
              Traitement en cours...
              <div style={enhancedStyles.loadingIndicator}></div>
            </>
          ) : (
            <>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "16px",
                height: "16px",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                borderRadius: "50%",
                marginRight: "6px",
                fontSize: "12px",
                fontWeight: "bold"
              }}>✓</div>
              Soumettre l'évaluation
            </>
          )}
        </button>
      </form>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          textarea:focus {
            border-color: rgb(2, 3, 129) !important;
            box-shadow: 0 0 0 3px rgba(2, 3, 129, 0.2) !important;
            outline: none;
          }
          button:hover {
            background-image: linear-gradient(135deg, rgb(2, 3, 129) 0%, rgb(60, 70, 200) 100%) !important;
            box-shadow: 0 6px 12px rgba(2, 3, 129, 0.4) !important;
          }
        `}
      </style>
    </div>
  );
}

export default NotesN;