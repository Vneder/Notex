import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";

export const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuth();
  if (loading) return <p>Loading...</p>;
  if (!isLoggedIn) return <Navigate to="/login" />;
  return children;
};

export const PublicRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuth();
  if (loading) return <p>Loading...</p>;
  if (isLoggedIn) return <Navigate to="/dashboard" />;
  return children;
};

export default { ProtectedRoute, PublicRoute };
