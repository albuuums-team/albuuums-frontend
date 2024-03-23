"use client";

import { FunctionComponent } from "react";

import style from "./signin-form.module.css";
import { useUnit } from "effector-react";
import { $form, fieldUpdate, login } from "../model";
import { TextInput } from "@/shared/ui-kit/text-input";
import { Button } from "@/shared/ui-kit/button";

import Link from "next/link";
import { Logo } from "@/shared/assets/icons/logo";

interface SigninFormProps {}

export const SigninForm: FunctionComponent<SigninFormProps> = () => {
  const [form, fieldUpdateFn, handleLogin] = useUnit([
    $form,
    fieldUpdate,
    login,
  ]);

  return (
    <div className={style.form}>
      <div className={style.logo}>
        <Logo></Logo>
        <span>Albuuums</span>
      </div>
      <TextInput
        value={form.email}
        placeholder="Почта"
        onChange={(e) => fieldUpdateFn({ key: "email", value: e.target.value })}
        extraProps={{ type: "email" }}
      ></TextInput>
      <TextInput
        value={form.password}
        placeholder="Пароль"
        onChange={(e) =>
          fieldUpdateFn({ key: "password", value: e.target.value })
        }
        extraProps={{ type: "password" }}
      ></TextInput>
      <div className={style.buttons}>
        <Button
          width="max"
          onClick={() => handleLogin()}
          classes={[style.button]}
        >
          Войти
        </Button>
        <Link href="/auth/signup" className={style.button}>
          <Button width="max">Регистрация</Button>
        </Link>
      </div>
    </div>
  );
};
