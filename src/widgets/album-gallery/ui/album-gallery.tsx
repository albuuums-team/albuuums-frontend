"use client";

import { useUnit } from "effector-react";
import { FunctionComponent, useEffect } from "react";
import {
  $album,
  $isLoading,
  deleteAlbum,
  dialog,
  getAlbumData,
  setCurrFileId,
  $currFileId,
  videoDialog,
  $currFileAlbumId,
  setCurrFileAlbumId,
} from "../model";
import { useSession } from "next-auth/react";
import { Button } from "@/shared/ui-kit/button";
import { Gallery } from "@/shared/ui-kit/gallery";
import { PhotoCard } from "@/entities/photo-card";

import style from "./album-gallery.module.css";
import { AddPhotoCard } from "@/features/add-photo-card";
import { DOMAIN_NAME, PROTOCOL } from "@/shared/configs/config";
import { VideoCard } from "@/entities/video-card";
import { PhotoDialog } from "@/features/photo-dialog";
import { useDialog } from "@/shared/libs/effector-dialog";
import { VideoDialog } from "@/features/video-dialog";

interface AlbumGalleryProps {
  id: string;
}

export const AlbumGallery: FunctionComponent<AlbumGalleryProps> = (props) => {
  const { id } = props;

  const [
    album,
    isLoading,
    getAlbumDataFn,
    deleteAlbumFn,
    currFileId,
    setCurrFileIdFn,
    currFileAlbumId,
    setCurrFileAlbumIdFn,
  ] = useUnit([
    $album,
    $isLoading,
    getAlbumData,
    deleteAlbum,
    $currFileId,
    setCurrFileId,
    $currFileAlbumId,
    setCurrFileAlbumId,
  ]);

  const { isVisible, open, close } = useDialog(dialog);
  const {
    isVisible: isVisibleVideoDialog,
    open: openVideoDialog,
    close: closeVideoDialog,
  } = useDialog(videoDialog);

  const session = useSession();

  //@ts-ignore
  const cookie = session.data?.user?.cookie;
  //@ts-ignore
  const baseAlbumId = session.data?.user?.["base_album"];

  useEffect(() => {
    getAlbumDataFn({
      id: id,
      xAuthKey: cookie,
    });
  }, [getAlbumDataFn, id, cookie]);

  if (isLoading || !album) {
    return null;
  }

  const callback = () => {
    getAlbumDataFn({
      id: id,
      xAuthKey: cookie,
    });
  };

  return (
    <div className={style.widget}>
      <div className={style.header}>
        <h2 className={style.title}>{album?.name}</h2>
        <div className={style.actions}>
          <a
            download={"album"}
            href={`${PROTOCOL}://${DOMAIN_NAME}/api/v1/files/download-album/${id}`}
          >
            <Button>Скачать альбом</Button>
          </a>
          {id !== String(baseAlbumId) && (
            <Button
              onClick={() =>
                deleteAlbumFn({
                  id: id,
                  xAuthKey: cookie,
                  callback: callback,
                })
              }
            >
              Удалить
            </Button>
          )}
        </div>
      </div>
      <Gallery>
        {album?.files &&
          album?.files.map((file, i) => {
            if (file.type === "mov" || file.type === "mp4") {
              return (
                <VideoCard
                  key={i}
                  src={`${PROTOCOL}://${DOMAIN_NAME}/api/v1/files/${file["file_id"]}`}
                  extraProps={{ style: { height: "300px" } }}
                  onClick={() => {
                    setCurrFileIdFn(String(file["file_id"]));
                    setCurrFileAlbumIdFn(String(file.id));
                    openVideoDialog();
                  }}
                ></VideoCard>
              );
            }

            return (
              <PhotoCard
                src={`${PROTOCOL}://${DOMAIN_NAME}/api/v1/files/${file["file_id"]}`}
                key={i}
                extraProps={{ style: { height: "300px" } }}
                onClick={() => {
                  setCurrFileIdFn(String(file["file_id"]));
                  setCurrFileAlbumIdFn(String(file.id));
                  open();
                }}
              ></PhotoCard>
            );
          })}
        <AddPhotoCard
          id={id}
          extraProps={{ style: { height: "300px" } }}
          callback={callback}
        ></AddPhotoCard>
      </Gallery>
      <PhotoDialog
        isVisible={isVisible}
        onClose={() => close()}
        id={id}
        fileId={currFileId}
        fileAlbumId={currFileAlbumId}
        xAuthKey={cookie}
        callback={callback}
      ></PhotoDialog>
      <VideoDialog
        isVisible={isVisibleVideoDialog}
        onClose={() => closeVideoDialog()}
        id={id}
        fileId={currFileId}
        xAuthKey={cookie}
        callback={callback}
        fileAlbumId={currFileAlbumId}
      ></VideoDialog>
    </div>
  );
};
