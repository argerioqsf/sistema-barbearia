import { Text } from "@/components/atoms";
import LinkDefault from "@/components/atoms/LinkDefault";
import React from "react";
import { twMerge } from "tailwind-merge";

type InfoUserNavProps = {
  nameUser: string;
  className?: string;
};

const InfoUserNav: React.FC<InfoUserNavProps> = ({ nameUser, className }) => {
  return (
    <div className={twMerge("pt-1 flex-col", className)}>
      <Text className="text-indigo-500">{nameUser}</Text>
      <LinkDefault className="text-base text-indigo-600 font-bold" href={"#"}>
        SAIR
      </LinkDefault>
    </div>
  );
};

export default InfoUserNav;
