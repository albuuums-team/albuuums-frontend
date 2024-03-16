import { FunctionComponent } from "react";
import style from "./avatar.module.css";

import Image from "next/image";

type AvatarSize = "s" | "m" | "l";

interface AvatarProps {
  src: string;
  alt?: string;
  size?: AvatarSize;
}

const getAvatarSize = (size: AvatarSize) => {
  switch (size) {
    case "l":
      return 45;
    case "m":
      return 35;
    case "s":
      return 23;
    default:
      return 35;
  }
};

export const Avatar: FunctionComponent<AvatarProps> = (props) => {
  const { src, alt = "avatar", size = "m" } = props;

  const currSize = getAvatarSize(size);

  return (
    <Image
      src={src}
      className={style.avatar}
      alt={alt}
      width={currSize}
      height={currSize}
    ></Image>
  );
};
