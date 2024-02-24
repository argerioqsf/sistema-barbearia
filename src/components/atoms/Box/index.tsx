import React, { ReactNode } from "react";
import { twJoin, twMerge } from "tailwind-merge";

type BoxProps = {
  children: ReactNode;
  className?: string;
  cols?: number;
};

const Box = ({ children, className, cols = 1 }: BoxProps) => {
  const grid_cols = `md:grid-cols-${cols}`;
  return (
    <div className={twJoin("grid grid-cols-1 gap-6", grid_cols, className)}>
      {children}
    </div>
  );
};

export default Box;
