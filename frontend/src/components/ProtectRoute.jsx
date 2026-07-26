import { Navigate } from "react-router-dom";
//Redirect's to login page if not logged in.
const ProtectRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem("access_token");
  const role = localStorage.getItem("role");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  if (allowedRole && role !== allowedRole) {
    //checks the user role to access the page, if not redirect to login page.
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectRoute;
