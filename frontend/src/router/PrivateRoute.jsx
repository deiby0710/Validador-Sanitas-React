import { Navigate } from "react-router-dom";
import { isTokenValid } from "../utils/auth";
import { logoutWithReason } from "../utils/logout";

export const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  if (!isTokenValid(token)) {
    logoutWithReason("expired");
    return null;
  }
  return children;
};