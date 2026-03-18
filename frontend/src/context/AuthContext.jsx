import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../services/authService";
import { storage } from "../utils/storage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(storage.getUser());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!storage.getToken() || user) return;
    authService.profile().then(setUser).catch(() => storage.clear());
  }, [user]);

  const login = async (payload) => {
    setLoading(true);
    try {
      const data = await authService.login(payload);
      storage.setToken(data.token);
      storage.setUser(data);
      setUser(data);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload) => {
    setLoading(true);
    try {
      const data = await authService.register(payload);
      storage.setToken(data.token);
      storage.setUser(data);
      setUser(data);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    storage.clear();
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, register, logout, loading }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
