import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { closeModal } from "../features/modal/modalSlice";

const Modal = ({ headerText, expectedField, isTyped, parentHandler }) => {
  const dispatch = useDispatch();
  const [inputField, setInputField] = useState("");

  const onChange = (e) => {
    setInputField(e.target.value);
  };

  const onConfirm = () => {
    if (!isTyped) {
      dispatch(closeModal());
      parentHandler(true);
    } else if (expectedField === inputField) {
      dispatch(closeModal());
      parentHandler(true);
    } else {
      toast.error(`Type ${expectedField} correctly!`);
    }
  };
  const onUndo = () => {
    dispatch(closeModal());
    parentHandler(false);
  };

  return (
    <div className="modal">
      <div className="overlay"></div>
      <div className="modal-container">
        {!isTyped && (
          <div className="modal-header">
            <p>{headerText}</p>
          </div>
        )}
        {isTyped && (
          <div className="modal-form-container">
            <div className="modal-header">
              <p>Type "{expectedField}" without quotes</p>
            </div>
            <input
              type="text"
              className="form-control modal-form-control"
              name="inputField"
              value={inputField}
              id="inputField"
              onChange={onChange}
              placeholder={expectedField}
              required
            />
          </div>
        )}
        <div className="buttons-container">
          <button onClick={onConfirm} className="modal-btn">
            Confirm
          </button>
          <button onClick={onUndo} className="modal-btn">
            Undo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
