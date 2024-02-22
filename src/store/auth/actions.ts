import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api";
import * as T from "./types";

export const getSignIn = createAsyncThunk<
  undefined,
  T.Auth,
  { rejectValue: string }
>("auth/SIGN_IN", async ({ seed }, { rejectWithValue }) => {
  try {
    const res = await api(`?seed=${seed}&inc=gender,name,email`);
    return res.data;
  } catch (err) {}
});
