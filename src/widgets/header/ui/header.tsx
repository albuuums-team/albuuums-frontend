"use client";

import { FunctionComponent, useRef } from "react";

import style from "./header.module.css";

import { signIn, useSession } from "next-auth/react";

import { Logo } from "@/shared/assets/icons/logo";
import { Button } from "@/shared/ui-kit/button";
import { Avatar } from "@/shared/ui-kit/avatar";

import AvatarIcon from "@/shared/assets/icons/avatar.png";
import { ProfilePopup } from "@/features/profile-popup";

import { dialog } from "../model";
import { useDialog } from "@/shared/libs/effector-dialog";

interface HeaderProps {}

export const Header: FunctionComponent<HeaderProps> = () => {
  const { isVisible, open, close } = useDialog(dialog);

  const avatarRef = useRef(null);

  const session = useSession();

  const userAvatarSrc = session.data?.user?.image ?? AvatarIcon;

  return (
    <header className={style.header}>
      <div className={style.logo}>
        <Logo></Logo>
        <span>Albuuums</span>
      </div>
      {session.status === "authenticated" ? (
        <Avatar
          src={userAvatarSrc}
          size="l"
          ref={avatarRef}
          onClick={() => open()}
        ></Avatar>
      ) : (
        <Button onClick={() => signIn()}>Войти</Button>
      )}
      <ProfilePopup
        isVisible={isVisible}
        anchorRef={avatarRef}
        onClose={() => close()}
      ></ProfilePopup>
    </header>
  );
};
