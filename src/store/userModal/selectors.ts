import { RootState } from "../types";

export const isUserModalOpen = (state: RootState) => state.userModal.isOpen;
export const isUserModalAnimate = (state: RootState) =>
  state.userModal.isAnimate;
export const getUserModalMode = (state: RootState) => state.userModal.mode;
