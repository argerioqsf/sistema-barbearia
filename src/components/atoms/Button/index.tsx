"use client";

import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
  type: "submit" | "reset" | "button" | undefined;
  className?: string;
  children: ReactNode;
  onClick?: (state: any) => void;
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
      className={twMerge("rounded-md p-4", className)}
    >
      {children}
    </button>
  );
};

export default Button;
