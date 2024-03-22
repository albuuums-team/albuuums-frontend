import { ChangeEvent, FunctionComponent, InputHTMLAttributes } from "react";

import style from "./text-input.module.css";

interface TextInputProps {
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  extraProps?: InputHTMLAttributes<HTMLInputElement>;
}

export const TextInput: FunctionComponent<TextInputProps> = (props) => {
  const { placeholder, value, onChange, extraProps } = props;

  return (
    <input
      className={style.input}
      type="text"
      placeholder={placeholder}
      onChange={(e) => onChange(e)}
      value={value}
      {...extraProps}
    />
  );
};
