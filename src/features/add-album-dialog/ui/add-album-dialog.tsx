"use client";

import { FunctionComponent, HTMLAttributes } from "react";

import { Dialog } from "@/shared/ui-kit/dialog";
import { TextInput } from "@/shared/ui-kit/text-input";
import { Button } from "@/shared/ui-kit/button";
import { useUnit } from "effector-react";
import { $name, createAlbum, fieldUpdate } from "../model";
import { useSession } from "next-auth/react";

interface AddAlbumDialogProps {
  isVisible: boolean;
  onClose: () => void;
  callback?: () => void;
  extraProps?: HTMLAttributes<HTMLElement>;
}

export const AddAlbumDialog: FunctionComponent<AddAlbumDialogProps> = (
  props
) => {
  const { isVisible, onClose, extraProps, callback = async () => {} } = props;
  const [name, fieldUpdateFn, createAlbumFn] = useUnit([
    $name,
    fieldUpdate,
    createAlbum,
  ]);

  const session = useSession();

  //@ts-ignore
  const cookie = session.data?.user?.cookie;

  return (
    <Dialog
      isVisible={isVisible}
      onClose={onClose}
      title="Создать альбом"
      extraProps={extraProps}
    >
      <TextInput
        onChange={(e) => fieldUpdateFn(e.target.value)}
        placeholder="название альбома"
        value={name}
      ></TextInput>
      <Button
        onClick={() => {
          fieldUpdateFn("");
          createAlbumFn({
            callback: callback,
            name: name,
            xAuthKey: cookie,
          });

          onClose();
        }}
        width="max"
      >
        Создать
      </Button>
    </Dialog>
  );
};
