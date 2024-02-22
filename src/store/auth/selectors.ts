import { RootState } from "./../types";

export const getIsAuth = (state: RootState) => state.auth.isAuth;
export const isFetchingAuth = (state: RootState) => state.auth.isFetching;
export const getUserStore = (state: RootState) => state.auth.user;
