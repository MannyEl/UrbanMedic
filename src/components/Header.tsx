import { useSelector } from "react-redux";
import Button from "../ui/button/Button";
import { getUserStore } from "../store/auth/selectors";
import { AppDispatch } from "../store/types";
import { useDispatch } from "react-redux";
import userModalSlice from "../store/userFormModal/slice";
import authSlice from "../store/auth/slice";

function Header() {
  const user = useSelector(getUserStore);
  const { title, first, last } = user.results[0].name;
  const FCs = `${title} ${first} ${last}`;

  const dispatch: AppDispatch = useDispatch();

  const handleAddUser = () => {
    dispatch(userModalSlice.actions.setMode("add"));
    dispatch(userModalSlice.actions.showModal());
  };

  const logOut = () => {
    dispatch(authSlice.actions.resetAuth());
  };
  return (
    <header>
      <div className="header-FCs">{FCs}</div>
      <div className="header-actions">
        <Button size="large" onClick={handleAddUser}>
          Добавить пользователя
        </Button>
        <Button variant="grey" size="large" onClick={logOut}>
          Выйти
        </Button>
      </div>
    </header>
  );
}

export default Header;
