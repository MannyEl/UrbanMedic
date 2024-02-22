import { IUser } from "../../types/IUser";

export interface State {
  isFetching: boolean;
  isAuth: boolean;
  user: {
    info: {
      seed: string;
    };
    results: IUser[];
  };
}

export interface Auth {
  seed: string;
}
