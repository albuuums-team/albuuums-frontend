import { FunctionComponent, HTMLAttributes, ReactNode } from "react";

import Image from "next/image";

import style from "./photo-card.module.css";

interface PhotoCardProps {
  src: string;
  alt?: string;
  label?: ReactNode;
  extraProps?: HTMLAttributes<HTMLDivElement>;
}

export const PhotoCard: FunctionComponent<PhotoCardProps> = (props) => {
  const { src, alt = "photo-card", label, extraProps } = props;

  return (
    <div className={style["photo-card"]} {...extraProps}>
      <Image src={src} className={style.photo} alt={alt} fill></Image>
      <div className={style.label}>{label}</div>
    </div>
  );
};
