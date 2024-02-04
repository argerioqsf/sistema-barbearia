import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type TextProps = {
  children: ReactNode;
  className?: string;
};

const Text = ({ children, className }: TextProps) => {
  return (
    <p
      className={twMerge(
        "text-sm font-light text-gray-500 dark:text-gray-400",
        className
      )}
    >
      {children}
    </p>
  );
};

export default Text;
