import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import Spinner from "../utils/Spinner";

// Non Role Based Routing System, this works for each logged user
const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return <Spinner />;
  }

  if (loggedIn) {
    document.getElementById("page-panel-container").style.marginLeft = "20%";
  } else {
    document.getElementById("page-panel-container").style.marginLeft = "0";
  }

  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
