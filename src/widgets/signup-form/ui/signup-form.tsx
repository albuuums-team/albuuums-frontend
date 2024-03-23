"use client";

import { FunctionComponent } from "react";

import style from "./signup-form.module.css";
import { useUnit } from "effector-react";
import { $error, $form, fieldUpdate, register } from "../model";
import { TextInput } from "@/shared/ui-kit/text-input";
import { Button } from "@/shared/ui-kit/button";
import { Logo } from "@/shared/assets/icons/logo";

interface SignupFormProps {}

export const SignupForm: FunctionComponent<SignupFormProps> = () => {
  const [form, error, fieldUpdateFn, handleRegister] = useUnit([
    $form,
    $error,
    fieldUpdate,
    register,
  ]);

  return (
    <div className={style.form}>
      <div className={style.logo}>
        <Logo></Logo>
        <span>Albuuums</span>
      </div>
      <TextInput
        value={form.name}
        placeholder="Имя пользователя"
        onChange={(e) => fieldUpdateFn({ key: "name", value: e.target.value })}
        extraProps={{ type: "text" }}
      ></TextInput>
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
      {error && <span className={style.error}>{error}</span>}
      <Button
        width="max"
        onClick={() => handleRegister()}
        classes={[style.button]}
      >
        Регистрация
      </Button>
    </div>
  );
};
