import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHandshake, FaHandshakeSlash } from "react-icons/fa";

const ManageUsers = () => {
  const navigate = useNavigate();
  const onDelete = () => {
    navigate("delete");
  };
  const onRegister = () => {
    navigate("register");
  };
  return (
    <div className="manageUsers-container">
      <button onClick={onRegister} className="manageUser-btn">
        Register User
        <FaHandshake className="delete-user-icon" />
      </button>
      <button onClick={onDelete} className="manageUser-btn">
        Delete User
        <FaHandshakeSlash className="delete-user-icon" />
      </button>
    </div>
  );
};

export default ManageUsers;
