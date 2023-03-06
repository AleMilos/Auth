import React from "react";
import { useAuthStatus } from "../hooks/useAuthStatus";
import Spinner from "../utils/Spinner";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const { loggedIn, checkingStatus } = useAuthStatus();

  if (loggedIn) {
    document.getElementById("page-panel-container").style.marginLeft = "20%";
  } else {
    navigate("/");
  }
  if (checkingStatus) {
    return <Spinner />;
  }

  return (
    <div className="home-container">
      <h1 className="home-h1">Not Found</h1>
    </div>
  );
};

export default NotFound;
