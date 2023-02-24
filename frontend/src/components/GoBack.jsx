import React from "react";
import { TbArrowBackUp } from "react-icons/tb";
import { Link } from "react-router-dom";

const GoBack = ({ url }) => {
  return (
    <div className="goBack-container">
      <Link to={url} className="goBack-btn">
        <TbArrowBackUp className="goBack-icon" /> Go Back
      </Link>
    </div>
  );
};

export default GoBack;
