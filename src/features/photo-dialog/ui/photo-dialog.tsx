import { Button } from "@/shared/ui-kit/button";
import { Dialog } from "@/shared/ui-kit/dialog";
import { FunctionComponent } from "react";
import { IoMdDownload } from "react-icons/io";
import Image from "next/image";

import style from "./photo-dialog.module.css";
import { useUnit } from "effector-react";
import { deleteFile } from "../model";
import { DOMAIN_NAME, PROTOCOL } from "@/shared/configs/config";

interface PhotoDialogProps {
  isVisible: boolean;
  onClose: () => void;
  id: string;
  fileAlbumId: string;
  fileId: string;
  xAuthKey?: string;
  callback: () => void;
}

export const PhotoDialog: FunctionComponent<PhotoDialogProps> = (props) => {
  const {
    isVisible,
    onClose,
    id,
    fileId,
    xAuthKey = "",
    callback,
    fileAlbumId,
  } = props;

  const [deleteFileFn] = useUnit([deleteFile]);

  return (
    <Dialog
      isVisible={isVisible}
      title="Фото"
      onClose={onClose}
      actions={
        <>
          <a
            download="file"
            href={`${PROTOCOL}://${DOMAIN_NAME}/api/v1/files/${fileId}`}
            target="_blank"
          >
            <Button>
              <IoMdDownload></IoMdDownload>
              <span>Скачать</span>
            </Button>
          </a>
          <Button
            onClick={() => {
              deleteFileFn({
                id: id,
                fileId: fileAlbumId,
                callback: () => {
                  callback();
                  onClose();
                },
                xAuthKey: xAuthKey,
              });
            }}
          >
            Удалить
          </Button>
        </>
      }
      extraProps={{ style: { width: "100vw", height: "100vh" } }}
    >
      <div className={style.content}>
        <Image
          className={style.image}
          src={`${PROTOCOL}://${DOMAIN_NAME}/api/v1/files/${fileId}`}
          alt=""
          fill
        ></Image>
      </div>
    </Dialog>
  );
};
