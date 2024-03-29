"use client";

import {
  FunctionComponent,
  HTMLAttributes,
  ReactNode,
  RefObject,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";

import style from "./popup.module.css";

interface PopupProps {
  isVisible: boolean;
  anchorRef: RefObject<Element>;
  onClose: () => void;
  children: ReactNode;
  extraProps?: HTMLAttributes<HTMLElement>;
}

export const Popup: FunctionComponent<PopupProps> = (props) => {
  const { isVisible, anchorRef, onClose, children, extraProps } = props;

  const [clientRect, setClientRect] = useState<DOMRect | null>(null);

  const currAnchor = anchorRef.current;

  useEffect(() => {
    if (currAnchor) {
      const clientRect = currAnchor.getBoundingClientRect();

      setClientRect(clientRect);
    }
  }, [currAnchor]);

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

  return (
    clientRect &&
    createPortal(
      <div className={style.overlay} onClick={onClose}>
        <div
          className={style.popup}
          {...extraProps}
          style={{
            right: window.innerWidth - clientRect.right,
            top: clientRect.top + clientRect.height + 20,
            ...extraProps?.style,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>,
      document.body
    )
  );
};
