import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

// Tworzymy kontekst autoryzacji
const AuthContext = createContext();

// Provider, który będzie owijającym komponentem dla aplikacji
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Flaga logowania
  const [user, setUser] = useState(null); // Przechowujemy dane użytkownika
  const [loading, setLoading] = useState(true); // Flaga ładowania

  // Sprawdzanie stanu logowania przy załadowaniu komponentu
  useEffect(() => {
    const checkLoginStatus = async () => {
      setLoading(true);
      try {
        // Wysyłamy zapytanie o dane użytkownika
        const response = await axios.get(
          "http://localhost:5000/api/auth/user",
          {
            withCredentials: true, // Umożliwiamy przesyłanie ciasteczek
          }
        );

        if (response.status === 200) {
          setIsLoggedIn(true);
          setUser(response.data); // Ustawiamy dane użytkownika
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
  }, []); // Uruchamiamy tylko raz przy załadowaniu komponentu

  // Funkcja logowania
  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  // Funkcja wylogowania
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

  // Zwracamy kontekst autoryzacji
  return (
    <AuthContext.Provider value={{ isLoggedIn, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook do korzystania z kontekstu autoryzacji
export const useAuth = () => useContext(AuthContext);
