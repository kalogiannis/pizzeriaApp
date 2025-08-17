// src/auth/ProtectedRoute.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/api/useAuth";

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // While Auth0 is bootstrapping, show nothing (or a spinner)
  if (isLoading) return null;

  // If logged in, render child routes; otherwise redirect home
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
