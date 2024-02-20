import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type TextProps = {
  children: ReactNode;
  className?: string;
  role?: string;
  title?: string;
};

const Text = ({ role, children, className, title }: TextProps) => {
  return (
    <p
      title={title}
      role={role}
      className={twMerge("text-sm font-light text-gray-500", className)}
    >
      {children}
    </p>
  );
};

export default Text;
