import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const currentUserId = window.localStorage.getItem('currentUserId');

  // If user not found, redirect user to login page
  if (!currentUserId) {
    return <Navigate to="/login" />;
  }

  // If authenticated, render the child components
  return <Outlet />;
};
