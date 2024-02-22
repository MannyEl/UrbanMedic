import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api";
import { getFromLocalStorage } from "../../utils/seed";

export const getUsers = createAsyncThunk(
  "users/GET_USERS",
  async (page: number) => {
    try {
      const seed = getFromLocalStorage("seed");
      const res = await api(
        `?page=${page}&results=20&seed=${seed}&inc=gender,name,email`
      );
      return res.data;
    } catch (err) {}
  }
);
