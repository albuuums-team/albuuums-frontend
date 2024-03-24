import { FunctionComponent, HTMLAttributes, ReactNode } from "react";

import style from "./video-card.module.css";

interface VideoCardProps {
  src: string;
  label?: ReactNode;
  extraProps?: HTMLAttributes<HTMLDivElement>;
}

const VideoCard: FunctionComponent<VideoCardProps> = (props) => {
  const { src, label, extraProps } = props;

  return (
    <div className={style.card} {...extraProps}>
      <video controls preload="none" src={src} className={style.video}></video>
      <div className={style.label}>{label}</div>
    </div>
  );
};

export default VideoCard;
