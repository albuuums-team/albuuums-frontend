import {
  ButtonHTMLAttributes,
  FunctionComponent,
  MouseEventHandler,
  ReactNode,
} from "react";

import style from "./button.module.css";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode | string;
  className?: string;
  extraProps?: ButtonHTMLAttributes<HTMLButtonElement>;
}

export const Button: FunctionComponent<ButtonProps> = (props) => {
  const { type = "button", onClick, children, className, extraProps } = props;

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${style.button} ${className}`}
      {...extraProps}
    >
      {children}
    </button>
  );
};
