import { FunctionComponent, HTMLAttributes, ReactNode } from "react";

import style from "./dialog.module.css";
import { createPortal } from "react-dom";

import { IoCloseOutline } from "react-icons/io5";

interface DialogProps {
  isVisible: boolean;
  title?: string;
  onClose: () => void;
  children?: ReactNode;
  extraProps?: HTMLAttributes<HTMLElement>;
}

export const Dialog: FunctionComponent<DialogProps> = (props) => {
  const { isVisible, title, onClose, children, extraProps } = props;

  if (!isVisible) {
    return null;
  }

  return (
    isVisible &&
    createPortal(
      <div className={style.overlay} onClick={onClose}>
        <div
          className={style.dialog}
          onClick={(e) => e.stopPropagation()}
          {...extraProps}
        >
          <div className={style.header}>
            <span className={style.title}>{title}</span>
            <IoCloseOutline
              onClick={onClose}
              fontSize={"40px"}
            ></IoCloseOutline>
          </div>
          {children}
        </div>
      </div>,
      document.body
    )
  );
};
