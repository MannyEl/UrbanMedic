import { IUser } from "../../types/IUser";
import { getFromLocalStorage, setToLocalStorage } from "../../utils/seed";

interface addUserToLocalStorageProps {
  payload: IUser;
  id: string;
}

export const removeUserFromLocalStorage = (id: string) => {
  const users: IUser[] = JSON.parse(getFromLocalStorage("users") || "[]");
  const updatedUsers = users.filter((user) => user.id !== id);
  setToLocalStorage({
    key: "users",
    value: JSON.stringify(updatedUsers),
  });
};

export const updateUserToLocalStorage = (payload: IUser) => {
  const users: IUser[] = JSON.parse(getFromLocalStorage("users") || "[]");
  const updatedUsers = users.map((user) =>
    user.id === payload.id ? payload : user
  );
  setToLocalStorage({
    key: "users",
    value: JSON.stringify(updatedUsers),
  });
};

export const addUserToLocalStorage = ({
  payload,
  id,
}: addUserToLocalStorageProps) => {
  const users: IUser[] = JSON.parse(getFromLocalStorage("users") || "[]");
  setToLocalStorage({
    key: "users",
    value: JSON.stringify([...users, { ...payload, id }]),
  });
};
