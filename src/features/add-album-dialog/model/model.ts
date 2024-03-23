import { DOMAIN_NAME, PROTOCOL } from "@/shared/configs/config";
import { createEffect, createEvent, createStore, sample } from "effector";
import { signOut } from "next-auth/react";

type CallbackFn = () => Promise<any>;

interface CreateAlbumFxParams {
  callback: CallbackFn;
  name: string;
  xAuthKey: string;
}

const createAlbumFx = createEffect(async (params: CreateAlbumFxParams) => {
  const { callback, name, xAuthKey } = params;

  const url = `${PROTOCOL}://${DOMAIN_NAME}/api/albums/new?name=${name}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-auth-key": xAuthKey,
    },
  });

  console.log(response);

  if (response.ok) {
    await callback();

    return;
  }

  throw new Error();
});

export const $name = createStore("");

export const fieldUpdate = createEvent<string>();

$name.on(fieldUpdate, (_, payload) => payload);

export const createAlbum = createEvent<{
  callback: CallbackFn;
  name: string;
  xAuthKey: string;
}>();

sample({
  clock: createAlbum,
  target: createAlbumFx,
});
