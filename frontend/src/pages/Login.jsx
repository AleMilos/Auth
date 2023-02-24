import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, resetAuth, updatePassword } from "../features/auth/authSlice";

function Login() {
  const [userData, setUserData] = useState({ email: "", password: "" });

  const { email, password } = userData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isSuccess, isError, isLoading, message } = useSelector(
    (store) => store.authReducer
  );

  const canToastSuccess = useRef(true);

  useEffect(() => {
    if (isError) {
      toast.error(message);
      setUserData((prevUserData) => {
        return { ...prevUserData, password: "" };
      });
    }
    if (isSuccess || user) {
      if (canToastSuccess.current) {
        canToastSuccess.current = false;
        toast.success("Logged In");
        navigate("/");
      }
    }
    dispatch(resetAuth());
  }, [isSuccess, isError, isLoading, message, navigate, dispatch]);

  const onChange = (e) => {
    setUserData((prevUserData) => {
      return { ...prevUserData, [e.target.name]: e.target.value };
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userData));
  };

  return (
    <div className="login-container">
      <form onSubmit={onSubmit} className="login-form-container">
        <div className="login-form-p">
          <p>Insert Credentials</p>
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
        <button className="submit-btn">Login</button>
      </form>
    </div>
  );
}

export default Login;
