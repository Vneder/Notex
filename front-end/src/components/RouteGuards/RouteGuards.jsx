import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";

// Ochrona dla stron dostępnych tylko dla zalogowanych użytkowników
export const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuth();
  if (loading) return <p>Loading...</p>;
  if (!isLoggedIn) return <Navigate to="/login" />;
  return children;
};

// Ochrona dla stron dostępnych tylko dla niezalogowanych użytkowników
export const PublicRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuth();
  if (loading) return <p>Loading...</p>;
  if (isLoggedIn) return <Navigate to="/dashboard" />;
  return children;
};

export default { ProtectedRoute, PublicRoute };
