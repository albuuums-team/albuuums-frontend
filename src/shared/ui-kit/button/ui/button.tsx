import {
  ButtonHTMLAttributes,
  forwardRef,
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
  extraClasses: string[] = []
) => {
  const currClasses: string[] = [];

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

  for (const extraClass of extraClasses) {
    currClasses.push(extraClass);
  }

  return currClasses.join(" ");
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    const {
      view = "default",
      type = "button",
      width = "auto",
      onClick,
      children,
      classes = [],
      extraProps,
    } = props;

    return (
      <button
        type={type}
        onClick={onClick}
        className={getButtonClasses(view, width, classes)}
        {...extraProps}
        ref={ref}
      >
        {children}
      </button>
    );
  }
);
