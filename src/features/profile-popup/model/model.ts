import { DOMAIN_NAME, PROTOCOL } from "@/shared/configs/config";
import { createEffect, createEvent, sample } from "effector";
import { signOut } from "next-auth/react";

const singOutFx = createEffect(async () => {
  const url = `${PROTOCOL}://${DOMAIN_NAME}/api/auth/logout`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    return;
  }

  throw new Error();
});

export const logout = createEvent<void>();

sample({
  clock: logout,
  target: singOutFx,
});

sample({
  clock: singOutFx.doneData,
  fn: () => {
    signOut();
  },
});
