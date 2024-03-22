import { Avatar } from "@/shared/ui-kit/avatar";
import { Button } from "@/shared/ui-kit/button";
import { Popup } from "@/shared/ui-kit/popup";
import { signOut, useSession } from "next-auth/react";
import { FunctionComponent, HTMLAttributes, RefObject } from "react";

import style from "./profile-popup.module.css";

import AvatarIcon from "@/shared/assets/icons/avatar.png";
import Link from "next/link";

import { CgProfile } from "react-icons/cg";
import { IoExitOutline } from "react-icons/io5";

interface ProfilePopupProps {
  isVisible: boolean;
  anchorRef: RefObject<Element>;
  onClose: () => void;
  extraProps?: HTMLAttributes<HTMLElement>;
}

export const ProfilePopup: FunctionComponent<ProfilePopupProps> = (props) => {
  const { isVisible, anchorRef, onClose, extraProps } = props;

  const session = useSession();

  const userAvatarSrc = session.data?.user?.image ?? AvatarIcon;
  const userName = session.data?.user?.name;

  return (
    <Popup
      isVisible={isVisible}
      anchorRef={anchorRef}
      onClose={onClose}
      extraProps={extraProps}
    >
      <div className={style.header}>
        <Avatar src={userAvatarSrc} size="l"></Avatar>
        <span>{userName}</span>
      </div>
      <Link href={"/profile"}>
        <Button width="max" classes={[style.button]}>
          <CgProfile fontSize={20}></CgProfile>
          <span>Профиль</span>
        </Button>
      </Link>
      <Button onClick={() => signOut()}>
        <IoExitOutline fontSize={20}></IoExitOutline>
        <span>Выйти</span>
      </Button>
    </Popup>
  );
};
