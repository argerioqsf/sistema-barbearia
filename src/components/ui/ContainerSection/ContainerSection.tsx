import React from "react";
import { twMerge } from "tailwind-merge";

type ContainerProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const ContainerSection = ({ children, ...rest }: ContainerProps) => {
  return (
    <div
      {...rest}
      className={twMerge(
        "mx-auto max-w-7xl sm:px-6 lg:px-8",
        rest.className
      )}
    >
      {children}
    </div>
  );
};

export default ContainerSection;
