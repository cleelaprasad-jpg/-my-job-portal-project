import { Navigate } from "react-router-dom";
//Redirect's to login page if not logged in.
const ProtectRoute = ({ children }) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectRoute;
