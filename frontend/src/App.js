import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";

import Homee from "./Home";
import Users from "./Users";
import Notes from "./Notes";
import NotesN from "./NotesN";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import LoginUser from "./LoginUser";
import Accueil from "./Acceuil";

import { SessionContext } from "./SessionContext";
import ProtectedRoute from "./ProtectedRoute";
import Navbar from "./Navbar";

function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

function MainContent() {
  const location = useLocation();
  const { role } = useContext(SessionContext);

  const navbarHeight = 60;

  return (
    <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center" }}>
      <Navbar />
      <div
        style={{
          padding: "20px",
          paddingTop: `${navbarHeight + 20}px`,
        }}
      >
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/user/login" element={<LoginUser />} />
          <Route
  path="/:prefix/NotesN/:userId"
  element={<ProtectedRoute element={<NotesN />} allowedRoles={["admin", "user"]} />}
/>

          {/* Admin Routes */}
          <Route
            path="/admin/home"
            element={<ProtectedRoute element={<Homee />} allowedRoles={["admin"]} />}
          />
          <Route
            path="/admin/users"
            element={<ProtectedRoute element={<Users />} allowedRoles={["admin"]} />}
          />
          <Route
            path="/admin/notes"
            element={<ProtectedRoute element={<Notes />} allowedRoles={["admin"]} />}
          />
          <Route
            path="/admin/dashboard"
            element={<ProtectedRoute element={<AdminDashboard />} allowedRoles={["admin"]} />}
          />
         

          {/* User Routes */}
          <Route
            path="/user/home"
            element={<ProtectedRoute element={<Homee />} allowedRoles={["user"]} />}
          />
          <Route
            path="/user/users"
            element={<ProtectedRoute element={<Users />} allowedRoles={["user"]} />}
          />
          <Route
            path="/user/notes"
            element={<ProtectedRoute element={<Notes />} allowedRoles={["user"]} />}
          />
      
          
        </Routes>
      </div>
    </div>
  );
}

export default App;
