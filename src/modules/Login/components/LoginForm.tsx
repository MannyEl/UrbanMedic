import { type FormEvent, useState } from "react";
import Button from "../../../ui/button/Button";
import Input from "../../../ui/Input";
import { getSignIn } from "../../../store/auth/actions";
import { AppDispatch } from "../../../store/types";
import { useDispatch } from "react-redux";
import { loginFormSchema } from "../utils/schema";

function LoginForm() {
  const [seed, setSeed] = useState<string>("");
  const [error, setError] = useState<string>("");
  const dispatch: AppDispatch = useDispatch();
  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setSeed(e.currentTarget.value);
  };
  const isValidData = () => {
    const { success } = loginFormSchema.safeParse(seed);
    setError(success ? "" : "*Поле заполнено некорректно");
    console.log(loginFormSchema.safeParse(seed));
    return success;
  };
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        isValidData() && (await dispatch(getSignIn({ seed })));
      }}
      className="login-form"
    >
      <div className="login-form__wrapper">
        <h1 className="login-form__title">Добро пожаловать</h1>
        <Input
          value={seed}
          onChange={handleChange}
          name="seed"
          type={"text"}
          label="Seed"
        />
        <div className="error">{error}</div>
        <Button variant={"secondary"} size={"large"} className="w-full my-4">
          Войти
        </Button>
      </div>
    </form>
  );
}

export default LoginForm;
