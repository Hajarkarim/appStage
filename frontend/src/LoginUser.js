import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "./SessionContext";
import { FaUser } from "react-icons/fa";
import './Stylee.css';

function LoginUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setRole } = useContext(SessionContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("role", "user");
        setRole("user");
        navigate("/user/home");
      } else {
        setError(data.message || "Erreur lors de la connexion");
      }
    } catch (err) {
      setError("Erreur de connexion au serveur");
    }
  };

  return (
    <div className="login-main">
      <div className="login-overlay">
        <div className="login-card">
          <div className="login-content">
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <FaUser style={{ fontSize: "2.5rem", color: "rgb(53, 143, 228)" }} />
            </div>
            <h1 className="login-title">Connexion Utilisateur</h1>
            <p className="login-subtitle">
              Veuillez entrer vos identifiants pour accéder à votre espace.
            </p>

            <form className="login-form" onSubmit={handleLogin}>
              <div className="login-input-container">
                <input
                  className="login-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                />
              </div>

              <div className="login-input-container">
                <input
                  className="login-input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mot de passe"
                  required
                />
              </div>

              <button className="login-button" type="submit">
                Se connecter
              </button>
            </form>

            {error && <p className="login-error">{error}</p>}
          </div>

          <div className="login-footer">
            © {new Date().getFullYear()} Tous droits réservés
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginUser;
