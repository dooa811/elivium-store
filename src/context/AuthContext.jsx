import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("elivium_user");
    if (stored) { try { setUser(JSON.parse(stored)); } catch {} }
    setLoading(false);
  }, []);

  const login = async ({ email, password }) => {
    await new Promise(r => setTimeout(r, 800));
    if (!email || !password) throw new Error("Invalid credentials");
    const u = { id: "u1", name: email.split("@")[0], email, avatar: null, joinedAt: new Date().toISOString() };
    setUser(u);
    localStorage.setItem("elivium_user", JSON.stringify(u));
    navigate("/");
  };

  const signup = async ({ name, email, password }) => {
    await new Promise(r => setTimeout(r, 900));
    if (!name || !email || !password) throw new Error("All fields required");
    const u = { id: "u" + Date.now(), name, email, avatar: null, joinedAt: new Date().toISOString() };
    setUser(u);
    localStorage.setItem("elivium_user", JSON.stringify(u));
    navigate("/");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("elivium_user");
    navigate("/login");
  };

  const updateUser = (data) => {
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem("elivium_user", JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, updateUser, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};