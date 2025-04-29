import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SessionContext } from "./SessionContext";

function Home() {
  const [allUsers, setAllUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/users")
      .then(response => setAllUsers(response.data))
      .catch(error => console.error("Erreur lors du chargement des utilisateurs:", error));
  }, []);

  const getMedal = (index) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return "";
  };

  const getRatingColor = (rating) => {
    if (rating >= 4.8) return "#4CAF50";
    if (rating >= 4.5) return "#8BC34A";
    if (rating >= 4.2) return "#CDDC39";
    return "#FFC107";
  };

  const getRowAnimation = (index) => ({
    animation: `fadeIn 0.5s ease-out ${0.1 * index}s forwards`,
    opacity: 0,
  });

  const filteredUsers = searchTerm
    ? allUsers.filter(user =>
        user.nom.toLowerCase().startsWith(searchTerm.toLowerCase())
      )
    : [...allUsers].sort((a, b) => b.note - a.note).slice(0, 10);

  const sortedUsers = filteredUsers.sort((a, b) => b.note - a.note);
  const { role } = useContext(SessionContext);

  const handleUserClick = (userId) => {
    const prefix = role === "admin" ? "/admin" : "/user";
    navigate(`${prefix}/NotesN/${userId}`);
  };

  return (
    <div style={{
      maxWidth: "800px",
      margin: "20px auto",
      textAlign: "center",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      background: "linear-gradient(to bottom right, #f9f9f9, #ffffff)",
      padding: "20px",
      borderRadius: "15px",
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Decorations */}
      <div style={{
        position: "absolute",
        top: "-50px",
        right: "-50px",
        width: "200px",
        height: "200px",
        background: "radial-gradient(circle, rgba(2,3,129,0.1) 0%, rgba(255,255,255,0) 70%)",
        zIndex: 0
      }}></div>
      <div style={{
        position: "absolute",
        bottom: "-30px",
        left: "-30px",
        width: "150px",
        height: "150px",
        background: "radial-gradient(circle, rgba(2,3,129,0.1) 0%, rgba(255,255,255,0) 70%)",
        zIndex: 0
      }}></div>

      <div style={{ fontSize: "32px", marginBottom: "5px", animation: "bounce 2s infinite" }}>
        🏆
      </div>
      <h1 style={{
        color: "#333",
        fontSize: "24px",
        marginBottom: "15px",
        position: "relative",
        paddingBottom: "10px",
        animation: "slideDown 0.7s ease-out forwards"
      }}>
        Top 10 des évaluations
        <div style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          height: "2px",
          width: "60px",
          background: "linear-gradient(to right, transparent, rgb(2, 3, 129), transparent)"
        }}></div>
      </h1>

      <input
        type="text"
        placeholder="🔍 Rechercher par nom (commence par...)"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          marginBottom: "15px",
          padding: "8px 14px",
          borderRadius: "10px",
          border: "1px solid #ccc",
          width: "100%",
          maxWidth: "320px",
          fontSize: "13px"
        }}
      />

      <div style={{
        position: "relative",
        padding: "5px",
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
      }}>
        <table style={{
          width: "100%",
          borderCollapse: "collapse",
          backgroundColor: "white",
          borderRadius: "8px",
          overflow: "hidden"
        }}>
          <thead>
            <tr style={{
              backgroundColor: "#191672",
              color: "white",
              textTransform: "uppercase",
              letterSpacing: "1px",
              fontSize: "12px"
            }}>
              <th style={{ padding: "10px", textAlign: "left" }}>Nom</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Prénom</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Affectation</th>
              <th style={{ padding: "10px", textAlign: "center" }}>Note</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Description</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user, index) => (
              <tr key={index} style={{
                backgroundColor: index % 2 === 0 ? "#f8f9fa" : "white",
                transition: "transform 0.3s, box-shadow 0.3s",
                cursor: "pointer",
                ...getRowAnimation(index)
              }}
                onClick={() => handleUserClick(user.id)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 3px 6px rgba(0,0,0,0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}>

                <td style={{
                  padding: "8px",
                  borderBottom: "1px solid #eaeaea",
                  fontWeight: index < 3 ? "bold" : "normal",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "13px"
                }}>
                  {getMedal(index)}
                  <div style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    backgroundColor: "rgb(2, 3, 129, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "8px",
                    marginLeft: index < 3 ? "6px" : "0"
                  }}>
                    {user.nom?.charAt(0)}
                  </div>
                  {user.nom}
                </td>

                <td style={{ padding: "8px", borderBottom: "1px solid #eaeaea", fontSize: "13px" }}>
                  {user.prenom}
                </td>

                <td style={{
                  padding: "8px",
                  borderBottom: "1px solid #eaeaea",
                  fontSize: "13px"
                }}>
                  {user.affectation}
                </td>

                <td style={{
                  padding: "8px",
                  borderBottom: "1px solid #eaeaea",
                  textAlign: "center",
                  fontSize: "13px"
                }}>
                  <div style={{
                    display: "inline-block",
                    backgroundColor: getRatingColor(user.note),
                    color: "white",
                    fontWeight: "bold",
                    padding: "4px 10px",
                    borderRadius: "16px",
                    minWidth: "40px",
                    fontSize: "12px"
                  }}>
                    {user.note}
                  </div>
                </td>

                <td style={{
                  padding: "8px",
                  borderBottom: "1px solid #eaeaea",
                  fontSize: "13px",
                  maxWidth: "150px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap"
                }}>
                  {user.description || "Aucune description"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{
        marginTop: "12px",
        fontSize: "12px",
        color: "#666",
        fontStyle: "italic",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "4px"
      }}>
        <span style={{ fontSize: "14px" }}>📈</span> Classement basé sur les évaluations de performance
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-8px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

export default Home;
