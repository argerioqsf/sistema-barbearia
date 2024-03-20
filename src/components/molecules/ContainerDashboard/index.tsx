"use client";
import React, { useEffect } from "react";
import { twMerge } from "tailwind-merge";
import Cookies from "js-cookie";
import { useHandlerRouter } from "@/hooks/use-handler-router";

type ContainerProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const ContainerDashboard = ({ children, ...rest }: ContainerProps) => {
  const { pushRouter } = useHandlerRouter();

  useEffect(() => {
    const value = Cookies.get("token_SIM");
    if (!value) {
      pushRouter("auth/signin");
    }
  });
  return (
    <div
      className={twMerge(
        "w-full flex-nowrap pt-[var(--navbar-height)] overflow-y-auto overflow-x-hidden whitespace-nowrap h-screen",
        rest.className
      )}
    >
      {children}
    </div>
  );
};

export default ContainerDashboard;
