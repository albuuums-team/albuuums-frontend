import { FunctionComponent, ReactNode } from "react";

import style from "./gallery.module.css";

interface GalleryProps {
  children: ReactNode;
}

export const Gallery: FunctionComponent<GalleryProps> = (props) => {
  const { children } = props;

  return <div className={style.gallery}>{children}</div>;
};
