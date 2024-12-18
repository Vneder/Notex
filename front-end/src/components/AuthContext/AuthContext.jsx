import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/user",
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          setIsLoggedIn(true);
          setUser(response.data);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      } catch (error) {
        console.error("Błąd podczas sprawdzania stanu logowania:", error);
        setIsLoggedIn(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      setIsLoggedIn(false);
      setUser(null);
    } catch (error) {
      console.error("Błąd podczas wylogowania:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
