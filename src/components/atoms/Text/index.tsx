import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type TextProps = {
  children: ReactNode;
  className?: string;
  role?: string;
};

const Text = ({ role, children, className }: TextProps) => {
  return (
    <p
      role={role}
      className={twMerge("text-sm font-light text-gray-500", className)}
    >
      {children}
    </p>
  );
};

export default Text;
