import { SignupForm } from "@/widgets/signup-form";
import { FunctionComponent } from "react";

import style from "./signup-page.module.css";

interface SignupPageProps {}

export const SignupPage: FunctionComponent<SignupPageProps> = () => {
  return (
    <div className={style.signup}>
      <SignupForm></SignupForm>
    </div>
  );
};
