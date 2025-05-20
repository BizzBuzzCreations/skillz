import { createContext, useContext, useState } from "react";

// Create the context
export const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // user: { name, email, role, ... }

  // Call this after login/signup
  const login = (userData) => {
    setUser(userData);
    // Optionally: localStorage.setItem('user', JSON.stringify(userData));
  };

  // Call this on logout
  const logout = () => {
    setUser(null);
    // Optionally: localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy access
export const useAuth = () => useContext(AuthContext);
