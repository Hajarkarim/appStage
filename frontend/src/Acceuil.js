import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaHome } from "react-icons/fa"; // Ajout de FaHome

function Accueil() {
  const navigate = useNavigate();

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideUp {
        from { transform: translateY(50px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes backgroundScale {
        0% { transform: scale(1); }
        100% { transform: scale(1.05); }
      }
      @keyframes textFade {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const handleAdminClick = () => navigate("/admin");
  const handleUserClick = () => navigate("/user/login");

  return (
    <div style={styles.main}>
      <div style={styles.overlay}>
        <div style={styles.card}>
          <div style={styles.content}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <FaHome style={{ fontSize: '2.5rem', color: 'rgb(53, 143, 228)' }} />
            </div>
            <h1 style={styles.title}>Page d'accueil</h1>
            <p style={styles.subtitle}>
              Bienvenue sur notre plateforme. Veuillez choisir votre mode d'accès.
            </p>

            <div style={styles.dividerWrapper}>
              <div style={styles.line}></div>
              <div style={styles.dividerText}>ACCÈS</div>
              <div style={styles.line}></div>
            </div>

            <div style={styles.buttonContainer}>
              <button
                onClick={handleAdminClick}
                style={styles.button}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.02)";
                  e.currentTarget.style.backgroundColor = "#2c75c9";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.backgroundColor = "rgb(53, 143, 228)";
                }}
              >
                <FaLock style={styles.icon} />
                Accéder à la page Admin
              </button>

              <button
                onClick={handleUserClick}
                style={styles.button}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.02)";
                  e.currentTarget.style.backgroundColor = "#2c75c9";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.backgroundColor = "rgb(53, 143, 228)";
                }}
              >
                <FaUser style={styles.icon} />
                Accéder à la page Utilisateur
              </button>
            </div>
          </div>

          <div style={styles.footer}>
            © {new Date().getFullYear()} Tous droits réservés
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  main: {
    height: "100vh",
    width: "100vw",
    backgroundImage: "url('bg.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    margin: 0,
    padding: 0,
    position: "fixed",
    top: 0,
    left: 0,
    animation: "backgroundScale 20s infinite alternate",
  },
  overlay: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    boxSizing: "border-box",
    animation: "fadeIn 1s ease-out",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.88)", // Augmentation de la transparence
    borderRadius: "1rem",
    padding: "2rem",
    width: "100%",
    maxWidth: "500px",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    borderTop: "6px solid rgb(53, 143, 228)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    overflow: "hidden",
    animation: "slideUp 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    backdropFilter: "blur(8px)", // Effet de flou renforcé
  },
  content: {
    flex: 1,
    paddingBottom: "10px",
    overflow: "visible",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "1rem",
    animation: "textFade 1s ease-out",
  },
  subtitle: {
    color: "#6b7280",
    marginBottom: "2rem",
    fontSize: "0.95rem",
    animation: "textFade 1s 0.2s ease-out forwards",
    opacity: 0,
  },
  dividerWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "2rem 0",
  },
  line: {
    height: "1px",
    backgroundColor: "grey",
    width: "40px",
  },
  dividerText: {
    margin: "0 1rem",
    color: "#6b7280",
    fontSize: "0.9rem",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  button: {
    padding: "12px 20px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "rgb(53, 143, 228)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0)",
    transition: "all 0.3s ease",
    transformOrigin: "center",
    margin: "2px 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginRight: "10px",
    fontSize: "1.2rem",
  },
  footer: {
    color: "#6b7280",
    fontSize: "0.85rem",
    paddingTop: "1.5rem",
    marginTop: "auto",
    borderTop: "1px solid #e5e7eb",
  },
};

export default Accueil;