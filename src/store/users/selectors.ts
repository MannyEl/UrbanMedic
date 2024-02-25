import { RootState } from "../types";

export const getCurrentUsersPage = (state: RootState) =>
  state.users.users.info.page;
export const getUsersStore = (state: RootState) => state.users.users;
export const isFetchingUsers = (state: RootState) => state.users.isFetching;
