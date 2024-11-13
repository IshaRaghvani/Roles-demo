import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import Unauthorized from "../pages/Unauthorized"; // Import your Unauthorized component

function PrivateRoute({ children, allowedRoles }) {
  const { userInfo } = useUser();

  // Check if the user has the required role 
  const userHasRequiredRole =
    userInfo && Array.isArray(allowedRoles) && allowedRoles.includes(userInfo.role.toUpperCase());

  // If no user is authenticated, navigate to login page 
  if (!userInfo) {
    return <Navigate to="/" />;
  }

  // If user is authenticated but does not have the required role, show Unauthorized page
  if (userInfo && !userHasRequiredRole) {
    return <Unauthorized />;
  }

  // If the user has the required role, render the children
  return children;
}

export default PrivateRoute;
