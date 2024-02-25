import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import * as T from "./types";
import * as actions from "./actions";
import { IUser } from "../../types/IUser";
import { uid } from "uid";
import { getFromLocalStorage, setToLocalStorage } from "../../utils/seed";
import {
  addUserToLocalStorage,
  removeUserFromLocalStorage,
  updateUserToLocalStorage,
} from "./helpers";

const initialState: T.State = {
  isFetching: false,
  users: {
    info: {
      page: 1,
      seed: "",
    },
    results: [],
  },
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    resetUsers: (state) => {
      state.users.results = [];
      state.users.info = { page: 1, seed: "" };
    },
    addUsersFromLocalstorage: (state) => {
      const users: IUser[] = JSON.parse(getFromLocalStorage("users") || "[]");
      state.users.results.unshift(...users);
    },
    addUser: (state, action: PayloadAction<IUser>) => {
      const id = uid();
      state.users.results.unshift({ ...action.payload, id });
      addUserToLocalStorage({ payload: action.payload, id: id });
    },
    editUser: (state, action: PayloadAction<IUser>) => {
      updateUserToLocalStorage(action.payload);
      state.users.results = state.users.results.map((user) =>
        user.id === action.payload.id ? action.payload : user
      );
    },
    removeUser: (state, action: PayloadAction<string | undefined>) => {
      state.users.results = state.users.results.filter(
        (user) => user.id !== action.payload
      );
      removeUserFromLocalStorage(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        actions.getUsers.fulfilled,
        (state, action: PayloadAction<T.UsersPayload>) => {
          setToLocalStorage({
            key: "seed",
            value: action.payload.info.seed,
          });
          state.users.info.page = action.payload.info.page;
          state.users.results.push(...action.payload.results);
          state.isFetching = false;
        }
      )
      .addCase(actions.getUsers.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(actions.getUsers.rejected, (state) => {
        state.isFetching = false;
        //some error handler
      });
  },
});

export default usersSlice;
