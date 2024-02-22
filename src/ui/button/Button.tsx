import { type ReactNode, type FC } from "react";
import clsx from "clsx";
import { ButtonSizes, ButtonVariant } from "./types";
import { buttonSizeClasses, buttonVariantClasses } from "./constants";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  size?: ButtonSizes;
  variant?: ButtonVariant;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  disabled,
  className,
  onClick,
  children,
  variant = "primary",
  size = "large",
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        "btn",
        buttonSizeClasses[size],
        buttonVariantClasses[variant],
        className,
        { [`${buttonVariantClasses[variant]}-disabled`]: disabled }
      )}
    >
      {children}
    </button>
  );
};

export default Button;
