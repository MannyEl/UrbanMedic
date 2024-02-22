import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "./routes";
import { useDispatch, useSelector } from "react-redux";
import { getIsAuth, isFetchingAuth } from "../store/auth/selectors";
import { getFromLocalStorage } from "../utils/seed";
import { AppDispatch } from "../store/types";
import { getSignIn } from "../store/auth/actions";
import { useEffect } from "react";

const PrivateRoute = () => {
  const isAuth = useSelector(getIsAuth);
  const seed = getFromLocalStorage("seed");
  const dispatch: AppDispatch = useDispatch();
  const isLoading = useSelector(isFetchingAuth);

  useEffect(() => {
    const signIn = async () => {
      if (seed) await dispatch(getSignIn({ seed }));
    };
    signIn();
  }, []);

  if (isLoading) {
    return <div className="loader">Loading</div>;
  }
  if (isAuth) {
    return <Outlet />;
  }

  return <Navigate to={ROUTES.LOGIN} />;
};

export default PrivateRoute;
