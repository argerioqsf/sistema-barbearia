import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type LinkProps = {
  children: ReactNode;
  href: string;
  className?: string;
};

const Link = ({ children, href, className }: LinkProps) => {
  return (
    <a
      href={href}
      className={twMerge(
        "text-sm font-medium text-primary-600 hover:underline",
        className
      )}
    >
      {children}
    </a>
  );
};

export default Link;
