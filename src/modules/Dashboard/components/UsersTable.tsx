import Button from "../../../ui/button/Button";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersStore, isFetchingUsers } from "../../../store/users/selectors";
import { IUser } from "../../../types/IUser";
import { AppDispatch } from "../../../store/types";
import { getUsers } from "../../../store/users/actions";
import userModalSlice from "../../../store/userModal/slice";
import { isUserModalOpen } from "../../../store/userModal/selectors";
import { headerUsersColumns } from "../utils/constants";
import usersSlice from "../../../store/users/slice";
import UserFormModal from "./UserFormModal";

const UsersTable = () => {
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<IUser>();
  const usersContinaerRef = useRef<HTMLDivElement>();

  const users = useSelector(getUsersStore);
  const isLoading = useSelector(isFetchingUsers);
  const dispatch: AppDispatch = useDispatch();

  const isUserFormOpen = useSelector(isUserModalOpen);

  const handleScroll = () => {
    if (usersContinaerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        usersContinaerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        setPage((prev) => prev + 1);
      }
    }
  };

  const handleEdit = (row: IUser) => {
    setSelectedUser(row);
    dispatch(userModalSlice.actions.showModal());
    dispatch(userModalSlice.actions.setMode("edit"));
  };
  useEffect(() => {
    if (users.results.length === 0 && !isLoading) dispatch(getUsers(page));
    if (!isLoading && page !== 1) {
      dispatch(getUsers(page));
    }
  }, [page]);
  useEffect(() => {
    dispatch(usersSlice.actions.addUsersFromLocalstorage());
    return () => {
      dispatch(usersSlice.actions.resetUsers());
    };
  }, []);
  return (
    <div
      ref={usersContinaerRef}
      className="users-continer"
      onScroll={handleScroll}
    >
      <table cellSpacing="0" cellPadding="0">
        <thead>
          <tr>
            {headerUsersColumns.map((header) => (
              <th key={header.key}>{header.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.results.map((row: IUser, i) => (
            <tr key={i + row.email}>
              <td>{++i}</td>
              <td>{row.name.last}</td>
              <td>{row.name.first}</td>
              <td>{row.gender}</td>
              <td>{row.email}</td>
              <td>
                <Button
                  disabled={row.id ? false : true}
                  className="rounded-full"
                  size="small"
                  onClick={() => handleEdit(row)}
                >
                  Редактировать
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isLoading && <div>Loading...</div>}
      {isUserFormOpen && (
        <UserFormModal
          setSelectedUser={setSelectedUser}
          selectedUser={selectedUser}
        />
      )}
    </div>
  );
};

export default UsersTable;
