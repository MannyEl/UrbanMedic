import {
  type ReactNode,
  type FC,
  memo,
  type HTMLInputTypeAttribute,
  type FormEvent,
} from "react";
import clsx from "clsx";
import { UseFocusProps, useFocus } from "../hooks/useFocus";

interface InputProps {
  label: string;
  name: string;
  onChange: (e: FormEvent<HTMLInputElement>) => void;
  value: string;
  type?: HTMLInputTypeAttribute;
  required?: boolean;
}

const Input: FC<InputProps> = ({
  label,
  name,
  value,
  onChange,
  required,
  type = "text",
}) => {
  const [isFocused, actions] = useFocus();
  const handlers = actions as UseFocusProps;

  return (
    <div className="input-wrapper" onClick={handlers.onFocus}>
      <label
        className={clsx("label", (isFocused || value) && "label__focused")}
      >
        {label}
        {required ? "*" : ""}
      </label>
      <input
        value={value}
        onChange={onChange}
        name={name}
        type={type}
        onBlur={handlers.onBlur}
        autoComplete="off"
        placeholder={""}
        className={clsx("input")}
      />
    </div>
  );
};

export default memo(Input);
