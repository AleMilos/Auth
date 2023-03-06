import React from "react";
import { TbArrowBackUp } from "react-icons/tb";
import { Link } from "react-router-dom";

/**
 * @desc Generates a GoBack button that links to the input url prop
 */
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
