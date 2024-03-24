"use client";

import { FunctionComponent, HTMLAttributes, ReactNode, useEffect } from "react";

import style from "./dialog.module.css";
import { createPortal } from "react-dom";

import { IoCloseOutline } from "react-icons/io5";

interface DialogProps {
  isVisible: boolean;
  title?: string;
  onClose: () => void;
  children?: ReactNode;
  actions?: ReactNode;
  extraProps?: HTMLAttributes<HTMLElement>;
}

export const Dialog: FunctionComponent<DialogProps> = (props) => {
  const { isVisible, title, onClose, children, actions, extraProps } = props;

  useEffect(() => {
    const handleScroll = () => {
      onClose();
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [onClose]);

  if (!isVisible) {
    return null;
  }

  return createPortal(
    <div className={style.overlay} onClick={onClose}>
      <div
        className={style.dialog}
        onClick={(e) => e.stopPropagation()}
        {...extraProps}
      >
        <div className={style.header}>
          <span className={style.title}>{title}</span>
          <div className={style.actions}>
            {actions}
            <IoCloseOutline
              onClick={onClose}
              fontSize={"40px"}
            ></IoCloseOutline>
          </div>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
};
