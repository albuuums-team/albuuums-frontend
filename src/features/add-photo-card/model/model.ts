import { DOMAIN_NAME, PROTOCOL } from "@/shared/configs/config";
import { createEffect, createEvent, sample } from "effector";

interface SendFilesFxParams {
  callback: () => void;
  fileList: FileList | null;
  id: string;
  xAuthKey: string;
}

const sendFilesFx = createEffect(async (params: SendFilesFxParams) => {
  const { callback, id, fileList, xAuthKey } = params;

  const url = `${PROTOCOL}://${DOMAIN_NAME}/api/files/upload?public=true&pin_to=${id}`;

  console.log(fileList?.["0"]);

  if (!fileList || !fileList.length) {
    return;
  }

  const formData = new FormData();

  formData.append("file", fileList["0"]);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "x-auth-key": xAuthKey,
    },
    body: formData,
  });

  if (response.ok) {
    callback();

    return;
  }

  throw new Error();
});

export const sendFiles = createEvent<SendFilesFxParams>();

sample({ clock: sendFiles, target: sendFilesFx });
