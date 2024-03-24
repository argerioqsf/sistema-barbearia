import { Button, Text } from "@/components/atoms";
import { useHandlerRouter } from "@/hooks/use-handler-router";
import React from "react";
import { twMerge } from "tailwind-merge";
import Cookies from "js-cookie";
import { removeRolesCookieClient, removeTokenCookieClient, removeUserCookieClient } from "@/utils/cookieClient";

type InfoUserNavProps = {
  nameUser: string;
  className?: string;
};

const InfoUserNav: React.FC<InfoUserNavProps> = ({ nameUser, className }) => {
  const { pushRouter } = useHandlerRouter();
  function logOut() {
    removeTokenCookieClient();
    removeUserCookieClient();
    removeRolesCookieClient();
    pushRouter("auth/signin");
  }

  return (
    <div className={twMerge("pt-1 flex-col", className)}>
      <Text className="text-indigo-600 font-bold">{nameUser}</Text>
      <Button
        type="button"
        onClick={logOut}
        className="text-base text-red-800 font-medium p-0 w-auto text-start"
      >
        SAIR
      </Button>
    </div>
  );
};

export default InfoUserNav;
