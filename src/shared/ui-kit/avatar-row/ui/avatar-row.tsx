import { FunctionComponent, ReactNode } from "react";

import style from "./avatar-row.module.css";

interface AvatarRowProps {
  children: ReactNode[];
  max?: number;
}

export const AvatarRow: FunctionComponent<AvatarRowProps> = (props) => {
  const { children, max = children.length } = props;

  const maxWithoutFloat = Math.ceil(max / 1);

  const maxAvatars = maxWithoutFloat > 0 ? maxWithoutFloat : 2;

  if (children.length > maxAvatars) {
    return (
      <div className={style["avatar-row"]}>{children.slice(0, maxAvatars)}</div>
    );
  }

  return <div className={style["avatar-row"]}>{children}</div>;
};
