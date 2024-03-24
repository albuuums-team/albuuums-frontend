"use client";

import { Gallery } from "@/shared/ui-kit/gallery";
import { useUnit } from "effector-react";
import { FunctionComponent, useEffect } from "react";
import { $albums, $isLoading, dialog, getAlbums } from "../model";
import AddAlbumCard from "@/entities/add-album-card/ui/add-album-card";
import { useDialog } from "@/shared/libs/effector-dialog";
import { AddAlbumDialog } from "@/features/add-album-dialog";
import { AlbumCard } from "@/entities/album-card";
import { useSession } from "next-auth/react";

import Link from "next/link";

import style from "./albums-gallery.module.css";

interface AlbumsGalleryProps {}

export const AlbumsGallery: FunctionComponent<AlbumsGalleryProps> = () => {
  const [albums, isLoading, getAlbumsFn] = useUnit([
    $albums,
    $isLoading,
    getAlbums,
  ]);

  const { isVisible, open, close } = useDialog(dialog);

  const session = useSession();

  //@ts-ignore
  const cookie = session.data?.user?.cookie;

  useEffect(() => {
    getAlbumsFn({ xAuthKey: cookie });
  }, [getAlbumsFn, cookie]);

  if (isLoading) {
    return null;
  }

  return (
    <div className={style.widget}>
      <h2 className={style.header}>Альбомы</h2>
      <Gallery>
        {albums.map((album) => {
          return (
            <Link href={"/albums/" + album.id} key={album.id}>
              <AlbumCard
                name={album.name}
                extraProps={{ style: { height: "300px" } }}
              ></AlbumCard>
            </Link>
          );
        })}
        <AddAlbumCard
          onClick={() => {
            open();
          }}
          extraProps={{ style: { height: "300px" } }}
        ></AddAlbumCard>
        <AddAlbumDialog
          onClose={() => close()}
          callback={() => getAlbumsFn({ xAuthKey: cookie })}
          isVisible={isVisible}
        ></AddAlbumDialog>
      </Gallery>
    </div>
  );
};
