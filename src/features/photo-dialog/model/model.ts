import { DOMAIN_NAME, PROTOCOL } from "@/shared/configs/config";
import { createEffect, createEvent, sample } from "effector";

interface DeleteFileFxParams {
  id: string;
  fileId: string;
  xAuthKey: string;
  callback: () => void;
}

const deleteFileFx = createEffect(async (params: DeleteFileFxParams) => {
  const { xAuthKey, id, fileId, callback } = params;

  const url = `${PROTOCOL}://${DOMAIN_NAME}/api/v1/albums/drop/${id}/file/${fileId}`;

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

export const deleteFile = createEvent<DeleteFileFxParams>();

sample({
  clock: deleteFile,
  target: deleteFileFx,
});
