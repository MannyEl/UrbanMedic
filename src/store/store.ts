import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/slice";
import usersSlice from "./users/slice";
import userModalSlice from "./userFormModal/slice";

const store = configureStore({
  reducer: {
    userModal: userModalSlice.reducer,
    auth: authSlice.reducer,
    users: usersSlice.reducer,
  },

  middleware: (getDefaultMiddleware) => {
    const options = {
      thunk: true,
      immutableCheck: false,
      serializableCheck: false,
    };

    return getDefaultMiddleware(options);
  },
  preloadedState: {},
});

export default store;
