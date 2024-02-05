import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
  type: "submit" | "reset" | "button" | undefined;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
};

const Button = ({
  type,
  className,
  children,
  onClick = () => {},
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={twMerge("border rounded-md h-8", className)}
    >
      {children}
    </button>
  );
};

export default Button;
