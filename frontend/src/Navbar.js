// Navbar.js
import React, { useContext, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { SessionContext } from "./SessionContext";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { role, setRole } = useContext(SessionContext);
  const [logoutHovered, setLogoutHovered] = useState(false);

  const handleLogout = () => {
    setRole(null);
    navigate(role === "admin" ? "/admin" : "/user/login");
  };

  const hideNavbarPaths = ["/", "/admin", "/user/login"];
  const showNavbar = !hideNavbarPaths.includes(location.pathname);

  if (!showNavbar) return null;

  const pathPrefix = role === "admin" ? "/admin" : "/user";

  return (
    <nav style={navStyle}>
      <ul style={ulStyle}>
        <li style={liStyle}>
          <StyledLink to={`${pathPrefix}/home`}>Accueil</StyledLink>
        </li>
        <li style={liStyle}>
          <StyledLink to={`${pathPrefix}/users`}>Ajouter Délégué</StyledLink>
        </li>
        <li style={liStyle}>
          <StyledLink to={`${pathPrefix}/notes`}>Notes</StyledLink>
        </li>
        {role === "admin" && (
          <li style={liStyle}>
            <StyledLink to="/admin/dashboard">Ajouter compte Utilisateur</StyledLink>
          </li>
        )}
        <li style={liStyle}>
          <button 
            onClick={handleLogout}
            style={{ ...linkStyle, background: "transparent", border: "none", cursor: "pointer" }}
            onMouseEnter={() => setLogoutHovered(true)}
            onMouseLeave={() => setLogoutHovered(false)}
          >
            Déconnexion
            <span style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: logoutHovered ? '100%' : '0%',
              height: '2px',
              backgroundColor: 'white',
              transition: 'width 0.3s ease',
            }}></span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

const StyledLink = ({ to, children }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <NavLink 
      to={to} 
      style={({ isActive }) => ({ 
        ...linkStyle, 
        position: "relative",
        transform: isHovered ? 'translateY(-2px)' : 'none',
        color: isActive ? ' rgb(53, 143, 228)' : 'white',
      })}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="link-text">{children}</span>
      <span style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: isHovered ? '100%' : '0%',
        height: '2px',
        backgroundColor: 'currentColor',
        transition: 'width 0.3s ease, background-color 0.3s ease',
      }}></span>
      
      {/* Animation au clic */}
      <span style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '0',
        height: '0',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '50%',
        transform: 'translate(-50%, -50%)',
        transition: 'width 0.3s ease, height 0.3s ease',
      }} className="click-effect"></span>
    </NavLink>
  );
};

// Keyframes pour les animations
const slideDown = `
  @keyframes slideDown {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(0);
    }
  }
`;

const bounce = `
  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-5px);
    }
  }
`;

// Styles avec animations
const navStyle = {
  backgroundColor: "#191672",
  padding: "10px 0",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  zIndex: 1000,
  animation: "slideDown 0.5s ease-out",
  // Injection des keyframes
  styleTag: <style>{slideDown}</style>,
};

const ulStyle = {
  listStyle: "none",
  display: "flex",
  justifyContent: "center",
  padding: 0,
  margin: 0,
};

const liStyle = {
  margin: "0 15px",
  position: "relative",
};

const linkStyle = {
  textDecoration: "none",
  color: "white",
  fontSize: "18px",
  fontWeight: "bold",
  padding: "10px 15px",
  transition: "all 0.3s ease",
  display: "inline-block",
  position: "relative",
  overflow: "hidden",
  // Animation active
  '&.active': {
    animation: `${bounce} 0.5s ease`,
  },
};

export default Navbar;