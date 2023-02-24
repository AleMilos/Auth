import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import GoBack from "../components/GoBack";
import { TbArrowBackUp } from "react-icons/tb";
import { updatePassword, resetAuth } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isSuccess, isLoading, isError, message } = useSelector(
    (store) => store.authReducer
  );

  const [enabledChange, setEnabledChange] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [confirmationPassword, setConfirmationPassword] = useState("");

  const { currentPassword, newPassword } = formData;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success("Password Changed");
      clearForm();
    }
    dispatch(resetAuth());
  }, [isError, isLoading, isSuccess, message, dispatch]);

  const onClick = () => {
    setEnabledChange(true);
  };

  const onChange = (e) => {
    setFormData((prevFormData) => {
      return { ...prevFormData, [e.target.name]: e.target.value };
    });
  };

  const onConfirmationPasswordChange = (e) => {
    setConfirmationPassword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (confirmationPassword === newPassword) {
      dispatch(updatePassword(formData));
    } else {
      toast.error("Password don't match");
    }
  };

  const clearForm = () => {
    setConfirmationPassword("");
    setFormData({ currentPassword: "", newPassword: "" });
  };

  return (
    <div className="profile-container">
      {!enabledChange && <GoBack url="/" />}
      {enabledChange && (
        <div className="goBack-container">
          <button
            onClick={() => setEnabledChange(false)}
            className="goBack-btn"
          >
            <TbArrowBackUp className="goBack-icon" /> Go Back
          </button>
        </div>
      )}
      <div className="profile-window">
        <div className="change-password-container">
          {!enabledChange && (
            <>
              <div className="info-container">
                <h1>Profile Informations</h1>
                <p className="email-text">Email: {user ? user.email : ""}</p>
              </div>
              <button onClick={onClick} className="submit-btn">
                Change Password
              </button>
            </>
          )}
          {enabledChange && (
            <>
              <div className="info-container">
                <h1>Change Your Password</h1>
              </div>
              <form onSubmit={onSubmit} className="form-container">
                <input
                  type="password"
                  className="form-control"
                  name="currentPassword"
                  value={currentPassword}
                  id="currentPassword"
                  onChange={onChange}
                  placeholder="Enter Current Password"
                  required
                />
                <input
                  type="password"
                  className="form-control"
                  name="newPassword"
                  value={newPassword}
                  id="newPassword"
                  onChange={onChange}
                  placeholder="Enter New Password"
                  required
                />
                <input
                  type="password"
                  className="form-control"
                  name="confirmationPassword"
                  value={confirmationPassword}
                  id="confirmationPassword"
                  onChange={onConfirmationPasswordChange}
                  placeholder="Confirm New Password"
                  required
                />
                <button className="submit-btn">Confirm</button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
