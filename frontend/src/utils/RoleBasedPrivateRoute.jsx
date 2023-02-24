import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import Spinner from "./Spinner";
import NotFound from "../pages/NotFound";

// Role Based Routing system
const RoleBasedPrivateRoute = ({ path }) => {
  const { loggedIn, checkingStatus } = useAuthStatus();

  const role = useSelector((store) => {
    if (store.authReducer.user) {
      return store.authReducer.user.role;
    }
    return null;
  });

  if (checkingStatus) {
    return <Spinner />;
  }
  if (loggedIn) {
    document.getElementById("page-panel-container").style.marginLeft = "20%";
  } else {
    document.getElementById("page-panel-container").style.marginLeft = "0";
  }
  switch (path) {
    case "/manage":
      if (loggedIn) {
        return role === "Super" ? <Outlet /> : <NotFound />;
      }
      return <Navigate to="/login" />;
    case "/manage/delete":
      if (loggedIn) {
        return role === "Super" ? <Outlet /> : <NotFound />;
      }
      return <Navigate to="/login" />;
    case "/manage/register":
      if (loggedIn) {
        return role === "Super" ? <Outlet /> : <NotFound />;
      }
      return <Navigate to="/login" />;
    default:
      return loggedIn ? <Outlet /> : <Navigate to="/login" />;
  }
};

export default RoleBasedPrivateRoute;
