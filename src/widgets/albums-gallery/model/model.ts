import { DOMAIN_NAME, PROTOCOL } from "@/shared/configs/config";
import { createDialog } from "@/shared/libs/effector-dialog";
import { createEffect, createEvent, createStore, sample } from "effector";

interface Tag {
  tag: string;
  fileAlbumId: number;
}

interface File {
  src: string;
  fileId: string;
  tags: Tag[];
}

interface Album {
  id: string;
  name: string;
  album_cover_id: number;
  private: boolean;
  editor: boolean;
  description: string;
  files: File[];
  tags: string[];
}

interface GetAlbumsFxParams {
  xAuthKey: string;
}

const getAlbumsFx = createEffect(async (params: GetAlbumsFxParams) => {
  const { xAuthKey } = params;

  const url = `${PROTOCOL}://${DOMAIN_NAME}/api/albums/get-my-albums`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-auth-key": xAuthKey,
    },
  });

  if (response.ok) {
    const res = await response.json();

    return res;
  }

  throw new Error();
});

export const $albums = createStore<Album[]>([]);
export const $isLoading = createStore(true);

export const dialog = createDialog();

export const getAlbums = createEvent<GetAlbumsFxParams>();

sample({
  clock: getAlbums,
  target: getAlbumsFx,
});

sample({
  clock: getAlbumsFx.doneData,
  target: $albums,
});

sample({
  clock: getAlbumsFx.doneData,
  fn: () => false,
  target: $isLoading,
});
