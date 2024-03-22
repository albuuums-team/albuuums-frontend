import { createEffect, createEvent, createStore, sample } from "effector";
import { signIn } from "next-auth/react";

interface SignInParams {
  email: string;
  password: string;
}

const signInFx = createEffect(async (params: SignInParams) => {
  const { email, password } = params;

  signIn("credentials", { email: email, password: password, callbackUrl: "/" });
});

interface FormFields {
  email: string;
  password: string;
}

export const $form = createStore<FormFields>({ email: "", password: "" });

interface FieldUpdate {
  key: keyof FormFields;
  value: string;
}

export const fieldUpdate = createEvent<FieldUpdate>();

$form.on(fieldUpdate, (form, { key, value }) => ({
  ...form,
  [key]: value,
}));

export const login = createEvent();

sample({
  clock: login,
  source: $form,
  fn: (sourceData) => {
    return sourceData;
  },
  target: signInFx,
});
