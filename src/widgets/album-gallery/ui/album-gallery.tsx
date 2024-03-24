"use client";

import { useUnit } from "effector-react";
import { FunctionComponent, useEffect } from "react";
import {
  $album,
  $isLoading,
  deleteAlbum,
  dialog,
  getAlbumData,
  $currSrc,
  setCurrSrc,
} from "../model";
import { useSession } from "next-auth/react";
import { Button } from "@/shared/ui-kit/button";
import { Gallery } from "@/shared/ui-kit/gallery";
import { PhotoCard } from "@/entities/photo-card";

import style from "./album-gallery.module.css";
import { AddPhotoCard } from "@/features/add-photo-card";
import { DOMAIN_NAME, PROTOCOL } from "@/shared/configs/config";
import VideoCard from "@/entities/video-card/ui/video-card";
import { PhotoDialog } from "@/features/photo-dialog";
import { useDialog } from "@/shared/libs/effector-dialog";

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
    currSrc,
    setCurrSrcFn,
  ] = useUnit([
    $album,
    $isLoading,
    getAlbumData,
    deleteAlbum,
    $currSrc,
    setCurrSrc,
  ]);

  const { isVisible, open, close } = useDialog(dialog);

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

  return (
    <div className={style.widget}>
      <div className={style.header}>
        <h2 className={style.title}>{album?.name}</h2>
        <div className={style.actions}>
          {id !== String(baseAlbumId) && (
            <Button
              onClick={() =>
                deleteAlbumFn({
                  id: id,
                  xAuthKey: cookie,
                  callback: () => {
                    getAlbumDataFn({
                      id: id,
                      xAuthKey: cookie,
                    });
                  },
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
                  src={`${PROTOCOL}://${DOMAIN_NAME}/api/files/${file["file_id"]}`}
                  extraProps={{ style: { height: "300px" } }}
                ></VideoCard>
              );
            }

            return (
              <PhotoCard
                src={`${PROTOCOL}://${DOMAIN_NAME}/api/files/${file["file_id"]}`}
                key={i}
                extraProps={{ style: { height: "300px" } }}
                onClick={() => {
                  setCurrSrcFn(String(file["file_id"]));
                  open();
                }}
              ></PhotoCard>
            );
          })}
        <AddPhotoCard
          id={id}
          extraProps={{ style: { height: "300px" } }}
          callback={() =>
            getAlbumDataFn({
              id: id,
              xAuthKey: cookie,
            })
          }
        ></AddPhotoCard>
      </Gallery>
      <PhotoDialog
        isVisible={isVisible}
        onClose={() => close()}
        id={id}
        fileId={currSrc}
        xAuthKey={cookie}
        callback={() =>
          getAlbumDataFn({
            id: id,
            xAuthKey: cookie,
          })
        }
      ></PhotoDialog>
    </div>
  );
};
