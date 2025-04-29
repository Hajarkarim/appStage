import React, { createContext, useState, useEffect } from "react";

// Create SessionContext to store the role
export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  

  // Fetch the role from localStorage when the app loads
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  return (
    <SessionContext.Provider value={{ role, setRole }}>
      {children}
    </SessionContext.Provider>
  );
};
