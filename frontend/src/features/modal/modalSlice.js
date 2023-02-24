import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isOpen: false,
  openBy: "",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.openBy = action.payload;
    },
    closeModal: (state, action) => {
      state.isOpen = false;
      state.openBy = "";
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
