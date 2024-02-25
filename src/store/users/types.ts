import { IUser } from "../../types/IUser";

export interface State {
  isFetching: boolean;
  users: {
    info: {
      page: number;
      seed: string;
    };
    results: IUser[];
  };
}

export interface UsersPayload {
  info: {
    page: number;
    seed: string;
  };
  results: IUser[];
}
