"use client";

import { Avatar } from "@/shared/ui-kit/avatar";
import { Button } from "@/shared/ui-kit/button";
import { Popup } from "@/shared/ui-kit/popup";
import { useSession } from "next-auth/react";
import { FunctionComponent, HTMLAttributes, RefObject, useEffect } from "react";

import style from "./profile-popup.module.css";

import AvatarIcon from "@/shared/assets/icons/avatar.png";

import { IoExitOutline } from "react-icons/io5";
import { useUnit } from "effector-react";
import { logout } from "../model";

interface ProfilePopupProps {
  isVisible: boolean;
  anchorRef: RefObject<Element>;
  onClose: () => void;
  extraProps?: HTMLAttributes<HTMLElement>;
}

export const ProfilePopup: FunctionComponent<ProfilePopupProps> = (props) => {
  const { isVisible, anchorRef, onClose, extraProps } = props;

  const [logoutFn] = useUnit([logout]);

  const session = useSession();

  console.log(session);

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
      <Button onClick={() => logoutFn()}>
        <IoExitOutline fontSize={20}></IoExitOutline>
        <span>Выйти</span>
      </Button>
    </Popup>
  );
};
