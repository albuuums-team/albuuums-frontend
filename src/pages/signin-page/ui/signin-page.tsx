import { SigninForm } from "@/widgets/signin-form";
import { FunctionComponent } from "react";

import style from "./signin-page.module.css";

interface SigninPageProps {}

export const SigninPage: FunctionComponent<SigninPageProps> = () => {
  return (
    <div className={style.signin}>
      <SigninForm></SigninForm>
    </div>
  );
};
