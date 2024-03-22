import { forwardRef, MouseEventHandler } from "react";
import style from "./avatar.module.css";

import Image, { StaticImageData } from "next/image";

type AvatarSize = "s" | "l";

interface AvatarProps {
  src: string | StaticImageData;
  alt?: string;
  size?: AvatarSize;
  onClick?: MouseEventHandler<HTMLDivElement>;
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

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(function Avatar(
  props,
  ref
) {
  const { src, alt = "avatar", size = "s", onClick = () => {} } = props;

  const avatarSize = getAvatarSize(size);

  const imgSize = avatarSize - 10;

  return (
    <div
      className={style.avatar}
      style={{ width: avatarSize, height: avatarSize }}
      onClick={onClick}
      ref={ref}
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
});
