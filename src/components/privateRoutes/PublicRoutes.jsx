import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PublicRoutes = ({ children }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const location = useLocation();
  // console.log(userInfo);
  // Check if the user is trying to access login or register
  if (
    userInfo &&
    (location.pathname === "/login" || location.pathname === "/register")
  ) {
    return <Navigate to="/dashboard" replace />;
  }

  return children || <Outlet />;
};

export default PublicRoutes;
