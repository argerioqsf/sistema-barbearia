import React from "react";
import { twMerge } from "tailwind-merge";

type InputFormPros = {
  type?: string;
  name?: string;
  id: string;
  placeholder?: string;
  className?: string;
};

const InputForm = ({
  type,
  name,
  id,
  placeholder,
  className,
}: InputFormPros) => {
  return (
    <input
      type={type}
      name={name}
      id={id}
      className={twMerge("block w-full", className)}
      placeholder={placeholder}
    />
  );
};

export default InputForm;
