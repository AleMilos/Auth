import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { deleteUser, resetAuth } from "../features/auth/authSlice";
import GoBack from "../components/GoBack";
import Modal from "../components/Modal";
import { openModal } from "../features/modal/modalSlice";

const DeleteUser = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const { isSuccess, isError, isLoading, message } = useSelector(
    (store) => store.authReducer
  );

  const { isOpen, openBy } = useSelector((store) => store.modalReducer);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success(message);
      setEmail("");
    }
    dispatch(resetAuth());
  }, [isError, isLoading, isSuccess, message, dispatch]);

  const onChange = (e) => {
    setEmail(e.target.value);
  };

  const handleModalSubmit = (modalConfirmed) => {
    if (modalConfirmed) {
      dispatch(deleteUser(email));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(openModal("delete-user"));
  };

  return (
    <div className="deleteUser-container">
      <GoBack url="/manage" />
      <form onSubmit={onSubmit} className="deleteUser-form-container">
        <div className="deleteUser-form-p">
          <p>Delete User</p>
        </div>
        <input
          type="email"
          className="form-control "
          name="email"
          id="email"
          value={email}
          onChange={onChange}
          placeholder="Enter Email"
          required
        />
        <button className="submit-btn delete-btn">Delete</button>
        {isOpen && openBy === "delete-user" && (
          <Modal
            expectedField="delete"
            isTyped={true}
            parentHandler={handleModalSubmit}
          />
        )}
      </form>
    </div>
  );
};

export default DeleteUser;
