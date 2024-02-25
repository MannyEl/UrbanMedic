import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/types";
import Button from "../../../ui/button/Button";
import usersSlice from "../../../store/users/slice";
import {
  useState,
  type FormEvent,
  type FC,
  type Dispatch,
  type SetStateAction,
  useEffect,
} from "react";
import Input from "../../../ui/Input";
import { IUser } from "../../../types/IUser";
import { userFormSchema } from "../utils/schema";
import TrashIcon from "../../../asssets/icons/TrashIcon";
import CloseIcon from "../../../asssets/icons/CloseIcon";
import { useSelector } from "react-redux";
import { getUserModalMode } from "../../../store/userFormModal/selectors";
import userModalSlice from "../../../store/userFormModal/slice";
import { initialUser } from "../utils/constants";
import clsx from "clsx";

interface UserFormProps {
  selectedUser?: IUser;
  setSelectedUser?: Dispatch<SetStateAction<IUser | undefined>>;
}

const UserFormModal: FC<UserFormProps> = ({
  selectedUser,
  setSelectedUser,
}) => {
  const [error, setError] = useState("");
  const [user, setUser] = useState<IUser>(selectedUser || initialUser);
  const [isAnimate, setIsAnimate] = useState(false);

  const dispatch: AppDispatch = useDispatch();

  const mode = useSelector(getUserModalMode);

  const isValidData = () => {
    const { success } = userFormSchema.safeParse(user);
    setError(success ? "" : "*Некоторые поля заполнены некорректно");
    return success;
  };

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    if (name.includes("_")) {
      const [, fieldName] = name.split("_");
      setUser({
        ...user,
        name: {
          ...user.name,
          [fieldName]: value,
        },
      });
    }
    if (!name.includes("_")) {
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    }
  };

  const handleSubmit = () => {
    if (isValidData()) {
      if (mode === "add") dispatch(usersSlice.actions.addUser(user));
      if (mode === "edit") dispatch(usersSlice.actions.editUser(user));
      closeModal();
    }
  };
  const handleDelete = () => {
    closeModal();
    dispatch(usersSlice.actions.removeUser(user.id));
  };
  const closeModal = () => {
    setIsAnimate(false);
    setTimeout(() => dispatch(userModalSlice.actions.closeModal()), 333);
    setSelectedUser && setSelectedUser(initialUser);
  };
  useEffect(() => {
    setIsAnimate(true);
  }, []);
  return (
    <>
      <div
        className={clsx("modal-backdrop", {
          ["showModal-backdrop"]: isAnimate,
        })}
      />
      <div className="modal-wrapper">
        <div className={clsx("modal", { ["showModal"]: isAnimate })}>
          <div className="modal-header">
            <span className="modal-title">Новый пользователь</span>
            <button className="close-modal button-reset" onClick={closeModal}>
              <CloseIcon />
            </button>
          </div>
          <div className="user-form">
            <div className="radio-wrapper">
              <input
                onChange={handleInputChange}
                type="radio"
                name="gender"
                id="male"
                value="male"
                checked={user.gender === "male"}
              />
              <input
                onChange={handleInputChange}
                type="radio"
                name="gender"
                id="female"
                value="female"
                checked={user.gender === "female"}
              />
              <div className="radio-container">
                <label
                  htmlFor="male"
                  className={clsx("radio-label", {
                    ["radio-label__active"]: user.gender === "male",
                  })}
                >
                  <span>Мужчина</span>
                </label>
                <label
                  htmlFor="female"
                  className={clsx("radio-label", {
                    ["radio-label__active"]: user.gender === "female",
                  })}
                >
                  <span>Женщина</span>
                </label>
              </div>
            </div>
            <Input
              label="Фамилия"
              name="name_last"
              value={user.name.last}
              onChange={(e) => handleInputChange(e)}
              required
            />
            <Input
              label="Имя"
              name="name_first"
              value={user.name.first}
              onChange={(e) => handleInputChange(e)}
              required
            />
            <Input
              label="Email"
              type="email"
              name="email"
              value={user.email}
              onChange={(e) => handleInputChange(e)}
              required
            />
            <div className="error">{error}</div>
            <div className="user-form__actions">
              {mode === "edit" && (
                <button
                  onClick={handleDelete}
                  className="button-delete button-reset"
                >
                  <TrashIcon />
                </button>
              )}
              <Button className="w-full" size="large" onClick={handleSubmit}>
                Сохранить
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserFormModal;
