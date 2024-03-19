import {
  ButtonHTMLAttributes,
  FunctionComponent,
  MouseEventHandler,
  ReactNode,
} from "react";

import style from "./button.module.css";

type ButtonView = "default" | "outlined" | "default-contrast";
type ButtonWidth = "max" | "auto";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  view?: ButtonView;
  width?: ButtonWidth;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode | string;
  classes?: string[];
  extraProps?: ButtonHTMLAttributes<HTMLButtonElement>;
}

const getButtonClasses = (
  view: ButtonView,
  width: ButtonWidth,
  classes: string[] = []
) => {
  const currClasses: string[] = [];

  currClasses.concat(classes);

  if (view === "outlined") {
    currClasses.push(style["button_outlined"]);
  }

  if (view === "default-contrast") {
    currClasses.push(style["button_default-contrast"]);
  }

  if (width === "max") {
    currClasses.push(style["button_max"]);
  }

  currClasses.push(style.button);

  return currClasses.join(" ");
};

export const Button: FunctionComponent<ButtonProps> = (props) => {
  const {
    view = "default",
    type = "button",
    width = "auto",
    onClick,
    children,
    classes = [],
    extraProps,
  } = props;

  console.log(getButtonClasses(view, width, classes));

  return (
    <button
      type={type}
      onClick={onClick}
      className={getButtonClasses(view, width, classes)}
      {...extraProps}
    >
      {children}
    </button>
  );
};
