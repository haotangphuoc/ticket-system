import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "./customHooks";

export const ProtectedRoute = ({roleRequired}: {roleRequired:"ADMINISTRATOR" | "CLIENT"}) => {
  const user = useUser(); 

  // If user not found, redirect user to login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If client try to access administrator link, redirect user to unauthorized page
  if(!user.role && user.role !== roleRequired) {
    return <Navigate to="/unauthorized" />;
  }

  // If authenticated, render the child components
  return <Outlet />;
};
