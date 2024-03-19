import { FunctionComponent } from "react";
import style from "./avatar.module.css";

import Image from "next/image";

type AvatarSize = "s" | "l";

interface AvatarProps {
  src: string;
  alt?: string;
  size?: AvatarSize;
}

const getAvatarSize = (size: AvatarSize) => {
  switch (size) {
    case "l":
      return 52;
    case "s":
      return 40;
    default:
      return 40;
  }
};

export const Avatar: FunctionComponent<AvatarProps> = (props) => {
  const { src, alt = "avatar", size = "s" } = props;

  const avatarSize = getAvatarSize(size);

  const imgSize = avatarSize - 10;

  return (
    <div
      className={style.avatar}
      style={{ width: avatarSize, height: avatarSize }}
    >
      <Image
        src={src}
        className={style.img}
        alt={alt}
        width={imgSize}
        height={imgSize}
      ></Image>
    </div>
  );
};
