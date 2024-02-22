export interface IUser {
  name: {
    title?: string;
    first: string;
    last: string;
  };
  email: string;
  gender: string;
  id?: string;
}
