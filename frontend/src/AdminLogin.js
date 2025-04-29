import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "./SessionContext";
import { FaLock } from "react-icons/fa";
import './Stylee.css'

function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setRole } = useContext(SessionContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem("admin", JSON.stringify(data.admin));
        localStorage.setItem("role", "admin");
        setRole("admin");
        navigate("/admin/home");
      } else {
        setError(data.message || "Erreur lors de la connexion");
      }
    } catch {
      setError("Erreur de connexion au serveur");
    }
  };

  return (
    <div className="login-main">
      <div className="login-overlay">
        <div className="login-card">
          <div className="login-content">
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <FaLock style={{ fontSize: "2.5rem", color: "rgb(53, 143, 228)" }} />
            </div>
            <h1 className="login-title">Connexion Admin</h1>
            <p className="login-subtitle">
              Veuillez entrer vos identifiants pour accéder au tableau de bord.
            </p>
            <form onSubmit={handleLogin} className="login-form">
              <div className="login-input-container">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                  className="login-input"
                />
              </div>
              <div className="login-input-container">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mot de passe"
                  required
                  className="login-input"
                />
              </div>
              <button type="submit" className="login-button">Se connecter</button>
            </form>
            {error && <p className="login-error">{error}</p>}
          </div>
          <div className="login-footer">© {new Date().getFullYear()} Tous droits réservés</div>
        </div>
      </div>
    </div>
  );
}

export default LoginAdmin;
