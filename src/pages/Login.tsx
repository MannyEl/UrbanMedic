import { useNavigate } from "react-router-dom";
import LoginForm from "../modules/Login/components/LoginForm";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getIsAuth } from "../store/auth/selectors";
import { getFromLocalStorage } from "../utils/seed";

function Login() {
  const isAuth = useSelector(getIsAuth);
  const seed = getFromLocalStorage("seed");
  const navigate = useNavigate();
  useEffect(() => {
    if (seed) {
      navigate("/dashboard");
    }
  }, [isAuth, navigate]);
  return <LoginForm />;
}

export default Login;
