import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { resetAuth, registerUser } from "../features/auth/authSlice";
import GoBack from "../components/GoBack";

const RegisterUser = () => {
  const dispatch = useDispatch();

  const [role, setRole] = useState("View");
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [confirmationPassword, setConfirmationPassword] = useState("");

  const { email, password } = userData;

  const { isSuccess, isError, isLoading, message } = useSelector(
    (store) => store.authReducer
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success(message);
      clearForm();
    }
    dispatch(resetAuth());
  }, [isError, isLoading, isSuccess, message, dispatch]);

  const onChange = (e) => {
    setUserData((prevUserData) => {
      return { ...prevUserData, [e.target.name]: e.target.value };
    });
  };

  const onConfirmationPasswordChange = (e) => {
    setConfirmationPassword(e.target.value);
  };

  const onRoleChange = (e) => {
    setRole(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (confirmationPassword === password) {
      dispatch(registerUser({ ...userData, role }));
    } else {
      toast.error("Password don't match");
    }
  };

  const clearForm = () => {
    setRole("View");
    setUserData({ email: "", password: "" });
    setConfirmationPassword("");
  };

  return (
    <div className="registerUser-container">
      <GoBack url="/manage" />
      <form onSubmit={onSubmit} className="registerUser-form-container">
        <div className="registerUser-form-p">
          <p>Register User</p>
        </div>
        <input
          type="email"
          className="form-control"
          name="email"
          value={email}
          id="email"
          onChange={onChange}
          placeholder="Enter Email"
          required
        />
        <input
          type="password"
          className="form-control"
          name="password"
          value={password}
          id="password"
          onChange={onChange}
          placeholder="Enter Password"
          required
        />
        <input
          type="password"
          className="form-control"
          name="confirmationPassword"
          value={confirmationPassword}
          id="confirmationPassword"
          onChange={onConfirmationPasswordChange}
          placeholder="Confirm Password"
          required
        />
        <div className="registerUser-form-select-label-container">
          <label className="registerUser-form-select-label" htmlFor="select">
            Select a role
          </label>
        </div>
        <select
          className="registerUser-form-select"
          name="role"
          value={role}
          onChange={onRoleChange}
        >
          <option value="View">View</option>
          <option value="Normal">Normal</option>
          <option value="Admin">Admin</option>
        </select>
        <button className="submit-btn">Register</button>
      </form>
    </div>
  );
};

export default RegisterUser;
