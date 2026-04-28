import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("elivium_user");
    const storedToken = localStorage.getItem("elivium_token");
    if (storedUser && storedToken) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch {
        localStorage.removeItem("elivium_user");
        localStorage.removeItem("elivium_token");
      }
    }
    setLoading(false);
  }, []);

  const signup = async (formData) => {
    try {
      setError("");
      const response = await api.post("/auth/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        passwordConfirm: formData.passwordConfirm
      });
      // روح لصفحة التحقق
      navigate("/verify-email?email=" + encodeURIComponent(formData.email));
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Signup failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const login = async (formData) => {
    try {
      setError("");
      const response = await api.post("/auth/login", {
        email: formData.email,
        password: formData.password
      });
      const { user: userData, token } = response.data;
      const userWithRole = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: userData.role || "customer"
      };
      setUser(userWithRole);
      localStorage.setItem("elivium_user", JSON.stringify(userWithRole));
      localStorage.setItem("elivium_token", token);
      if (userWithRole.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Login failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("elivium_user");
    localStorage.removeItem("elivium_token");
    navigate("/login");
  };

  const updateUser = (data) => {
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem("elivium_user", JSON.stringify(updated));
  };

  const isAdmin = () => user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        signup,
        logout,
        updateUser,
        isAuthenticated: !!user,
        isAdmin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};