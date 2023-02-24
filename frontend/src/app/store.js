import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"; // this is in authSlice.reducer
import modalReducer from "../features/modal/modalSlice";

export const store = configureStore({
  reducer: {
    authReducer,
    modalReducer,
  },
});
