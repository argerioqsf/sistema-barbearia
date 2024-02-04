import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
  type: "submit" | "reset" | "button" | undefined;
  className?: string;
  children: ReactNode;
};

const Button = ({ type, className, children }: ButtonProps) => {
  return (
    <button
      type={type}
      className={twMerge("w-full border rounded-md h-8", className)}
    >
      {children}
    </button>
  );
};

export default Button;
