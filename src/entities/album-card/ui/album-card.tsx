import { FunctionComponent, HTMLAttributes } from "react";

import style from "./album-card.module.css";

interface AlbumCardProps {
  name: string;
  extraProps?: HTMLAttributes<HTMLDivElement>;
}

export const AlbumCard: FunctionComponent<AlbumCardProps> = (props) => {
  const { name, extraProps } = props;

  return (
    <div className={style.card} {...extraProps}>
      <span>{name}</span>
    </div>
  );
};
