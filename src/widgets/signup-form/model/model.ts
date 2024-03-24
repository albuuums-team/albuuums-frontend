import { DOMAIN_NAME, PROTOCOL } from "@/shared/configs/config";
import { createEffect, createEvent, createStore, sample } from "effector";
import { signIn } from "next-auth/react";

interface SignInParams {
  name: string;
  email: string;
  password: string;
}

interface FormFields {
  name: string;
  email: string;
  password: string;
}

interface FieldUpdate {
  key: keyof FormFields;
  value: string;
}

const signupFx = createEffect(async (params: SignInParams) => {
  const { name, email, password } = params;

  const url = `${PROTOCOL}://${DOMAIN_NAME}/api/auth/signup?name=${name}&email=${email}&password=${password}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      mode: "no-cors",
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const res = await response.json();

    signIn("credentials", {
      email: res.email,
      password: res.password,
      callbackUrl: "/",
    });

    return res;
  }

  const res = await response.json();

  throw new Error(res.detail ?? "internal error");
});

export const $form = createStore<FormFields>({
  name: "",
  email: "",
  password: "",
});

export const $error = createStore<string>("");

export const fieldUpdate = createEvent<FieldUpdate>();

$form.on(fieldUpdate, (form, { key, value }) => ({
  ...form,
  [key]: value,
}));

export const register = createEvent();

sample({
  clock: register,
  source: $form,
  fn: (sourceData) => {
    return sourceData;
  },
  target: signupFx,
});

sample({
  clock: signupFx.failData,
  fn: (clockData) => {
    return clockData.message;
  },
  target: $error,
});

sample({
  clock: signupFx.doneData,
  fn: () => {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  target: $form,
});

sample({
  clock: signupFx.failData,
  fn: () => {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  target: $form,
});

sample({
  clock: signupFx.doneData,
  fn: () => "",
  target: $error,
});
