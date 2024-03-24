import { FunctionComponent, HTMLAttributes, ReactNode } from "react";

import style from "./video-card.module.css";

interface VideoCardProps {
  src: string;
  label?: ReactNode;
  extraProps?: HTMLAttributes<HTMLDivElement>;
  onClick: () => void;
}

export const VideoCard: FunctionComponent<VideoCardProps> = (props) => {
  const { src, label, extraProps, onClick } = props;

  return (
    <div className={style.card} {...extraProps} onClick={onClick}>
      <video controls preload="none" src={src} className={style.video}></video>
      <div className={style.label}>{label}</div>
    </div>
  );
};
