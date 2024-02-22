import { createSlice } from "@reduxjs/toolkit";
import * as T from "./types";
import * as actions from "./actions";
import { setToLocalStorage } from "../../utils/seed";

const initialState: T.State = {
  isFetching: false,
  isAuth: false,
  user: {
    info: {
      seed: "",
    },
    results: [],
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuth(state) {
      state.isAuth = false;
      state.user = initialState.user;
      setToLocalStorage({ key: "seed", value: "" });
      setToLocalStorage({ key: "users", value: "" });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(actions.getSignIn.fulfilled, (state, { payload }: any) => {
        setToLocalStorage({ key: "seed", value: payload.info.seed });
        Object.assign(state.user, payload);
        state.isAuth = true;
        state.isFetching = false;
      })
      .addCase(actions.getSignIn.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(actions.getSignIn.rejected, (state) => {
        state.isFetching = false;
        //some error handler
      });
  },
});

export default authSlice;
