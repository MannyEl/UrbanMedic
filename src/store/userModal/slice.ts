import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import * as T from "./types";

const initialState: T.State = {
  isOpen: false,
  isAnimate: false,
  mode: "add",
};

const userModalSlice = createSlice({
  name: "userModal",
  initialState,
  reducers: {
    showModal: (state) => {
      state.isOpen = true;
      state.isAnimate = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.isAnimate = false;
    },
    setMode: (state, action: PayloadAction<"edit" | "add">) => {
      state.mode = action.payload;
    },
  },
});

export default userModalSlice;
