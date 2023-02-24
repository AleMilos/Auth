import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, resetAuth } from "../features/auth/authSlice";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { toast } from "react-toastify";
import Modal from "./Modal";
import { openModal } from "../features/modal/modalSlice";

// USER ICONS
import {
  FaUsers,
  FaChessKing,
  FaUserLock,
  FaUserCog,
  FaUser,
} from "react-icons/fa";
// NAV ICONS
import { MdOutlineWork, MdSearch } from "react-icons/md";
import { TiUpload } from "react-icons/ti";
import { IoEye } from "react-icons/io5";
import { AiFillHome } from "react-icons/ai";

function SidePanel() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loggedIn } = useAuthStatus();

  const onLogout = () => {
    dispatch(openModal("side-panel"));
  };

  const onProfileClick = () => {
    navigate("/profile");
  };

  const handleModalSubmit = (modalConfirmed) => {
    if (modalConfirmed) {
      dispatch(logout());
      dispatch(resetAuth());
      toast.success("Logged Out");
    }
  };

  const { isOpen, openBy } = useSelector((store) => store.modalReducer);

  const role = useSelector((store) => {
    if (store.authReducer.user) {
      return store.authReducer.user.role;
    }
    return null;
  });

  const getIcon = (role) => {
    switch (role) {
      case "Super":
        return <FaChessKing className="user-icon super-user-icon" />;
      case "Admin":
        return <FaUserLock className="user-icon admin-user-icon" />;
      case "Normal":
        return <FaUserCog className="user-icon normal-user-icon" />;
      case "View":
        return <FaUser className="user-icon view-user-icon" />;
    }
  };

  if (loggedIn)
    return (
      <>
        <div className="side-panel-container">
          <div className="user-container">
            <div onClick={onProfileClick} className="user-icon-container">
              {getIcon(role)}
            </div>
            <div className="logout-btn-container">
              <button onClick={onLogout} className="logout-btn">
                Logout
              </button>
            </div>
          </div>
          <div className="nav-container">
            <ul className="nav-ul">
              <div
                onClick={() => navigate("/")}
                className="nav-option-container"
              >
                <div>
                  <AiFillHome className="nav-icon" />
                  <p className="nav-paragraph"> Home</p>
                </div>
              </div>
              {role === "Super" && (
                <div
                  onClick={() => navigate("/manage")}
                  className="nav-option-container"
                >
                  <div>
                    <FaUsers className="nav-icon" />
                    <p className="nav-paragraph">Manage Users</p>
                  </div>
                </div>
              )}
            </ul>
          </div>
        </div>
        {isOpen && openBy === "side-panel" && (
          <Modal
            headerText="Are you sure you want to logout?"
            expectedField=""
            isTyped={false}
            parentHandler={handleModalSubmit}
          />
        )}
      </>
    );
}
export default SidePanel;
