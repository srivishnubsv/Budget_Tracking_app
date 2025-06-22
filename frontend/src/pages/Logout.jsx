import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../components/ToastProvider";

const Logout = () => {
  const { logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    showToast("Logged out successfully", "success");
    navigate("/login");
    // eslint-disable-next-line
  }, []);

  return null;
};

export default Logout;
