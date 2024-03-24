"use client";

import { FunctionComponent, HTMLAttributes } from "react";

import style from "./add-photo-card.module.css";

import { LuPlus } from "react-icons/lu";
import { useUnit } from "effector-react";
import { sendFiles } from "../model";
import { useSession } from "next-auth/react";

interface AddPhotoCardProps {
  id: string;
  callback?: () => void;
  extraProps?: HTMLAttributes<HTMLDivElement>;
}

export const AddPhotoCard: FunctionComponent<AddPhotoCardProps> = (props) => {
  const { id, callback = () => {}, extraProps } = props;

  const [sendFilesFn] = useUnit([sendFiles]);

  const session = useSession();

  //@ts-ignore
  const cookie = session.data?.user?.cookie;

  return (
    <label>
      <div className={style.card} {...extraProps}>
        <LuPlus fontSize={40} color="#fff"></LuPlus>
      </div>
      <input
        onChange={(e) => {
          console.log(e.target.files);

          sendFilesFn({
            fileList: e.target.files,
            id: id,
            xAuthKey: cookie,
            callback: callback,
          });
        }}
        type="file"
        className={style.input}
        accept=".jpg, .jpeg, .png, .mp4, .mov"
      ></input>
    </label>
  );
};
