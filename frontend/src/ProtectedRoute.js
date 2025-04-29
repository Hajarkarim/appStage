import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { SessionContext } from "./SessionContext";

const ProtectedRoute = ({ element, allowedRoles }) => {
  const { role } = useContext(SessionContext);

  if (allowedRoles.includes(role)) {
    return element;
  }

  // Redirect to login if not allowed
  return <Navigate to="/" />;
};

export default ProtectedRoute;
