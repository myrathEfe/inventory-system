import React, { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../services/api";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sayfa açılınca localStorage'dan oku
  useEffect(() => {
    console.log("Auth provider useffect calis",user,token)
    const t = localStorage.getItem("token");
    const u = localStorage.getItem("user");
    if (t) setToken(t);
    if (u) setUser(JSON.parse(u));
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {

      const response = await authAPI.login({ email, password });
      console.log("🔎 Login Response:", response);

      // Axios response -> response.data içinde token + user var
      const { token: newToken, user: userData } = response;

      if (!newToken || !userData) {
        throw new Error("Sunucudan veri alınamadı");
      }

      setToken(newToken);
      setUser(userData);

      localStorage.setItem("token", newToken);
      localStorage.setItem("user", JSON.stringify(userData));

      toast.success("Başarıyla giriş yapıldı!");
      return { success: true };
    } catch (error) {
      console.error("❌ Login error:", error);
      const message =
          error.response?.data?.message || error.message || "Giriş yapılamadı";
      toast.error(message);
      return { success: false, error: message };
    }
  };


  const register = async (name, email, password) => {
    try {
      await authAPI.register({ name, email, password });
      toast.success("Kayıt başarılı! Şimdi giriş yapabilirsiniz.");
      return true;
    } catch (err) {
      const message = err.response?.data?.error || "Kayıt yapılamadı";
      toast.error(message);
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Çıkış yapıldı");
  };

  return (
      <AuthContext.Provider
          value={{
            user,
            token,
            loading,
            isAuthenticated: !!token,
            login,
            register,
            logout,
          }}
      >
        {children}
      </AuthContext.Provider>
  );
};