import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type BoxProps = {
  children: ReactNode;
  className?: string;
};

const Box = ({ children, className }: BoxProps) => {
  return (
    <div className={twMerge("grid grid-cols-1 gap-6", className)}>
      {children}
    </div>
  );
};

export default Box;
