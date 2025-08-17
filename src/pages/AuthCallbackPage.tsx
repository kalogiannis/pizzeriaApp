import React, { useEffect } from "react";
import { useAuth } from "@/api/useAuth";
import { useNavigate } from "react-router-dom";

const AuthCallbackPage: React.FC = () => {
  const { isLoading } = useAuth();
  const navigate = useNavigate();

  // Once Auth0 finishes its redirect processing, go home
  useEffect(() => {
    if (!isLoading) {
      navigate("/", { replace: true });
    }
  }, [isLoading, navigate]);

  return <div className="flex items-center justify-center h-full">Loading…</div>;
};

export default AuthCallbackPage;
