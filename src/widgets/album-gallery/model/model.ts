import { DOMAIN_NAME, PROTOCOL } from "@/shared/configs/config";
import { createDialog } from "@/shared/libs/effector-dialog";
import { createEffect, createEvent, createStore, sample } from "effector";

interface Tag {
  tag: string;
  fileAlbumId: number;
}

interface File {
  id: number;
  name: string;
  pinned_at: string;
  pinned_by: number;
  type: string;
  file_id: number;
  tags: Tag[];
}

interface Album {
  id: number;
  name: string;
  album_cover_id: number;
  private: boolean;
  editor: boolean;
  description: string;
  files: File[];
  tags: string[];
}

interface GetAlbumDataFxParams {
  id: string;
  xAuthKey: string;
}

interface DeleteAlbumFxParams {
  id: string;
  xAuthKey: string;
  callback: () => void;
}

const getAlbumDataFx = createEffect(async (params: GetAlbumDataFxParams) => {
  const { xAuthKey, id } = params;

  const url = `${PROTOCOL}://${DOMAIN_NAME}/api/albums/${id}`;

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

const deleteAlbumFx = createEffect(async (params: DeleteAlbumFxParams) => {
  const { xAuthKey, id, callback } = params;

  const url = `${PROTOCOL}://${DOMAIN_NAME}/api/albums/drop/${id}`;

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-auth-key": xAuthKey,
    },
  });

  if (response.ok) {
    const res = await response.json();

    callback();

    return res;
  }

  throw new Error();
});

export const $album = createStore<Album | null>(null);
export const $isLoading = createStore(false);

export const dialog = createDialog();
export const $currSrc = createStore("");

export const getAlbumData = createEvent<GetAlbumDataFxParams>();
export const deleteAlbum = createEvent<DeleteAlbumFxParams>();

export const setCurrSrc = createEvent<string>();

sample({ clock: setCurrSrc, target: $currSrc });

sample({
  clock: getAlbumData,
  target: getAlbumDataFx,
});

sample({
  clock: getAlbumDataFx.pending,
  fn: () => true,
  target: $isLoading,
});

sample({
  clock: getAlbumDataFx.doneData,
  target: $album,
});

sample({
  clock: getAlbumDataFx.doneData,
  fn: () => false,
  target: $isLoading,
});

sample({
  clock: deleteAlbum,
  target: deleteAlbumFx,
});

sample({
  clock: deleteAlbumFx.pending,
  fn: () => true,
  target: $isLoading,
});

sample({
  clock: deleteAlbumFx.doneData,
  fn: () => false,
  target: $isLoading,
});
