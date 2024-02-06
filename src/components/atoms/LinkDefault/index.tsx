import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

type LinkProps = {
  children: ReactNode;
  href: string;
  className?: string;
};

const LinkDefault = ({ children, href, className }: LinkProps) => {
  return (
    <Link
      href={href}
      className={twMerge("text-sm font-medium text-primary-600", className)}
    >
      {children}
    </Link>
  );
};

export default LinkDefault;
