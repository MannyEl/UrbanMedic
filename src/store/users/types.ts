import { IUser } from "../../types/IUser";

export interface State {
  isFetching: boolean;
  users: {
    info: {
      seed: string;
    };
    results: IUser[];
  };
}

export interface UsersPayload {
  info: {
    seed: string;
  };
  results: IUser[];
}
